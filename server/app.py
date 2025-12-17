from flask import Flask, request, jsonify, render_template, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config["JWT_SECRET_KEY"] = "super-secret-jwt-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
db = SQLAlchemy(app)
CORS(app)
jwt = JWTManager(app)

@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({'message': 'Missing or invalid token'}), 401

@jwt.invalid_token_loader
def invalid_token_response(callback):
    return jsonify({'message': 'Signature verification failed'}), 401

@jwt.expired_token_loader
def expired_token_response(callback):
    return jsonify({'message': 'Token has expired'}), 401

@jwt.needs_fresh_token_loader
def needs_fresh_token_response(callback):
    return jsonify({'message': 'Fresh token required'}), 401

@jwt.revoked_token_loader
def revoked_token_response(callback):
    return jsonify({'message': 'Token has been revoked'}), 401

@jwt.token_verification_loader
def token_verification_response(callback):
    return jsonify({'message': 'Token verification failed'}), 401

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    balance = db.Column(db.Float, default=0.0)
    search_history = db.Column(db.Text, default='[]')

    def __repr__(self):
        return f"User('{self.email}', '{self.balance}')"

@app.before_request
def create_tables():
    db.create_all()

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    
    # Поддержка как JSON, так и form data
    if request.is_json:
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')
    else:
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
    
    if not name or not email or not password:
        if request.is_json:
            return jsonify({'message': 'Name, email and password are required'}), 400
        else:
            flash('Имя, email и пароль обязательны', 'danger')
            return render_template('register.html'), 400

    if User.query.filter_by(email=email).first():
        if request.is_json:
            return jsonify({'message': 'User already exists'}), 409
        else:
            flash('Пользователь с таким email уже существует', 'danger')
            return render_template('register.html'), 409

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(name=name, email=email, password=hashed_password, balance=0.0, search_history='[]')
    db.session.add(new_user)
    db.session.commit()
    
    if request.is_json:
        return jsonify({'message': 'Registration successful!'}), 201
    else:
        flash('Регистрация успешна!', 'success')
        return redirect(url_for('login'))

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, user_email=user.email, user_name=user.name), 200
    else:
        return jsonify({'message': 'Bad username or password'}), 401

@app.route('/user', methods=['GET'])
@jwt_required()
def user_page():
    current_user_id = get_jwt_identity()
    app.logger.debug(f"Received JWT for user ID: {current_user_id}")
    user = User.query.get(current_user_id)
    if user:
        return jsonify({'id': user.id, 'name': user.name, 'email': user.email, 'balance': user.balance, 'search_history': user.search_history}), 200
    return jsonify({'message': 'User not found'}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5070)
