import React from 'react';


class InputForm extends React.Component{
 render(){
     return(
        <div className="formContainer">
            <form onSubmit={this.props.onSubmit}>
                <input 
                type="text" 
                onChange={this.props.onChange} 
                placeholder="enter a sentence" 
                value={this.props.inputTracker} 
                />
                <button>Submit</button>
            </form> 
      </div>
     )
 }
}

export default InputForm;
