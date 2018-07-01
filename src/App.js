import React, { Component } from 'react';

class App extends Component {
    constructor(){
        super();
        this.state = {phoneInput:"",formattedInput:""};
    }

    formatInput=(input)=>{
        if(input.length > 0 && input.length <=3){
            return `(${input})`;
        }
        if (input.length >3 && input.length <=6){
            return `(${input.slice(0,3)}) ${input.slice(3)}`;
        }
        if (input.length >6 && input.length <=10){
            return `(${input.slice(0,3)}) ${input.slice(3,6)}-${input.slice(6)}`;
        }
        else return input;
    }

    phoneChanged=(e)=>{
        //case of backspace:
        if(e.target.value.length<this.state.formattedInput.length){
            let newPhoneInput = e.target.value.length===2 ? "" : this.state.phoneInput.slice(0,this.state.phoneInput.length-1);
            this.setState({phoneInput:newPhoneInput},()=>{
                this.setState({formattedInput:this.formatInput(this.state.phoneInput.slice(2))});
            });
            return;
        }

        //case of new number
        let char = e.target.value.charAt(e.target.value.length-1);
        if(isNaN(char)){
            return;
        }
        this.setState({formattedInput:this.formatInput(this.state.phoneInput.slice(2) + char)});

        if(this.state.phoneInput === ""){
            char = `+1${char}`;
        }
        this.setState({phoneInput:this.state.phoneInput + char});
    }


  render() {
    return (
        <div>
            <input style={{"width":"200px"}} type="text" onChange={this.phoneChanged} placeholder="Start typing a phone number" value={this.state.formattedInput}/>
            <div>
                <span>Value:</span>
                <p style={{"display":"inline"}}>{this.state.phoneInput}</p>
            </div>
        </div>
    );
  }
}

export default App;
