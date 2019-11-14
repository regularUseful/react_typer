import React from 'react';
import InputForm from './InputForm'
import './Typer.css'

class Typer extends React.Component{
  
    static defaultProps = {
      typedWords: [["h", "i"],["hello again"], ["and goodbye"]],
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
        inputTracker: ""
      };
      this.typeNow = this.typeNow.bind(this);
      this.typeFunc = this.typeFunc.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.randomType = this.randomType.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let tempWordArr = this.state.inputTracker.toString().split("")
        this.setState({
            wordArr: [...this.state.wordArr, tempWordArr]
        })
    }
  
    handleChange(e){
      this.setState({
        inputTracker: e.target.value
      })
      console.log(this.state.inputTracker)
    }
    
    typeFunc(){
        let typedWords =  this.state.wordArr
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
      //this.randomType()
    }
  
  randomType(){
    let randomTime = Math.random() * 200;
    setTimeout(this.typeFunc, randomTime);
  }
    
    typeNow(){
      setInterval(this.typeFunc, 100)
    }
    
    render(){
      return(<div>
          <h1 className="typedHeading">{this.state.typedArr}</h1>
          <button onClick={this.typeNow}>start</button>
          <InputForm onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        </div>)
    }
  }

  export default Typer