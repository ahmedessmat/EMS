import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Scrollbars } from 'react-custom-scrollbars';

// import { icon } from "@fortawesome/fontawesome-svg-core";
// import Checkbox from '@material-ui/core/Button';
// import Select from 'react-select'

// const url='http://68.183.30.130/fadyelfahdy/public/uploaded_files/'
const url = 'https://fadyelfahdy.net/uploaded_files/';

class ReviewQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      voices: {},
      files: {},
      grades: [],
      loading: true,
      why: 'dernfriei',
      whyend: 0,
      whystart: 0,
      selectedFile: null,
      questions: [
        { type: 'trueOrFalse' },
        { type: 'mcq', options: ['carbon', 'Hydrogen', 'Sodium Hydoxide', 'Nitrogen', 'H2O'] },
        { type: 'text' },
        { type: 'voiceNote' },
        {
          type: 'complete',
          text:
            'fknewefw { Input } fenefkwf { Input } fwemmfwlfknewefw { Input } fenefkw emmfwlfknewefw.',
          array: [],
        },
      ],
      // quiz:{questions:[{content:'{"audio":null,"image":null,"video":null,"grades":[[null,null]],"one_col":1,"answer_type":"Other1","qaQuestions":[],"mcqQuestions":[],"qaCodesCount":"51","questionText":"Rephrase the following statements.","rewriteQuestions":[],"completeQuestions":[],"matchingQuestions":[],"noteTakingQuestions":[],"trueOrFalseQuestions":[],"multipleMatchingQuestions":[]}'}]},
      quiz: { questions: [] },
      answers: [],
      currentQuestion: 0,
      files: [],
      audioCheck: false,
    };
    this.myRef = React.createRef();
  }
  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

  toggleRecording = () => {
    if (this.state.record) {
      this.setState({
        record: !this.state.record,
      });
    } else {
      this.setState({
        record: !this.state.record,
      });
    }
  };

  onStop = (id, recordedBlob) => {
    let voices = this.state.voices;
    voices[id] = recordedBlob;
    this.setState({ voices: voices });
    // this.setState({
    //   voice: recordedBlob.blobURL,
    // });
    console.log(voices);
  };
  onChangeHandler = (event, id) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
    let files = this.state.files;
    files[id] = event.target.files[0];
    this.setState({ files: files });

    // console.log(event.target.files[0])
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.getGradedQuiz(this.props.user, this.props.location.state.quiz.id);
    } else if (sessionStorage.getItem('user')) {
      var token = sessionStorage.getItem('user');
      this.props.updateToken(token);
      this.props.getGradedQuiz(token, this.props.location.state.quiz.id);
    } else {
      this.props.history.push('/login');
    }
    //   let x=[...this.state.questions]
    //   for(var i=0;i<this.state.questions.length;i++){
    //     if(this.state.questions[i].type==="complete"){
    //       x[i].array=this.state.questions[i].text.split('{ Input }')
    //     }
    //   }
    // console.log(x[0])
    //   this.setState({questions:x})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.reviewQuizLoading !== prevState.reviewQuizLoading) {
      // console.log(nextProps.quiz)
      update.loading = nextProps.reviewQuizLoading;
    }
    return update;
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reviewQuiz !== this.props.reviewQuiz) {
      console.log(this.props.reviewQuiz);
      let x = this.props.reviewQuiz.sheet;
      // let answers=[]
      for (var i = 0; i < x.questions.length; i++) {
        //   answers.push({id:x.questions[i].id})
        let con = JSON.parse(x.questions[i].content);
        if (con.answer_type === 'Other') {
          if (con.mcqQuestions.length > 0) {
            //   answers[i].mcqQuestions=[]
            for (var j = 0; j < con.mcqQuestions.length; j++) {
              // answers[i].mcqQuestions[j]=[]
              let optionsArray = con.mcqQuestions[j].options;
              let answersArray = con.mcqQuestions[j].answers;
              // for(let z=0;z<answersArray.length;z++){
              //   let mm=answersArray.length+optionsArray.length
              //   let ran=Math.floor(Math.random() * mm);
              //   if(ran>optionsArray.length-1){
              //     finalArray.push(answersArray[z])
              //   }else{
              //     finalArray.splice( ran, 0, answersArray[z]);
              //   }

              // }
              con.mcqQuestions[j].options = answersArray.concat(optionsArray);
            }
          }
          if (con.rewriteQuestions.length > 0) {
            //   answers[i].rewriteQuestions=[]
            for (let z = 0; z < con.rewriteQuestions.length; z++) {
              //   answers[i].rewriteQuestions.push("")
              con.rewriteQuestions[z].array = this.shuffle(
                con.rewriteQuestions[z].question.split(','),
              );
              con.rewriteQuestions[z].state = [];
              for (let c = 0; c < con.rewriteQuestions[z].question.split(',').length; c++) {
                con.rewriteQuestions[z].state.push(false);
              }
            }
          }
          if (con.trueOrFalseQuestions.length > 0) {
            //   answers[i].trueOrFalseQuestions=[]
            //   for(let z=0;z<con.trueOrFalseQuestions.length;z++){
            //     answers[i].trueOrFalseQuestions.push(null)
            //     }
          }
          if (con.completeQuestions.length > 0) {
            //   answers[i].completeQuestions=[]
            for (let z = 0; z < con.completeQuestions.length; z++) {
              let x = con.completeQuestions[z].question.split(/{ Input }|{Input}/);
              // answers[i].completeQuestions.push([])
              for (let j = 0; j < x.length - 1; j++) {
                //  answers[i].completeQuestions[z].push("")
                // .completeQuestions[z].push("")
              }
            }
          }

          if (con.matchingQuestions.length > 0) {
            //   answers[i].matchingQuestions=[]
            let left = [];
            let right = [];
            //   answers[i].matchingQuestions=[]
            for (j = 0; j < con.matchingQuestions.length; j++) {
              left.push(con.matchingQuestions[j].question);
              right.push(con.matchingQuestions[j].answer);
              // answers[i].matchingQuestions.push({question:con.matchingQuestions[j].question,answer:null})
            }
            con.matchingQuestions[0].leftArray = left;
            con.matchingQuestions[0].leftArray = this.shuffle(left);
            // con.matchingQuestions[0].rightArray=this.shuffle(right)
            con.matchingQuestions[0].rightArray = right;
          }
          if (con.qaQuestions.length > 0) {
            //   answers[i].qaQuestions=[]
            //   for(let z=0;z<con.qaQuestions.length;z++){
            //      answers[i].qaQuestions.push("")
            //     }
          }
          if (con.noteTakingQuestions.length > 0) {
            //   answers[i].noteTakingQuestions=[]
            //   for(let z=0;z<con.noteTakingQuestions.length;z++){
            //      answers[i].noteTakingQuestions.push([])
            //      for(let j=0;j<parseInt(con.noteTakingQuestions[z].number);j++){
            //       answers[i].noteTakingQuestions[z].push('')
            //      }
            //     }
          }
          if (con.multipleMatchingQuestions.length > 0) {
            let xx = [
              'A',
              'B',
              'C',
              'D',
              'E',
              'F',
              'G',
              'H',
              'I',
              'J',
              'K',
              'L',
              'M',
              'N',
              'O',
              'P',
              'Q',
              'R',
              'S',
              'T',
              'U',
              'V',
              'W',
              'X',
              'Y',
              'Z',
            ];
            //   answers[i].multipleMatchingQuestions=[]
            for (let z = 0; z < con.multipleMatchingQuestions.length; z++) {
              let tempa = [];
              let statea = [];
              for (let o = 0; o < con.multipleMatchingQuestions[z].paragraphs.length; o++) {
                tempa[o] = xx[o];
                if (o == 0) {
                  statea[o] = true;
                } else {
                  statea[o] = false;
                }
              }
              con.multipleMatchingQuestions[z].listAnswers = tempa;
              con.multipleMatchingQuestions[z].state = statea;
              //  answers[i].multipleMatchingQuestions.push([])
              //  for(let j=0;j<parseInt(con.multipleMatchingQuestions[z].count);j++){
              //   answers[i].multipleMatchingQuestions[z].push('')
              //  }
            }
          }
        }
        if (con.answer_type === 'Text/Attached File') {
          // answers[i].text=""
          // files[x.questions[i].id]={}
        }
        if (con.answer_type === 'Voice Note') {
          // voices[x.questions[i].id]={}
        }
        if (con.answer_type === 'Summary') {
          con.state = [];
          con.stateIndex = true;
          // answers[i].summary=''
        }
        x.questions[i].content = JSON.stringify(con);
      }
      // console.log('answers')
      // console.log(voices)
      let files = this.props.reviewQuiz.data.files;
      let objArray = {};
      for (let i = 0; i < files.length; i++) {
        objArray[files[i].id] = files[i];
      }
      this.setState({
        quiz: x,
        answers: this.props.reviewQuiz.data.answers,
        grades: this.props.reviewQuiz.data.grades,
        feedbacks: this.props.reviewQuiz.data.feedbacks,
        generalFeedback: this.props.reviewQuiz.data.feedback,
        audioFeedback: this.props.reviewQuiz.data.audio_feedback,
        files: objArray,
      });
    }
  }
  mcqUpdate(index, index2, state) {
    let quiz = this.state.quiz;
    let available = JSON.parse(quiz.questions[index].content).mcqQuestions[index2].answers.length;
    let tempAnswers = [...this.state.answers];
    let tempArray = tempAnswers[index].mcqQuestions[index2];
    if (!tempArray.includes(state) && tempArray.length !== available) {
      tempArray.push(state);
    } else if (tempArray.includes(state)) {
      tempArray.splice(tempArray.indexOf(state), 1);
    }
    tempAnswers[index].mcqQuestions[index2] = tempArray;
    console.log(tempAnswers);
    this.setState({ answers: tempAnswers });
  }

  completeUpdate(index, index2, index3, word) {
    let tempAnswers = [...this.state.answers];
    tempAnswers[index].completeQuestions[index2][index3] = word;
    console.log(tempAnswers);
    this.setState({ answers: tempAnswers });
  }

  trueOrFalseUpdate(index, index2, state) {
    let tempAnswers = [...this.state.answers];
    tempAnswers[index].trueOrFalseQuestions[index2] = state;
    console.log(tempAnswers);
    this.setState({ answers: tempAnswers });
  }
  rewriteUpdate(word, index, index2, index3, state) {
    let tempAnswers = [...this.state.answers];
    let x = tempAnswers[index].rewriteQuestions[index2];
    let tmp = JSON.parse(this.state.quiz.questions[index].content);
    tmp.rewriteQuestions[index2].state[index3] = !tmp.rewriteQuestions[index2].state[index3];
    let fin = this.state.quiz;
    fin.questions[index].content = JSON.stringify(tmp);
    this.setState({ quiz: fin });
    if (state) {
      x += word + ' ';
      // x.state[index3]=true
    } else {
      let arr = x.split(' ');
      arr.splice(arr.indexOf(word), 1);
      x = '';
      for (let i = 0; i < arr.length; i++) {
        x += arr[i] + ' ';
      }
    }
    tempAnswers[index].rewriteQuestions[index2] = x;
    console.log(tempAnswers);
    this.setState({ answers: tempAnswers });
  }

  change(index, index2, event) {
    let value = event.target.value;
    let tempAnswers = [...this.state.answers];
    tempAnswers[index].matchingQuestions[index2].answer = value;
    this.setState({ answers: tempAnswers });
    console.log(tempAnswers);
  }
  qaUpdate(index, index2, value) {
    let tempAnswers = [...this.state.answers];
    tempAnswers[index].qaQuestions[index2] = value;
    this.setState({ answers: tempAnswers });
    console.log(tempAnswers);
  }

  ntUpdate(index, index2, index3, value) {
    let tempAnswers = [...this.state.answers];
    tempAnswers[index].noteTakingQuestions[index2][index3] = value;
    this.setState({ answers: tempAnswers });
    console.log(tempAnswers);
  }

  mmUpdate(index, index2, index3, event) {
    let value = event.target.value;
    let tempAnswers = [...this.state.answers];
    tempAnswers[index].multipleMatchingQuestions[index2][index3] = value;
    this.setState({ answers: tempAnswers });
    console.log(tempAnswers);
  }
  mmTabsUpdate(index, index2, index3) {
    let tmp = JSON.parse(this.state.quiz.questions[index].content);
    for (let i = 0; i < tmp.multipleMatchingQuestions[index2].state.length; i++) {
      if (i == index3) {
        tmp.multipleMatchingQuestions[index2].state[i] = true;
      } else {
        tmp.multipleMatchingQuestions[index2].state[i] = false;
      }
    }
    let fin = this.state.quiz;
    fin.questions[index].content = JSON.stringify(tmp);
    this.setState({ quiz: fin });
  }

  handler = (html, text, text2, index) => {
    console.log(text);
    if (text2.includes(text)) {
      let tmp = JSON.parse(this.state.quiz.questions[index].content);
      tmp.state.push(text);
      let fin = this.state.quiz;
      fin.questions[index].content = JSON.stringify(tmp);
      this.setState({ quiz: fin });
    }
  };
  summaryIndex(index, value) {
    let tmp = JSON.parse(this.state.quiz.questions[index].content);
    tmp.stateIndex = value;
    let fin = this.state.quiz;
    fin.questions[index].content = JSON.stringify(tmp);
    this.setState({ quiz: fin });
  }
  summaryUpdate(index, value) {
    let tempAnswers = [...this.state.answers];
    tempAnswers[index].summary = value;
    this.setState({ answers: tempAnswers });
    console.log(tempAnswers);
  }
  textUpdate(index, value) {
    let tempAnswers = [...this.state.answers];
    tempAnswers[index].text = value;
    this.setState({ answers: tempAnswers });
    console.log(tempAnswers);
  }
  submit() {
    this.props.startQuizLoading(true);
    var form = new FormData();
    form.append('answers', JSON.stringify(this.state.answers));
    for (const [key, value] of Object.entries(this.state.voices)) {
      console.log(value.blob);
      form.append(key.toString(), value.blob);
    }
    for (const [key, value] of Object.entries(this.state.files)) {
      if (value) {
        form.append(key.toString(), value);
      }
    }
    console.log(this.state.answers);
    this.props.submitQuiz(this.state.quiz.id, form, this.props.user, this.props);
  }

  updateWhy(value) {
    // alert(value)
    // this.setState({whystart:0,whyend:0})
    if (value.split(',').length > 1) {
      // this.setState({audioCheck:false})
      let a = value.replace('{{', '').replace('}}', '').split(',');
      let s = a[0].split(':');
      let e = a[1].split(':');
      let start = parseInt(s[0]) * 60 + parseInt(s[1]);
      let end = parseInt(e[0]) * 60 + parseInt(e[1]);

      this.setState({ audioCheck: true, whystart: start, whyend: end });
    } else {
      this.setState({ audioCheck: false, why: value });
    }
  }

  render() {
    console.log('this.state.quiz.questions');
    console.log(this.state.quiz);
    const item = this.state.quiz.questions
      ? this.state.quiz.questions[this.state.currentQuestion]
      : null;
    const index = this.state.currentQuestion;
    const { currentTime, songLength } = this.state;
    return (
      <div className="quizzes">
        {this.state.loading ? (
          <div className="headerMargin">
            <div class="loader"></div>
          </div>
        ) : (
          <div>
            <div className="headerMargin"></div>
            <div className="container-fluid mt-5 questionContainer">
              <div className="row justify-content-center">
                <div className="quizContainer">
                  <h3 className="quizName mt-5 mb-5">{this.state.quiz.name}</h3>
                  <div className="row mt-4">
                    <div className="col-12 col-md-12">
                      {/* {this.state.quiz.questions?this.state.quiz.questions.map((item,index)=> */}
                      {this.state.quiz.questions && this.state.quiz.questions[0] ? (
                        <div key={index}>
                          <p className="title">{item.title}</p>
                          {/* {JSON.parse(item.content).video?
                    <div className="video-container">
                      <Vimeo
                      video={JSON.parse(item.content).video.split('/')[JSON.parse(item.content).video.split('/').length-1]}
                      // style={{width:'25rem'}}
                      // autoplay
                    />
                    </div>
                    :null} */}
                          {JSON.parse(item.content).image ? (
                            <div className="col-12 col-md-12 text-center">
                              <img
                                className="questionImage"
                                src={
                                  'https://fadyelfahdy.net/images/' + JSON.parse(item.content).image
                                }
                                alt="image"
                              ></img>
                            </div>
                          ) : null}
                          {JSON.parse(item.content).audio ? (
                            <div>
                              <audio
                                ref={this.myRef}
                                className="audio"
                                controls
                                controlsList="nodownload"
                                src={
                                  'https://fadyelfahdy.net/audio/' +
                                  JSON.parse(item.content).audio +
                                  '#t=' +
                                  this.state.whystart +
                                  ',' +
                                  this.state.whyend
                                }
                                autoPlay={this.state.audioCheck}
                              />
                              {/* <AudioProgressBar currentTime songLength /> */}
                            </div>
                          ) : null}

                          {JSON.parse(item.content).video ? (
                            <div className="video-container">
                              {/* <Vimeo
                      video={JSON.parse(item.content).video.split('/')[JSON.parse(item.content).video.split('/').length-1]}
                      // style={{width:'25rem'}}
                      // autoplay
                    /> */}
                              <div style={{ width: '80%', marginLeft: '10%' }}>
                                <div style={{ marginBottom: '50px' }}>
                                  {JSON.parse(item.content).video.split('/')[
                                    JSON.parse(item.content).video.split('/').length - 3
                                  ] === 'vimeo.com' ? (
                                    <iframe
                                      src={
                                        'https://player.vimeo.com/video/' +
                                        JSON.parse(item.content).video.split('/')[
                                          JSON.parse(item.content).video.split('/').length - 2
                                        ]
                                      }
                                      width="100%"
                                      height="450px"
                                      frameborder="0"
                                      allow="autoplay; fullscreen"
                                      allowfullscreen=""
                                      data-ready="true"
                                    ></iframe>
                                  ) : (
                                    <iframe
                                      src={
                                        'https://player.vimeo.com/video/' +
                                        JSON.parse(item.content).video.split('/')[
                                          JSON.parse(item.content).video.split('/').length - 1
                                        ]
                                      }
                                      width="100%"
                                      height="450px"
                                      frameborder="0"
                                      allow="autoplay; fullscreen"
                                      allowfullscreen=""
                                      data-ready="true"
                                    ></iframe>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : null}
                          {JSON.parse(item.content).answer_type !== 'Summary' &&
                          JSON.parse(item.content).noteTakingQuestions.length === 0 &&
                          (JSON.parse(item.content).qaQuestions.length === 0 ||
                            (JSON.parse(item.content).qaQuestions.length > 0 &&
                              JSON.parse(item.content).one_col === 1)) &&
                          JSON.parse(item.content).mcqQuestions.length === 0 ? (
                            <p
                              className="title2"
                              dangerouslySetInnerHTML={{
                                __html: JSON.parse(item.content).questionText
                                  ? JSON.parse(item.content)
                                      .questionText.replace(
                                        this.state.why,
                                        '<small style=font-size:1.2rem;font-weight:bold;color:#c19d5d;>',
                                      )
                                      .replace(this.state.why, '</small>')
                                      .replace(/\{{(.+?)\}}/g, '')
                                  : null,
                              }}
                            ></p>
                          ) : null}
                          {JSON.parse(item.content).answer_type === 'Text/Attached File' ? (
                            <div className=" mt-2">
                              <div className="col-8 att-container">
                                {/* <input type="text" name="name"  
                    onChange={(txt)=> this.textUpdate(index,txt.target.value)}
                     /> */}
                                <textarea
                                  data-gramm_editor="false"
                                  className="textInput"
                                  type="text"
                                  placeholder=" answer"
                                  spellCheck="false"
                                  disabled
                                  value={this.state.answers[index].text}
                                  onChange={(txt) => this.textUpdate(index, txt.target.value)}
                                />
                              </div>
                              {/* <div className="col-8" >
                    <p className='or'>or</p>
                    </div> */}
                              {/* <div className="col-8 att-container mt-3 row">
                      <p className='or'>or</p>
                    <input  className="inputFile" disabled spellCheck="false"  type="file" name="file" onChange={(event)=>this.onChangeHandler(event,item.id)} />
                    </div> */}

                              {this.state.files[item.id] ? (
                                <img
                                  className="reviewImage"
                                  src={url + this.state.files[item.id].name}
                                  alt="image"
                                ></img>
                              ) : null}
                              {JSON.parse(item.content).grades.map((grade, gradeIndex) => (
                                <div
                                  className="row"
                                  style={{
                                    marginLeft: '2rem',
                                    alignItems: 'center',
                                    marginTop: '1rem',
                                  }}
                                >
                                  <p className="grade-field">{grade[0]}</p>
                                  <div className="grade-container">
                                    <p className="grade">
                                      {this.state.grades[index].text[0]}/{grade[1]}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : JSON.parse(item.content).answer_type === 'Summary' ? (
                            <div>
                              <div className="mmContainer">
                                <Scrollbars
                                  style={{ flex: 8, alignItems: 'center', height: '35rem' }}
                                >
                                  <div className="rewriteContainer">
                                    <p
                                      className="title2"
                                      dangerouslySetInnerHTML={{
                                        __html: JSON.parse(item.content)
                                          .questionText.replace(
                                            this.state.why,
                                            '<small style=font-size:1.2rem;font-weight:bold;color:#c19d5d;">',
                                          )
                                          .replace(this.state.why, '</small>')
                                          .replace(/\{{(.+?)\}}/g, ''),
                                      }}
                                    ></p>
                                  </div>
                                </Scrollbars>
                                <div className="mmCenter">
                                  <div className="verticalLine"></div>
                                </div>

                                <div className="mmRight2">
                                  <Scrollbars
                                    style={{ flex: 8, alignItems: 'center', height: '35rem' }}
                                  >
                                    {/* <div className='rewriteContainer'> */}
                                    <textarea
                                      data-gramm_editor="false"
                                      className="summaryInput2"
                                      rows={5}
                                      type="text"
                                      placeholder=" answer"
                                      spellCheck="false"
                                      disabled
                                      value={this.state.answers[index].summary}
                                      onChange={(txt) =>
                                        this.summaryUpdate(index, txt.target.value)
                                      }
                                    />
                                    {this.state.files[item.id] ? (
                                      <img
                                        className="reviewImage"
                                        style={{ width: '100%' }}
                                        src={url + this.state.files[item.id].name}
                                        alt="image"
                                      ></img>
                                    ) : null}

                                    {/* </div> */}
                                  </Scrollbars>
                                </div>
                              </div>
                              {JSON.parse(item.content).grades.map((grade, gradeIndex) => (
                                <div
                                  className="row"
                                  style={{
                                    marginLeft: '2rem',
                                    alignItems: 'center',
                                    marginTop: '1rem',
                                  }}
                                >
                                  <p className="grade-field">{grade[0]}</p>
                                  <div className="grade-container">
                                    <p className="grade">
                                      {this.state.grades[index].summary[0]}/{grade[1]}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : JSON.parse(item.content).answer_type === 'Voice Note' ? (
                            <div className="mt-2">
                              {/* <div className="col-12 mt-4 px-1">
                    <span
                      className="text-primary"
                      onClick={this.toggleRecording}
                      type="button">

                      <FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>
                    </span>
                    <span className="px-2">Say the answer by voice</span>
                  </div> */}
                              {/* <div className="col-10">
                  <ReactMic
                    record={this.state.record}
                    className="sound-wave w-100"
                    onStop={(data)=>this.onStop(item.id,data)}
                    onData={this.onData}
                    strokeColor="#C19D5D"
                    backgroundColor="#ffffff"
                    visualSetting="frequencyBars"
                  />
                </div> */}
                              <div className="col-10 p-0 m-0">
                                {this.state.files[item.id] ? (
                                  <audio
                                    controls
                                    controlsList="nodownload"
                                    src={url + this.state.files[item.id].name}
                                  />
                                ) : null}
                              </div>

                              {JSON.parse(item.content).grades.map((grade, gradeIndex) => (
                                <div
                                  className="row"
                                  style={{
                                    marginLeft: '2rem',
                                    alignItems: 'center',
                                    marginTop: '1rem',
                                  }}
                                >
                                  <p className="grade-field">{grade[0]}</p>
                                  <div className="grade-container">
                                    <p className="grade">
                                      {this.state.grades[index].voicenote[0]}/{grade[1]}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : JSON.parse(item.content).answer_type === 'Other' ? (
                            <div>
                              {JSON.parse(item.content).trueOrFalseQuestions.length > 0
                                ? JSON.parse(item.content).trueOrFalseQuestions.map(
                                    (trueFalseItem, indextf) => (
                                      <div className="mt-2" key={indextf}>
                                        <h5>{trueFalseItem.question}</h5>
                                        <div className="row ml-4">
                                          <div className=" mt-2 mb-4 px-4 custom-control custom-radio">
                                            <input
                                              disabled
                                              className="form-check-input"
                                              //  name="exampleRadios"
                                              type="radio"
                                              //  id="exampleRadios4"
                                              checked={
                                                this.state.answers[index].trueOrFalseQuestions[
                                                  indextf
                                                ] == 'true'
                                                  ? true
                                                  : false
                                              }
                                            ></input>
                                            <label
                                              className={
                                                JSON.parse(item.content).trueOrFalseQuestions[
                                                  indextf
                                                ].answer == 'True'
                                                  ? 'mcqOptionTrueText form-check-label'
                                                  : 'mcqOptionText form-check-label'
                                              }
                                            >
                                              True
                                            </label>
                                          </div>
                                          <div className=" mt-2 mb-4 px-4 custom-control custom-radio">
                                            <input
                                              className="form-check-input"
                                              //  name="exampleRadios"
                                              type="radio"
                                              disabled
                                              //  id="exampleRadios4"
                                              checked={
                                                this.state.answers[index].trueOrFalseQuestions[
                                                  indextf
                                                ] === 'false'
                                                  ? true
                                                  : false
                                              }
                                            ></input>
                                            <label
                                              className={
                                                JSON.parse(item.content).trueOrFalseQuestions[
                                                  indextf
                                                ].answer !== 'True'
                                                  ? 'mcqOptionTrueText form-check-label'
                                                  : 'mcqOptionText form-check-label'
                                              }
                                            >
                                              False
                                            </label>
                                          </div>
                                        </div>
                                        <div className="grade-container">
                                          <p className="grade">
                                            {this.state.grades[index].trueOrFalseQuestions[indextf]}
                                            /
                                            {
                                              JSON.parse(item.content).trueOrFalseQuestions[indextf]
                                                .grade
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    ),
                                  )
                                : null}

                              {JSON.parse(item.content).completeQuestions.length > 0
                                ? JSON.parse(item.content).completeQuestions.map(
                                    (completeItem, indexC) => (
                                      <div className="complete" key={indexC}>
                                        {completeItem.question
                                          .split(/{ Input }|{Input}/)
                                          .map((txt, indexCC) => (
                                            <div className="completeCard" key={indexCC}>
                                              <h5
                                                className="completeText"
                                                dangerouslySetInnerHTML={{
                                                  __html: txt
                                                    .replace(
                                                      this.state.why,
                                                      '<small style=font-size:1.2rem;font-weight:bold;color:#c19d5d;>',
                                                    )
                                                    .replace(this.state.why, '</small>')
                                                    .replace(/\{{(.+?)\}}/g, ''),
                                                }}
                                              ></h5>

                                              {indexCC ===
                                              completeItem.question.split(/{ Input }|{Input}/)
                                                .length -
                                                1 ? null : (
                                                <div>
                                                  <div className="row">
                                                    <input
                                                      className="completeInput"
                                                      type="text"
                                                      placeholder=" answer here"
                                                      disabled
                                                      value={
                                                        this.state.answers[index].completeQuestions[
                                                          indexC
                                                        ][indexCC]
                                                      }
                                                      data-gramm_editor="false"
                                                      spellCheck="false"
                                                      onChange={(txt) =>
                                                        this.completeUpdate(
                                                          index,
                                                          indexC,
                                                          indexCC,
                                                          txt.target.value,
                                                        )
                                                      }
                                                    />
                                                    <div
                                                      className={
                                                        JSON.parse(item.content).completeQuestions[
                                                          indexC
                                                        ].codes[indexCC] === this.state.why
                                                          ? 'selected-icon-container'
                                                          : 'icon-container'
                                                      }
                                                      style={{ marginTop: '1rem' }}
                                                      onClick={() => {
                                                        this.updateWhy(
                                                          JSON.parse(item.content)
                                                            .completeQuestions[indexC].codes[
                                                            indexCC
                                                          ],
                                                        );
                                                      }}
                                                    >
                                                      <div className="sub2">
                                                        <p className="grade">
                                                          {
                                                            this.state.grades[index]
                                                              .completeQuestions[indexC][indexCC]
                                                          }
                                                          /
                                                          {
                                                            JSON.parse(item.content)
                                                              .completeQuestions[indexC].grades[
                                                              indexCC
                                                            ]
                                                          }
                                                        </p>
                                                      </div>
                                                      <div className="sub1 row">
                                                        <p className="grade">Why</p>

                                                        <FontAwesomeIcon
                                                          icon={faQuestion}
                                                          color="white"
                                                          className="why-icon"
                                                        ></FontAwesomeIcon>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <p
                                                    className="mcqOptionTrueText"
                                                    style={{ textAlign: 'flex-start' }}
                                                  >
                                                    {
                                                      JSON.parse(item.content).completeQuestions[
                                                        indexC
                                                      ].options[indexCC]
                                                    }
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        {/* {JSON.parse(item.content).completeQuestions[indexC].grades.map((grade,indexg)=>
                      <div className={JSON.parse(item.content).completeQuestions[indexC].codes[indexg]===this.state.why?"selected-icon-container":"icon-container"} style={{marginTop:'1rem'}} 
                     
                      onClick={()=>{this.updateWhy(JSON.parse(item.content).completeQuestions[indexC].codes[indexg]);}}
                        >
                      
                      <div className="sub2">
                           <p className="grade">{this.state.grades[index].completeQuestions[indexC][indexg]}/{grade}</p>
                        </div>
                        <div className="sub1 row">
                             <p className="grade">Why</p>

                           <FontAwesomeIcon  icon={faQuestion} color="white" className="why-icon"></FontAwesomeIcon>

                           </div>
                      </div>

               
                    )} */}
                                      </div>
                                    ),
                                  )
                                : null}
                              {JSON.parse(item.content).mcqQuestions.length > 0 ? (
                                <div className="mmContainer">
                                  <Scrollbars
                                    style={{ flex: 8, alignItems: 'center', height: '35rem' }}
                                  >
                                    <div className="rewriteContainer">
                                      <p
                                        className="title2"
                                        dangerouslySetInnerHTML={{
                                          __html: JSON.parse(item.content)
                                            .questionText.replace(
                                              this.state.why,
                                              '<small style=font-size:1.2rem;font-weight:bold;color:#c19d5d;>',
                                            )
                                            .replace(this.state.why, '</small>')
                                            .replace(/\{{(.+?)\}}/g, ''),
                                        }}
                                      ></p>
                                    </div>
                                  </Scrollbars>
                                  <div className="mmCenter">
                                    <div className="verticalLine"></div>
                                  </div>

                                  <div className="mmRight">
                                    <Scrollbars
                                      style={{ flex: 8, alignItems: 'center', height: '35rem' }}
                                    >
                                      <div>
                                        {JSON.parse(item.content).mcqQuestions.map(
                                          (mcq, mcqindex) => (
                                            <div
                                              key={mcqindex}
                                              className={mcqindex !== 0 ? 'mcq' : null}
                                            >
                                              <h5 className="mcqQuestion">{mcq.question}</h5>
                                              <div className="form-check">
                                                {mcq.options.map((option, mcqoptionindex) => (
                                                  <div
                                                    className="row ml-1"
                                                    style={{ height: 'auto', marginTop: '0.5rem' }}
                                                  >
                                                    <div
                                                      className="col-12 mt-4 px-4 custom-control custom-radio align-items-center"
                                                      className="mcqOption"
                                                      key={mcqoptionindex}
                                                    >
                                                      <input
                                                        disabled
                                                        className="form-check-input"
                                                        // name="exampleRadios"
                                                        type="radio"
                                                        // id="exampleRadios1"
                                                        // value="option1"
                                                        style={{ marginTop: '0.5rem' }}
                                                        checked={
                                                          this.state.answers[index].mcqQuestions[
                                                            mcqindex
                                                          ].includes(option)
                                                            ? true
                                                            : false
                                                        }
                                                      ></input>
                                                      <label
                                                        className={
                                                          this.state.grades[index].mcqQuestions[
                                                            mcqindex
                                                          ][mcqoptionindex]
                                                            ? 'mcqOptionTrueText form-check-label'
                                                            : 'mcqOptionText form-check-label'
                                                        }
                                                        // htmlFor="exampleRadios1"
                                                      >
                                                        {option}
                                                      </label>
                                                    </div>
                                                    {this.state.grades[index].mcqQuestions[
                                                      mcqindex
                                                    ][mcqoptionindex] ? (
                                                      <div
                                                        className={
                                                          JSON.parse(item.content).mcqQuestions[
                                                            mcqindex
                                                          ][mcqoptionindex] == this.state.why
                                                            ? 'selected-icon-container'
                                                            : 'icon-container'
                                                        }
                                                        style={{ marginTop: 0 }}
                                                        onClick={() => {
                                                          this.updateWhy(
                                                            JSON.parse(item.content).mcqQuestions[
                                                              mcqindex
                                                            ].codes[mcqoptionindex],
                                                          );
                                                          // this.scrollToMyRef()
                                                        }}
                                                      >
                                                        <div className="sub2">
                                                          <p className="grade">
                                                            {
                                                              this.state.grades[index].mcqQuestions[
                                                                mcqindex
                                                              ][mcqoptionindex]
                                                            }
                                                            /
                                                            {
                                                              JSON.parse(item.content).mcqQuestions[
                                                                mcqindex
                                                              ].grades[mcqoptionindex]
                                                            }
                                                          </p>
                                                        </div>
                                                        <div className="sub1 row">
                                                          <p className="grade">Why</p>

                                                          <FontAwesomeIcon
                                                            icon={faQuestion}
                                                            color="white"
                                                            className="why-icon"
                                                          ></FontAwesomeIcon>
                                                        </div>
                                                      </div>
                                                    ) : //         <div className="grade-container"
                                                    //  >
                                                    //     <p className="grade">{this.state.grades[index].mcqQuestions[mcqindex][mcqoptionindex]}/{JSON.parse(item.content).mcqQuestions[mcqindex].grades[mcqoptionindex]}</p>
                                                    //     </div>
                                                    null}
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </Scrollbars>
                                  </div>
                                </div>
                              ) : null}
                              {JSON.parse(item.content).rewriteQuestions.length > 0
                                ? JSON.parse(item.content).rewriteQuestions.map(
                                    (rewriteItem, rewriteIndex) => (
                                      <div>
                                        <div style={{ marginBottom: '5em', marginTop: '2em' }}>
                                          <div className="rewriteContainer">
                                            {rewriteItem.array.map((word, wordIndex) => (
                                              <div>
                                                <div>
                                                  <div className={'rewriteBtnDisabled'}>
                                                    <h3 className="mmTabText">{word}</h3>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <h3 className="rewriteText2">
                                          {this.state.answers[index].rewriteQuestions[rewriteIndex]}
                                        </h3>
                                        <hr className="rewriteLine" />
                                        <div className="grade-container">
                                          <p className="grade">
                                            {
                                              this.state.grades[index].rewriteQuestions[
                                                rewriteIndex
                                              ]
                                            }
                                            /
                                            {
                                              JSON.parse(item.content).rewriteQuestions[
                                                rewriteIndex
                                              ].grade
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    ),
                                  )
                                : null}
                              {JSON.parse(item.content).noteTakingQuestions.length > 0 ? (
                                <div className="mmContainer">
                                  <Scrollbars
                                    style={{ flex: 8, alignItems: 'center', height: '35rem' }}
                                  >
                                    <div className="rewriteContainer">
                                      {JSON.parse(item.content).questionText ? (
                                        <p
                                          className="title2"
                                          dangerouslySetInnerHTML={{
                                            __html: JSON.stringify(
                                              JSON.parse(item.content)
                                                .questionText.replace(
                                                  this.state.why,
                                                  '<small style=font-size:1.2rem;font-weight:bold;color:#c19d5d;>',
                                                )
                                                .replace(this.state.why, '</small>')
                                                .replace(/\{{(.+?)\}}/g, ''),
                                            ),
                                          }}
                                        ></p>
                                      ) : null}
                                    </div>
                                  </Scrollbars>
                                  <div className="mmCenter">
                                    <div className="verticalLine"></div>
                                  </div>

                                  <div className="mmRight">
                                    <Scrollbars
                                      style={{ flex: 8, alignItems: 'center', height: '35rem' }}
                                    >
                                      <div>
                                        {JSON.parse(item.content).qaQuestions.length > 0 &&
                                        JSON.parse(item.content).one_col === 0
                                          ? JSON.parse(item.content).qaQuestions.map(
                                              (qa, qaindex) => (
                                                <div classnName="row" key={qaindex}>
                                                  <div>
                                                    <h3
                                                      className={
                                                        qaindex !== 0 ? 'qaText' : 'qaText2'
                                                      }
                                                    >
                                                      {qa.question.replace(/\{{(.+?)\}}/g, '')}
                                                    </h3>
                                                    <input
                                                      disabled
                                                      value={
                                                        this.state.answers[index].qaQuestions[
                                                          qaindex
                                                        ]
                                                      }
                                                      className="qaInput"
                                                      type="text"
                                                      placeholder=" answer"
                                                      spellCheck="false"
                                                      data-gramm_editor="false"
                                                      onChange={(txt) =>
                                                        this.qaUpdate(
                                                          index,
                                                          qaindex,
                                                          txt.target.value,
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                  <div
                                                    className={
                                                      JSON.parse(item.content).qaQuestions[qaindex]
                                                        .code == this.state.why
                                                        ? 'selected-icon-container'
                                                        : 'icon-container'
                                                    }
                                                    style={{ marginTop: '1rem' }}
                                                    onClick={() => {
                                                      this.updateWhy(
                                                        JSON.parse(item.content).qaQuestions[
                                                          qaindex
                                                        ].code,
                                                      );
                                                    }}
                                                  >
                                                    <div className="sub2">
                                                      <p className="grade">
                                                        {
                                                          this.state.grades[index].qaQuestions[
                                                            qaindex
                                                          ]
                                                        }
                                                        /
                                                        {
                                                          JSON.parse(item.content).qaQuestions[
                                                            qaindex
                                                          ].grade
                                                        }
                                                      </p>
                                                    </div>
                                                    <div className="sub1 row">
                                                      <p className="grade">Why</p>

                                                      <FontAwesomeIcon
                                                        icon={faQuestion}
                                                        color="white"
                                                        className="why-icon"
                                                      ></FontAwesomeIcon>
                                                    </div>
                                                  </div>
                                                </div>
                                              ),
                                            )
                                          : null}

                                        {JSON.parse(item.content).noteTakingQuestions.map(
                                          (nt, ntindex) => (
                                            <div key={ntindex}>
                                              <h3 className={'qaText'}>
                                                {nt.question.replace(/\{{(.+?)\}}/g, '')}
                                              </h3>
                                              {[...Array(parseInt(nt.number)).keys()].map(
                                                (nta, ntaindex) => (
                                                  <div className="row ntrow">
                                                    <input
                                                      key={'ntaindex' + ntaindex}
                                                      disabled
                                                      value={
                                                        this.state.answers[index]
                                                          .noteTakingQuestions[ntindex][ntaindex]
                                                      }
                                                      className="qaInput2"
                                                      type="text"
                                                      placeholder=" answer"
                                                      spellCheck="false"
                                                      data-gramm_editor="false"
                                                      onChange={(txt) =>
                                                        this.ntUpdate(
                                                          index,
                                                          ntindex,
                                                          ntaindex,
                                                          txt.target.value,
                                                        )
                                                      }
                                                    />
                                                    <div
                                                      className={
                                                        JSON.parse(item.content)
                                                          .noteTakingQuestions[ntindex].codes[
                                                          ntaindex
                                                        ] == this.state.why
                                                          ? 'selected-icon-container'
                                                          : 'icon-container'
                                                      }
                                                      onClick={() => {
                                                        this.updateWhy(
                                                          JSON.parse(item.content)
                                                            .noteTakingQuestions[ntindex].codes[
                                                            ntaindex
                                                          ],
                                                        );
                                                      }}
                                                    >
                                                      <div className="sub2">
                                                        <p className="grade">
                                                          {
                                                            this.state.grades[index]
                                                              .noteTakingQuestions[ntindex][
                                                              ntaindex
                                                            ]
                                                          }
                                                          /
                                                          {
                                                            JSON.parse(item.content)
                                                              .noteTakingQuestions[ntindex].grades[
                                                              ntaindex
                                                            ]
                                                          }
                                                        </p>
                                                      </div>
                                                      <div className="sub1 row">
                                                        <p className="grade">Why</p>

                                                        <FontAwesomeIcon
                                                          icon={faQuestion}
                                                          color="white"
                                                          className="why-icon"
                                                        ></FontAwesomeIcon>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ),
                                              )}
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </Scrollbars>
                                  </div>
                                </div>
                              ) : null}

                              {JSON.parse(item.content).qaQuestions.length > 0 &&
                              JSON.parse(item.content).one_col === 1
                                ? JSON.parse(item.content).qaQuestions.map((qa, qaindex) => (
                                    <div classnName="row" key={qaindex}>
                                      <div>
                                        <h3 className={qaindex !== 0 ? 'qaText' : 'qaText2'}>
                                          {qa.question.replace(/\{{(.+?)\}}/g, '')}
                                        </h3>
                                        <input
                                          disabled
                                          value={this.state.answers[index].qaQuestions[qaindex]}
                                          className="qaInput"
                                          type="text"
                                          placeholder=" answer"
                                          spellCheck="false"
                                          data-gramm_editor="false"
                                          onChange={(txt) =>
                                            this.qaUpdate(index, qaindex, txt.target.value)
                                          }
                                        />
                                      </div>
                                      <div
                                        className={
                                          JSON.parse(item.content).qaQuestions[qaindex].code ==
                                          this.state.why
                                            ? 'selected-icon-container'
                                            : 'icon-container'
                                        }
                                        style={{ marginTop: '1rem' }}
                                        onClick={() => {
                                          this.updateWhy(
                                            JSON.parse(item.content).qaQuestions[qaindex].code,
                                          );
                                        }}
                                      >
                                        <div className="sub2">
                                          <p className="grade">
                                            {this.state.grades[index].qaQuestions[qaindex]}/
                                            {JSON.parse(item.content).qaQuestions[qaindex].grade}
                                          </p>
                                        </div>
                                        <div className="sub1 row">
                                          <p className="grade">Why</p>

                                          <FontAwesomeIcon
                                            icon={faQuestion}
                                            color="white"
                                            className="why-icon"
                                          ></FontAwesomeIcon>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : null}
                              {JSON.parse(item.content).qaQuestions.length > 0 &&
                              JSON.parse(item.content).one_col === 0 ? (
                                JSON.parse(item.content).noteTakingQuestions.length > 0 ? null : (
                                  <div className="mmContainer">
                                    <Scrollbars
                                      style={{ flex: 8, alignItems: 'center', height: '35rem' }}
                                    >
                                      <div className="rewriteContainer">
                                        <p
                                          className="title2"
                                          dangerouslySetInnerHTML={{
                                            __html: JSON.parse(item.content)
                                              .questionText.replace(
                                                this.state.why,
                                                '<small style=font-size:1.2rem;font-weight:bold;color:#c19d5d;>',
                                              )
                                              .replace(this.state.why, '</small>')
                                              .replace(/\{{(.+?)\}}/g, ''),
                                          }}
                                        ></p>
                                      </div>
                                    </Scrollbars>
                                    <div className="mmCenter">
                                      <div className="verticalLine"></div>
                                    </div>

                                    <div className="mmRight">
                                      <Scrollbars
                                        style={{ flex: 8, alignItems: 'center', height: '35rem' }}
                                      >
                                        <div>
                                          {JSON.parse(item.content).qaQuestions.length > 0
                                            ? JSON.parse(item.content).qaQuestions.map(
                                                (qa, qaindex) => (
                                                  <div classnName="row" key={qaindex}>
                                                    <div>
                                                      <h3
                                                        className={
                                                          qaindex !== 0 ? 'qaText' : 'qaText2'
                                                        }
                                                      >
                                                        {qa.question.replace(/\{{(.+?)\}}/g, '')}
                                                      </h3>
                                                      <input
                                                        disabled
                                                        value={
                                                          this.state.answers[index].qaQuestions[
                                                            qaindex
                                                          ]
                                                        }
                                                        className="qaInput"
                                                        type="text"
                                                        placeholder=" answer"
                                                        spellCheck="false"
                                                        data-gramm_editor="false"
                                                        onChange={(txt) =>
                                                          this.qaUpdate(
                                                            index,
                                                            qaindex,
                                                            txt.target.value,
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                    <div
                                                      className={
                                                        JSON.parse(item.content).qaQuestions[
                                                          qaindex
                                                        ].code == this.state.why
                                                          ? 'selected-icon-container'
                                                          : 'icon-container'
                                                      }
                                                      style={{ marginTop: '1rem' }}
                                                      onClick={() => {
                                                        this.updateWhy(
                                                          JSON.parse(item.content).qaQuestions[
                                                            qaindex
                                                          ].code,
                                                        );
                                                      }}
                                                    >
                                                      <div className="sub2">
                                                        <p className="grade">
                                                          {
                                                            this.state.grades[index].qaQuestions[
                                                              qaindex
                                                            ]
                                                          }
                                                          /
                                                          {
                                                            JSON.parse(item.content).qaQuestions[
                                                              qaindex
                                                            ].grade
                                                          }
                                                        </p>
                                                      </div>
                                                      <div className="sub1 row">
                                                        <p className="grade">Why</p>

                                                        <FontAwesomeIcon
                                                          icon={faQuestion}
                                                          color="white"
                                                          className="why-icon"
                                                        ></FontAwesomeIcon>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ),
                                              )
                                            : null}
                                        </div>
                                      </Scrollbars>
                                    </div>
                                  </div>
                                )
                              ) : null}

                              {JSON.parse(item.content).matchingQuestions.length > 0 ? (
                                <div>
                                  {/* <div className="row " >
                        <div className="col-4">
                      {JSON.parse(item.content).matchingQuestions[0].leftArray.map((word,wordIndex)=>
                      <p className='matchingText2'>{word}</p>
                      ) 
                      }
                      </div>
                      <div className="col-7 offset-md-1">
                      {JSON.parse(item.content).matchingQuestions[0].rightArray.map((word,wordIndex)=>
                      <p className='matchingText2'>{word}</p>
                      ) 
                      }
                      </div>
                      </div> */}
                                  <div className="matchingMainContainer">
                                    {JSON.parse(item.content).matchingQuestions[0].leftArray.map(
                                      (word, wordIndex) => (
                                        <div className="matchingContainer">
                                          <div
                                            className="matchingBtn col-4"
                                            // onClick={()=>this.matchingUpdate(index,wordIndex,'left',word)}
                                          >
                                            <p className="matchingText">{word}</p>
                                          </div>
                                          <div className="col-7 offset-md-1 row">
                                            <select
                                              disabled
                                              name={'matching' + wordIndex}
                                              id={'matching' + wordIndex}
                                              className="matchingOptions"
                                              onChange={(event) =>
                                                this.change(index, wordIndex, event)
                                              }
                                            >
                                              {/* <option value>  </option> */}
                                              {JSON.parse(
                                                item.content,
                                              ).matchingQuestions[0].rightArray.map(
                                                (dropoption, dropoptionIndex) => (
                                                  <option
                                                    selected={
                                                      dropoption ===
                                                      this.state.answers[index].matchingQuestions[
                                                        wordIndex
                                                      ].answer
                                                        ? 'selected'
                                                        : null
                                                    }
                                                    value={dropoption}
                                                    key={'m' + dropoptionIndex}
                                                  >
                                                    {dropoption}
                                                  </option>
                                                ),
                                              )}
                                            </select>
                                            <p
                                              className="mcqOptionTrueText"
                                              style={{
                                                marginTop: 'auto',
                                                marginBottom: 'auto',
                                                marginLeft: '1rem',
                                              }}
                                            >
                                              Correct Answer:{' '}
                                              {
                                                JSON.parse(item.content).matchingQuestions[
                                                  wordIndex
                                                ].answer
                                              }
                                            </p>

                                            <div
                                              className={
                                                JSON.parse(item.content).matchingQuestions[
                                                  wordIndex
                                                ].code === this.state.why
                                                  ? 'selected-icon-container'
                                                  : 'icon-container'
                                              }
                                              style={{ marginTop: '1rem' }}
                                              onClick={() => {
                                                this.updateWhy(
                                                  JSON.parse(item.content).matchingQuestions[
                                                    wordIndex
                                                  ].code,
                                                );
                                              }}
                                            >
                                              <div className="sub2">
                                                <p className="grade">
                                                  {
                                                    this.state.grades[index].matchingQuestions[
                                                      wordIndex
                                                    ]
                                                  }
                                                  /
                                                  {
                                                    JSON.parse(item.content).matchingQuestions[
                                                      wordIndex
                                                    ].grade
                                                  }
                                                </p>
                                              </div>
                                              <div className="sub1 row">
                                                <p className="grade">Why</p>

                                                <FontAwesomeIcon
                                                  icon={faQuestion}
                                                  color="white"
                                                  className="why-icon"
                                                ></FontAwesomeIcon>
                                              </div>
                                            </div>
                                            {/* <div className="grade-container" 
                   >
                      <p className="grade">{this.state.grades[index].matchingQuestions[wordIndex]}/{JSON.parse(item.content).matchingQuestions[wordIndex].grade}</p>
                      </div> */}
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              ) : null}

                              {JSON.parse(item.content).multipleMatchingQuestions.length > 0
                                ? JSON.parse(item.content).multipleMatchingQuestions.map(
                                    (mm, mmIndex) => (
                                      <div className="mmContainer">
                                        <Scrollbars
                                          style={{ flex: 8, alignItems: 'center', height: '35rem' }}
                                        >
                                          <div className="rewriteContainer">
                                            {mm.listAnswers.map((word, wordIndex) => (
                                              <div key={'mm' + wordIndex}>
                                                <div
                                                  className={
                                                    JSON.parse(item.content)
                                                      .multipleMatchingQuestions[mmIndex].state[
                                                      wordIndex
                                                    ] === false
                                                      ? 'mmBtn'
                                                      : 'mmBtnDisabled'
                                                  }
                                                  onClick={
                                                    JSON.parse(item.content)
                                                      .multipleMatchingQuestions[mmIndex].state[
                                                      wordIndex
                                                    ] === false
                                                      ? () =>
                                                          this.mmTabsUpdate(
                                                            index,
                                                            mmIndex,
                                                            wordIndex,
                                                          )
                                                      : () =>
                                                          this.mmTabsUpdate(
                                                            index,
                                                            mmIndex,
                                                            wordIndex,
                                                          )
                                                  }
                                                >
                                                  <h3 className="mmTabText">{word}</h3>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                          {mm.paragraphs.map((mmp, mmpIndex) =>
                                            JSON.parse(item.content).multipleMatchingQuestions[
                                              mmIndex
                                            ].state[mmpIndex] === false ? null : (
                                              //  <p key={mmpIndex} className='mmText'>{mmp.replace(/\{{(.+?)\}}/g,'')}</p>
                                              <p
                                                className="title2"
                                                dangerouslySetInnerHTML={{
                                                  __html: mmp
                                                    .replace(
                                                      this.state.why,
                                                      '<small style=font-size:1.2rem;font-weight:bold;color:#c19d5d;>',
                                                    )
                                                    .replace(this.state.why, '</small>')
                                                    .replace(/\{{(.+?)\}}/g, ''),
                                                }}
                                              ></p>
                                            ),
                                          )}
                                        </Scrollbars>
                                        <div className="mmCenter">
                                          <div className="verticalLine"></div>
                                        </div>

                                        <div className="mmRight">
                                          <Scrollbars
                                            style={{
                                              flex: 8,
                                              alignItems: 'center',
                                              height: '35rem',
                                            }}
                                          >
                                            {mm.questions.map((word, wordIndex) => (
                                              <div
                                                className="mmSelect"
                                                // className='mmatchingContainer'
                                              >
                                                {/* <div className='matchingBtn} className="col-2" onClick={()=>this.matchingUpdate(index,wordIndex,'left',word)}> */}
                                                <p
                                                  className="title2"
                                                  dangerouslySetInnerHTML={{
                                                    __html: word
                                                      .replace(
                                                        this.state.why,
                                                        '<small style=font-size:1.2rem;font-weight:bold;color:#c19d5d;>',
                                                      )
                                                      .replace(this.state.why, '</small>')
                                                      .replace(/\{{(.+?)\}}/g, ''),
                                                  }}
                                                ></p>

                                                {/* </div> */}
                                                <div
                                                  className="row"
                                                  style={{
                                                    marginLeft: '1rem',
                                                    alignItems: 'center',
                                                  }}
                                                >
                                                  <select
                                                    disabled
                                                    id={'mmatching' + wordIndex}
                                                    id={'mmatching' + wordIndex}
                                                    className="matchingOptions"
                                                    onChange={(event) =>
                                                      this.mmUpdate(
                                                        index,
                                                        mmIndex,
                                                        wordIndex,
                                                        event,
                                                      )
                                                    }
                                                  >
                                                    {/* <option  selected value>  </option> */}
                                                    {mm.listAnswers.map(
                                                      (dropoption, dropoptionIndex) => (
                                                        <option
                                                          selected={
                                                            dropoption ===
                                                            this.state.answers[index]
                                                              .multipleMatchingQuestions[0][
                                                              wordIndex
                                                            ]
                                                              ? 'selected'
                                                              : null
                                                          }
                                                          value={dropoption}
                                                          key={'mm' + dropoptionIndex}
                                                        >
                                                          {dropoption}
                                                        </option>
                                                      ),
                                                    )}
                                                  </select>
                                                  <p
                                                    className="mcqOptionTrueText"
                                                    style={{
                                                      marginTop: 'auto',
                                                      marginBottom: 'auto',
                                                      marginLeft: '1rem',
                                                    }}
                                                  >
                                                    Correct Answer: {mm.answers[wordIndex]}
                                                  </p>
                                                  <div
                                                    className={
                                                      JSON.parse(item.content)
                                                        .multipleMatchingQuestions[mmIndex].codes[
                                                        wordIndex
                                                      ] == this.state.why
                                                        ? 'selected-icon-container'
                                                        : 'icon-container'
                                                    }
                                                    style={{ marginTop: 0 }}
                                                    onClick={() => {
                                                      this.updateWhy(
                                                        JSON.parse(item.content)
                                                          .multipleMatchingQuestions[mmIndex].codes[
                                                          wordIndex
                                                        ],
                                                      );
                                                    }}
                                                  >
                                                    <div className="sub2">
                                                      <p className="grade">
                                                        {
                                                          this.state.grades[index]
                                                            .multipleMatchingQuestions[mmIndex][
                                                            wordIndex
                                                          ]
                                                        }
                                                        /
                                                        {
                                                          JSON.parse(item.content)
                                                            .multipleMatchingQuestions[mmIndex]
                                                            .grades[wordIndex]
                                                        }
                                                      </p>
                                                    </div>
                                                    <div className="sub1 row">
                                                      <p className="grade">Why</p>

                                                      <FontAwesomeIcon
                                                        icon={faQuestion}
                                                        color="white"
                                                        className="why-icon"
                                                      ></FontAwesomeIcon>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </Scrollbars>
                                        </div>
                                      </div>
                                    ),
                                  )
                                : null}
                            </div>
                          ) : // :null

                          null}
                          {this.state.feedbacks[index] ? (
                            <div className="FeedbackContainer">
                              <p className="title">Feedback:</p>
                              <p className="feedback">{this.state.feedbacks[index]}</p>
                            </div>
                          ) : null}
                          {this.state.generalFeedback ? (
                            <div className="FeedbackContainer">
                              <p className="title">General Feedback:</p>
                              <p className="feedback">{this.state.generalFeedback}</p>
                            </div>
                          ) : null}
                          {this.state.audioFeedback ? (
                            <audio
                              controls
                              controlsList="nodownload"
                              src={'https://fadyelfahdy.net/audios/' + this.state.audioFeedback}
                            />
                          ) : null}
                        </div>
                      ) : null}
                      {/* ):null} */}

                      <div className="row" style={{ marginTop: '50px', marginBottom: '20px' }}>
                        {this.state.currentQuestion !== 0 ? (
                          <div
                            className="previousQuestion"
                            onClick={() =>
                              this.setState({ currentQuestion: this.state.currentQuestion - 1 })
                            }
                          >
                            <p className="btnText">Previous</p>
                          </div>
                        ) : null}
                        {index !== this.state.quiz.questions.length - 1 ? (
                          <div
                            className="nextQuestion"
                            onClick={() =>
                              this.setState({ currentQuestion: this.state.currentQuestion + 1 })
                            }
                          >
                            <p className="btnText">Next</p>
                          </div>
                        ) : null}
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-12 text-center">
                          <span className="mx-2 text-muted">
                            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                          </span>
                          {this.state.quiz.questions.map((p, pIndex) => (
                            <span
                              className={
                                pIndex === this.state.currentQuestion
                                  ? 'mx-2 active pag'
                                  : 'mx-2 pag'
                              }
                              onClick={() => this.setState({ currentQuestion: pIndex })}
                            >
                              {pIndex + 1}
                            </span>
                          ))}

                          <span className="mx-2 text-primary">
                            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-10 col-md-6 my-5 my-md-0">
                  <h5 className="text-muted">No feedback yet</h5>
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const styles = {};

const mapStateToProps = (state) => ({
  reviewQuiz: state.app.reviewQuiz,
  reviewQuizLoading: state.app.reviewQuizLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, actions)(ReviewQuiz);
