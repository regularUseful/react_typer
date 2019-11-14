import React from 'react';



class InputForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputTracker: ""
        }
        this.changeValue = this.changeValue.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeValue(e){
        this.setState({
            inputTracker: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.inputTracker === ""){
            return true;
        }
        this.props.submitForm(this.state.inputTracker);
        this.setState({
            inputTracker: ""
        })
      }

 render(){
     return(
        <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
                <input 
                type="text" 
                onChange={this.changeValue} 
                placeholder="enter a sentence" 
                value={this.state.inputTracker} 
                />
                <button>Submit</button>
            </form> 
      </div>
     )
 }
}

export default InputForm;
