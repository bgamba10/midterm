import React, { Component } from 'react';
import request from "../../node_modules/superagent/superagent";
import './App.css';

class App extends Component {

constructor(props) {
    super(props);

    this.state={
      valU1:{}
    };
}

componentDidMount() {
    let me = this;
    fetch("api")
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        me.setState({user : info});
      })
      .catch((err) => console.log(err) );
    
  }

handleChangePlace(event) {
    this.setState({valU1: event.target.value});
    console.log(this.state.valU1);
}

handleSubmit(event) {
    alert('User 1 check: ' + this.state.valU1);
    event.preventDefault();
    
    request
    .post('/api')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({ user1: this.state.valU1
    })
    .end(function(err, res){
        console.log(res.text);
    });
}
  render() {
    return (
      <div className="App">

        <h1>InstaFight</h1>
        <div>
            <form>
      <label>
    User 1 
    <input type="text" name="name" value={this.state.value} onChange={this.handleChangePlace} />
      </label>
      <input type="submit" value="Submit" />
      </form>

            <div>{this.state.user.username}</div>
          
        </div>
        <div>End<span role="img">❤</span>️</div>
      </div>
    );
  }
}

export default App;
