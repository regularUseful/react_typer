import React from 'react';
import InputForm from './InputForm'
import './Typer.css'

class Typer extends React.Component{
  
    static defaultProps = {
      typedWords: [["E" ,"n", "t", "e", "r", " ", "a", " ", "s", "e", "n", "t", "e", "n", "c", "e"]],
    }
    
    constructor(props){
      super(props);
      this.state = { 
        wordArr: [],
        typedArr: [],
        count: 0,
        wordNum: 0,
        reverse: false,
        break: false,
        breakCount: 0,
        inputTracker: "",
        randomDisplay: "Start",
        startDisplay: "Start",
        randomSwitch: false,
        intervalRunning: false
      };
      this.typeNow = this.typeNow.bind(this);
      this.typeFunc = this.typeFunc.bind(this);
      this.randomType = this.randomType.bind(this);
      this.handleSubmitForm = this.handleSubmitForm.bind(this);
      this.handleRandom = this.handleRandom.bind(this);
      this.stopInterval = this.stopInterval.bind(this);
      this.stopRandom = this.stopRandom.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleSubmitForm(value){
        let tempWordArr = value.toString().split("")
        this.setState({
            wordArr: [...this.state.wordArr, tempWordArr],
        })
        console.log(value)
      }

      handleChange(e){
        this.setState({
          inputTracker: e.target.value
        })
        console.log(this.state.inputTracker)
      }

    
    typeFunc(){
        let typedWords =  this.state.wordArr
        if(typedWords.length === 0){
          typedWords = this.props.typedWords
        }
        let tempArr = typedWords[this.state.wordNum].slice(0, this.state.count + 1); 
        if(this.state.break === true && this.state.breakCount < 10){
          this.setState({
            breakCount: this.state.breakCount + 1
          })
        }
      else{
         this.setState(st=> ({
          typedArr: tempArr,
          count:  st.reverse === true ? st.count - 1 : st.count + 1,
          wordNum: st.wordNum === typedWords.length ? 0 : st.wordNum,
        }),this.setState(st=>({
          break: st.count === typedWords[this.state.wordNum].length ? true : false,
          breakCount: 0,
          reverse: st.count === typedWords[this.state.wordNum].length || st.count < 0 ? !st.reverse : st.reverse,
          wordNum: st.count < 0 ? st.wordNum + 1: st.wordNum
        })))
        
      }
      console.log(this.state.inputTracker)
      this.state.randomSwitch && this.randomType()
    }
  
  randomType(){
    let randomTime = Math.floor((Math.random() * 500) + 200);
    console.log(randomTime)
    setTimeout(this.typeFunc, randomTime);
  }


  handleRandom(){
    this.stopInterval();
    this.setState({
      randomSwitch: !this.state.randomSwitch,
      randomDisplay: this.state.randomSwitch ? "Start": "Stop"
    }, this.randomType())
  }
    
    typeNow(){
      if(!this.state.intervalRunning){
        this.stopRandom()
        let running = setInterval(this.typeFunc, 100)
        this.setState({
          intervalRunning: true,
          myInterval: running,
          startDisplay: "Stop"
        })
      }
      else{
        this.stopInterval()
      }
    }

    stopInterval(){
      clearInterval(this.state.myInterval)
        this.setState({
          intervalRunning: false,
          startDisplay: "Start"
        })
    }

    stopRandom(){
      this.setState({
        randomSwitch: false,
        randomDisplay: "Start"
      })
    }
    
    render(){
      return(
      <div className="container">
          <h1 className="typedHeading">{this.state.typedArr}<span className="blinker">|</span></h1>
          <div>
            <button onClick={this.typeNow}>{this.state.startDisplay}</button>
            <button onClick={this.handleRandom}>{this.state.randomDisplay}</button>
          </div>
          <InputForm submitForm={this.handleSubmitForm} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        </div>)
    }
  }

  export default Typer