import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import './AboutPage.css';

const AboutPage = () => {
  const [displayText, setDisplayText] = useState('');
  const [fullText, setFullText] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [showLogo, setShowLogo] = useState(true);
  const [searchBarMoved, setSearchBarMoved] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
    const [textCharIndex, setTextCharIndex] = useState(0);

  const textareaRef = useRef(null);
  const textBlockRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const maxHeight = window.innerHeight * 0.20;

  const phrases = [
    "Когда-то всё начиналось с запроса...",
    "А потом закрутилось...",
    "Yandex, Google, Bing и многие другие",
    "Нами любимые поисковики.",
    "Скорость ответа была доведена до автоматизма",
    "Но всему есть своя цена...",
    "Порою поисковая выдача не соответствует истинным требованиям пользователя",
    "В дополнение пришли нейросети",
    "ChatGPT, Perplexity, Alice AI, Grok и другие.",
    "Но ядро осталось прежним...",
    "Эпоха ссылок прошла",
    "Настало время кратких и структурированных ответов",
    "Но нейросети неидеальны,",
    "Они подвержены галлюцинациям",
    "Они теряют точность там, где она критически необходима.",
    "",
    "Мы те, кто координально меняют систему",
    "Cogniniton — инновации в поиске, точность и информативность превыше всего"
  ];

  const fullTextBlockContent = [
    { type: 'heading', content: 'Биография Ф.М. Достоевского\n\n' },
    { type: 'quote', content: 'Фёдор Михайлович Достоевский (1821–1881 гг.) – величайший писатель, классик русской литературы, мыслитель. Автор таких бессмертных произведений, как «Идиот», «Преступление и наказание», «Униженные и оскорблённые», «Братья Карамазовы» и многих других.', link: 'https://dostoyevsky43.tilda.ws/' },
    { type: 'text', content: ' Он ' },
    { type: 'quote', content: 'с начала и до конца жизни проявлял во всем своем поведении и характере чрезвычайное, иногда прямо-таки адское самолюбие, самостоятельность убеждений и поступков, упорство в отстаивании своих убеждений, свободолюбие и чуткость ко всякому притеснению.', link: 'https://azbyka.ru/otechnik/filosofija/dostoevskij-i-ego-hristianskoe-miroponimanie/1' },
    { type: 'text', content: '\n\nДетство:\n\n' },
    { type: 'text', content: 'В детстве маленький Федя во всех своих проявлениях был, по словам родителей, «огонь». Наклонность жить в мире фантазии обнаруживается у Достоевского очень рано. Совсем ребенком он с увлечением слушает, как отец читает матери романы Редклиф. Он любит читать путешествия, романы Вальтера Скотта, мечтает о путешествиях по Востоку и в шестнадцатилетнем возрасте пытается написать роман из венецианской жизни.', link: 'https://azbyka.ru/otechnik/filosofija/dostoevskij-i-ego-hristianskoe-miroponimanie/1' },
    { type: 'quote', content: 'Ф.М. Достоевский примкнул к М.В. Петрашевскому, который был ярым либералом и западником. Их идеи были за революцию и освобождение крестьян от крепостного права. Так, Достоевский стал социалистическим гуманистом.\n\nКак ни странно писатель отрицал социализм, доказывал несостоятельность революции, отвергал атеизм. Он призывал вернуться к народным корням. Мировоззрение Достоевского заключалось в критике капитализма. По его мнению, буржуазия бездушная и разрушает братство.', link: 'https://dostoyevsky43.tilda.ws/' },
    { type: 'text', content: '\n\nДостоевский сочетал в себе глубокую духовную свободу и критическое мышление, что проявлялось в его неординарном взгляде на общество и человека. Его мировоззрение избегало крайностей — он отвергал и революционный радикализм, и бездушный капитализм, призывая к возрождению нравственности через связь с народом и традиционными ценностями. Такая позиция отражает внутреннюю борьбу между личной свободой и социальной ответственностью, характерную для его жизни и творчества.\n' },
    { type: 'text', content: '\n...' }
  ];

  const sources = [
    { name: 'dostoyevsky43.tilda.ws', url: 'https://dostoyevsky43.tilda.ws/', summary: 'Философия Достоевского эволюционировала от социалистического гуманизма (влияние кружка Петрашевского) к христианскому гуманизму после каторги, когда ключевыми стали вера в Бога, свобода воли, нравственное совершенствование и соборность. Центральной для него была «тайна человека» — человек как свободное, иррациональное, четырёхмерное существо, способное и к злу, и к святости, где страдание и ответственность становятся путями духовного роста. Достоевский критиковал атеизм, сциентизм и революционный утопизм, утверждая, что без верховного нравственного начала (Христа) разум и свобода неизбежно оборачиваются своеволием и тиранией.' },
    { name: 'azbyka.ru', url: 'https://azbyka.ru/otechnik/filosofija/dostoevskij-i-ego-hristianskoe-miroponimanie/1', summary: 'Достоевский был глубоко религиозным человеком, чья вера, пройдя через кризис атеистического влияния Белинского и тяжёлые испытания каторги, укрепилась и обрела форму православного христианства, тесно связанного с любовью к русскому народу и его духовным традициям. В его личности сосуществовали крайние полюсы — от «подпольного», эгоистичного и раздираемого страстями начала до способности к высочайшему духовному просветлению и жертвенной любви, что нашло отражение в его творчестве и жизни. Несмотря на обвинения в реакционности, Достоевский оставался до конца жизни сторонником гражданских свобод, критиком административного произвола и убеждённым приверженцем идеала христианского социализма, основанного на нравственном преображении личности, а не на насилии.' },
    { name: 'vesti.ru', url: 'https://www.vesti.ru/article/4541362', summary: 'Подробная биографическая статья о Фёдоре Михайловиче Достоевском, приуроченная к 200-летию со дня его рождения (30 октября 1821 года). В ней освещаются ключевые этапы его жизни: тяжёлое детство, участие в кружке петрашевцев, инсценированная казнь, каторга и ссылка в Сибири, возвращение к литературной деятельности и создание величайших романов, таких как «Преступление и наказание», «Идиот», «Бесы» и «Братья Карамазовы». Подчёркивается, что Достоевский не только стал одним из величайших писателей-психологов и философов, но и оказал глубокое влияние на мировую культуру — от экзистенциализма (Ницше, Камю, Сартр) до психоанализа и современного кинематографа.' },
    { name: 'dzen.ru', url: 'https://dzen.ru/a/YzbcYGeHKV8BWMws', summary: 'Текст представляет собой краткую биографию Фёдора Достоевского: от его детства и образования до ареста, ссылки, двух браков, творческого расцвета и смерти в 1881 году. Особое внимание уделено ключевым событиям — чудесному избавлению от казни, влиянию эпилепсии и азартных игр, а также духовному развитию, нашедшему отражение в его «великом пятикнижии». Подчёркивается глубина его психологического и религиозного видения человека, что сделало его творчество актуальным и востребованным по всему миру до сих пор.' },
    { name: 'ru.ruwiki.ru', url: 'https://ru.ruwiki.ru/wiki/Философия_Достоевского', summary: 'Философия Достоевского, хотя он и не был профессиональным философом, представляет собой глубокое экзистенциальное и христианское осмысление человека, свободы, ответственности и любви, став залогом развития русской религиозной философии. Центральной для него была проблема человека как «тайны», где личность обладает абсолютной ценностью и не может быть средством для достижения чьих-либо целей — ключевые идеи выражены в «Записках из подполья», «Преступлении и наказании», «Братьях Карамазовых» и «Речи о Пушкине». Достоевский критиковал как радикальный индивидуализм (через образ Раскольникова), так и тотальный коллективизм, выступая за соборность, веру в Бога и «всечеловечность» как основу подлинной свободы и нравственного возрождения.' },
    { name: 'polka.academy', url: 'https://polka.academy/materials/816', summary: 'Этот текст — краткая биографию Фёдора Достоевского, составленная из 20 ключевых событий его жизни, от рождения в 1821 году до смерти в 1881-го, с акцентом на поворотные моменты: литературный дебют, арест и «расстрел» на Семёновском плацу, каторгу, творческий расцвет и создание великих романов. Автор — филолог Кирилл Зубков — не просто перечисляет факты, но раскрывает их культурный и психологический контекст, связывая события в жизни писателя с его произведениями и эпохой (реформы, революционные настроения, цензура). Особое внимание уделено личным драмам Достоевского — смерти близких, долгам, болезни и любви, которые глубоко отразились в его творчестве и сделали его фигуру исключительно человечной и многогранной.' }
  ];

  const searchBarText = "Подробный отчёт о жизни Ф. М. Достоевского с цитатами из произведений с точки зрения его духовно-нравственных ценностей";
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedSearchText, setGeneratedSearchText] = useState(false);
  const [isGeneratingSearchText, setIsGeneratingSearchText] = useState(false);
  const [searchCharIndex, setSearchCharIndex] = useState(0);

  // State for multiple summaries
  const [openSummaries, setOpenSummaries] = useState({});
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const sourcesContainerRef = useRef(null);

  const finalPhrase = "Мы открываем новые горизонты, в которых нейросети меньше допускают неточности, строя ответы, полностью соответствующие ожиданиям пользователя, в приоритете основываясь на релевантных данных с веб-ресурсов";
  const [showFinalText, setShowFinalText] = useState(false);
  const [finalTextCharIndex, setFinalTextCharIndex] = useState(0);
  const [finalDisplayText, setFinalDisplayText] = useState('');

  useEffect(() => {
    if (currentIndex < phrases.length && !showSearchBar) {
      setIsFadingOut(true);
      setTimeout(() => {
        const currentPhrase = phrases[currentIndex];
        setFullText(currentPhrase);
        setDisplayText("");
        setCharIndex(0);
        setIsTyping(true);
        setIsFadingOut(false);
      }, 500);
    }
  }, [currentIndex, showSearchBar, phrases.length, fullText]);

  useEffect(() => {
    let initialDelayTimeout;
    if (currentIndex === 0 && !isTyping && !showSearchBar && !isFadingOut) {
      initialDelayTimeout = setTimeout(() => {
        setIsTyping(true);
      }, 200);
    }

    if (isTyping && charIndex < fullText.length && !showSearchBar && !isFadingOut) {
      const typingTimeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(typingTimeout);
    } else if (isTyping && charIndex === fullText.length && !showSearchBar && !isFadingOut) {
      setIsTyping(false);
      setTimeout(() => {
        if (currentIndex === phrases.length - 1) {
          setShowSearchBar(true);
          setIsGeneratingSearchText(true);
          setSearchQuery('');
          setSearchCharIndex(0);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      }, 1000);
    }
    return () => clearTimeout(initialDelayTimeout);
  }, [charIndex, currentIndex, fullText, isFadingOut, isTyping, phrases.length, searchBarText, showSearchBar]);

  useEffect(() => {
    if (showSearchBar && isGeneratingSearchText && searchCharIndex < searchBarText.length) {
      const searchTypingTimeout = setTimeout(() => {
        const newText = searchBarText.substring(0, searchCharIndex + 1);
        setSearchQuery(newText);
        setSearchCharIndex(prev => prev + 1);
      }, 70);
      return () => clearTimeout(searchTypingTimeout);
    } else if (searchCharIndex === searchBarText.length && isGeneratingSearchText) {
      setSearchQuery(searchBarText);
      setIsGeneratingSearchText(false);
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(searchBarText.length, searchBarText.length);
      }
    }
  }, [showSearchBar, isGeneratingSearchText, searchCharIndex, searchBarText]);

  useEffect(() => {
    if (showSearchBar && isGeneratingSearchText && textareaRef.current) {
      const currentLength = searchQuery.length;
      textareaRef.current.setSelectionRange(currentLength, currentLength);
    }
  }, [searchQuery, isGeneratingSearchText, showSearchBar]);

  useEffect(() => {
    handleInput();
  }, [searchQuery]);

  useEffect(() => {
    if (showFinalText && finalTextCharIndex < finalPhrase.length) {
      const typingTimeout = setTimeout(() => {
        setFinalDisplayText(prev => prev + finalPhrase[finalTextCharIndex]);
        setFinalTextCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(typingTimeout);
    }
  }, [showFinalText, finalTextCharIndex, finalPhrase]);

  const totalTextContentLength = fullTextBlockContent.reduce((acc, item) => acc + item.content.length, 0);

  useEffect(() => {
    if (showTextBlock && textCharIndex < totalTextContentLength) {
      let charToAppend = '';

      let currentSegmentOffset = 0;
      for (const item of fullTextBlockContent) {
        if (textCharIndex >= currentSegmentOffset && textCharIndex < currentSegmentOffset + item.content.length) {
          charToAppend = item.content[textCharIndex - currentSegmentOffset];
          break;
        }
        currentSegmentOffset += item.content.length;
      }

      const typingTimeout = setTimeout(() => {
        setGeneratedText(prev => prev + charToAppend);
        setTextCharIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(typingTimeout);
    } else if (textCharIndex === totalTextContentLength && showTextBlock) {
    }
  }, [textCharIndex, showTextBlock, fullTextBlockContent, totalTextContentLength]);

  useEffect(() => {
    if (textBlockRef.current) {
      textBlockRef.current.scrollTop = textBlockRef.current.scrollHeight;
    }
  }, [generatedText]);

  const handleSearchInputChange = (event) => {
    if (isGeneratingSearchText) {
      setIsGeneratingSearchText(false);
    }
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchQuery);
    setShowLogo(false);
    setSearchBarMoved(true);
    setShowSources(true);
    setShowTextBlock(true);
    setTextCharIndex(0);
    setGeneratedText('');
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, searchBarMoved ? maxHeight : Infinity);
      textareaRef.current.style.height = `${newHeight}px`;
      setTextareaHeight(`${newHeight}px`);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const initialHeight = Math.min(textareaRef.current.scrollHeight, searchBarMoved ? maxHeight : Infinity);
      setTextareaHeight(`${initialHeight}px`);
    }
  }, [maxHeight, searchBarMoved]);

  const handleHomeClick = () => {
    setDisplayText('');
    setFullText('');
    setShowSearchBar(false);
    setCurrentIndex(0);
    setCharIndex(0);
    setIsTyping(false);
    setIsFadingOut(false);
    setShowLogo(true);
    setSearchBarMoved(false);
    setShowSources(false);
    setSearchQuery('');
    setGeneratedSearchText(false);
    setIsGeneratingSearchText(false);
    setSearchCharIndex(0);
    setOpenSummaries({}); // Reset all open summaries
    setShowTextBlock(false);
    setGeneratedText('');
    setTextCharIndex(0);
  };

  const handleShowSummary = (index, summaryText) => {
    setIsGeneratingSummary(true);
    setOpenSummaries(prev => ({
      ...prev,
      [index]: {
        displayText: '',
        charIndex: 0,
        isGenerating: true,
        summaryText: summaryText,
        isExpanded: true, // Add this line
      }
    }));
  };

  const handleCollapseSummary = (index) => {
    setOpenSummaries(prev => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
    const hasOpenSummaries = Object.values(openSummaries).some(s => s.isGenerating || s.displayText.length > 0);
    if (!hasOpenSummaries) {
      setIsGeneratingSummary(false);
    }
  };

  useEffect(() => {
    const timers = [];
    let anySummaryIsGenerating = false;
    for (const index in openSummaries) {
      const summary = openSummaries[index];
      if (summary.isGenerating && summary.charIndex < summary.summaryText.length) {
        anySummaryIsGenerating = true;
        const typingTimeout = setTimeout(() => {
          setOpenSummaries(prev => ({
            ...prev,
            [index]: {
              ...prev[index],
              displayText: prev[index].displayText + prev[index].summaryText[prev[index].charIndex],
              charIndex: prev[index].charIndex + 1,
            }
          }));
        }, 20);
        if (sourcesContainerRef.current) {
          sourcesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        timers.push(typingTimeout);
      } else if (summary.isGenerating && summary.charIndex === summary.summaryText.length) {
        setOpenSummaries(prev => ({
          ...prev,
          [index]: {
            ...prev[index],
            isGenerating: false,
          }
        }));
      }
    }
    setIsGeneratingSummary(anySummaryIsGenerating);
    return () => timers.forEach(clearTimeout);
  }, [openSummaries, setIsGeneratingSummary]);


  return (
    <div className="about-page">
      <div className="about-page-background"></div>
      <div className="about-header">
        <div className={`logo-section ${!showLogo ? 'hidden' : ''}`}>
          <img src={logo} className='logo' alt='Cognition logo' />
          <span className='app-title'>Cognition</span>
        </div>
        <button className="back-button" onClick={handleHomeClick}>Home</button>
      </div>
      {!showSearchBar && !showFinalText && (
        <div className="text-container">
          <h1 className={`dynamic-text ${isFadingOut ? 'fade-out' : ''}`}>{displayText}</h1>
        </div>
      )}

      {showSearchBar && !showFinalText && (
        <div className={`search-bar-container ${searchBarMoved ? 'moved' : ''}`}>
          <div className="search-input-wrapper">
            <textarea
              className="search-input"
              placeholder="Find whatever you want"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onInput={handleInput}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSearchSubmit();
                } else if (e.key === 'Enter' && e.shiftKey) {

                }
              }}
              ref={textareaRef}
              style={{ height: textareaHeight, maxHeight: `${maxHeight}px` }}
            ></textarea>
            <button className="search-button btn3" onClick={handleSearchSubmit}>➤</button>
          </div>
          {showSources && (
            <div className="sources-container" ref={sourcesContainerRef}>
              {sources.map((source, index) => {
                const summaryInfo = openSummaries[index];
                const isSummaryOpen = summaryInfo && summaryInfo.displayText.length > 0;
                return (
                  <div
                    key={index}
                    className={`source-item-wrapper ${isGeneratingSummary ? 'generating-summary' : ''} ${isSummaryOpen && summaryInfo.isExpanded ? 'expanded-summary' : ''}`}
                  >
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-link">
                      {source.name}
                    </a>
                    {isSummaryOpen ? (
                      <div className="summary-content-wrapper">
                        <p className="generated-summary" style={{ userSelect: 'all', cursor: 'text', textAlign: 'left' }}>{summaryInfo.displayText}</p>
                        <button className="collapse-button" onClick={() => handleCollapseSummary(index)}>
                          &#x2191;
                        </button>
                      </div>
                    ) : (
                      <button className="summary-button" onClick={() => handleShowSummary(index, source.summary)}>
                        Краткое содержание
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {showTextBlock && (
        <div className="text-block-container" ref={textBlockRef}>
          <p className="generated-text">
            {(() => {
              let charsRenderedSoFar = 0;
              const renderedElements = [];
              for (const item of fullTextBlockContent) {
                const segmentLength = item.content.length;
                let contentToRender = '';

                if (textCharIndex >= charsRenderedSoFar + segmentLength) {
                  contentToRender = item.content;
                } else if (textCharIndex > charsRenderedSoFar) {
                  contentToRender = item.content.substring(0, textCharIndex - charsRenderedSoFar);
                }

                charsRenderedSoFar += segmentLength;

                if (item.type === 'text') {
                  renderedElements.push(<span key={item.content.substring(0,10) + charsRenderedSoFar}>{contentToRender}</span>);
                } else if (item.type === 'quote') {
                  renderedElements.push(
                    <a
                      key={item.content.substring(0,10) + charsRenderedSoFar}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quote-link"
                    >
                      {contentToRender}
                    </a>
                  );
                } else if (item.type === 'heading') {
                  renderedElements.push(<h2 key={item.content.substring(0,10) + charsRenderedSoFar} className="text-block-heading">{contentToRender}</h2>);
                }
              }

              return renderedElements;
            })()}
          </p>
        </div>
      )}
      {showFinalText && (
        <div className="text-container">
          <h1 className="final-text">{finalDisplayText}</h1>
        </div>
      )}
    </div>
  );
};

export default AboutPage;