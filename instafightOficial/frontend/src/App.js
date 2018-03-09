import React, { Component } from 'react';
import request from "../node_modules/superagent/superagent";
import './css/main.css';

class App extends Component {

//Constructor method
  constructor(props) {
    super(props);

    this.state={
      valU1:{},
      valU2:{},
      usernameU1: "",
      usernameU2: "",
      likesU1: "",
      likesU2: "",
      history: [],
      winner: "",
      clicked: false,
      commentsU1: "",
      commentsU2: "",
      imgU1: "",
      imgU2: ""
    };

    this.handleChangeUser1= this.handleChangeUser1.bind(this);
    this.handleChangeUser2= this.handleChangeUser2.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    
    
  }
//handles input from first user
  handleChangeUser1(event) {
    this.setState({usernameU1: event.target.value});
  }

//handles input from second user
  handleChangeUser2(event) {
    this.setState({usernameU2: event.target.value});
  }

//Method that handles the submit of the inputs
  handleSubmit(event) {

    console.log("click");
    let me = this;

//fetch from the first user
    fetch("https://www.instagram.com/"+this.state.usernameU1+"/?__a=1")
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      me.setState({valU1 : info});
      console.log(me.state.valU1);

      let cuenta = 0;
      for(let i of this.state.valU1.user.media.nodes){
        cuenta = cuenta + i.likes.count;
      }
      this.setState({likesU1: cuenta});

      let cuenta1 = 0;
      for(let i of this.state.valU1.user.media.nodes){
        cuenta1 = cuenta1 + i.comments.count;
      }
      this.setState({commentsU1: cuenta1});

      me.setState({imgU1: this.state.valU1.user.profile_pic_url_hd })

      console.log(this.state.likesU1);

    })
    .catch((err) => {if(err.status === 404){window.alert("No existe ese usuario")}}  );

//fetch from the second user
    fetch("https://www.instagram.com/"+this.state.usernameU2+"/?__a=1")
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      me.setState({valU2 : info});
      console.log(me.state.valU2);

      let cuenta2 = 0;
      for(let i of this.state.valU2.user.media.nodes){
        cuenta2 = cuenta2 + i.likes.count;
      }
      this.setState({likesU2: cuenta2});

      let cuenta21 = 0;
      for(let i of this.state.valU2.user.media.nodes){
        cuenta21 = cuenta21 + i.comments.count;
      }
      this.setState({commentsU2: cuenta21});

      me.setState({imgU2: this.state.valU2.user.profile_pic_url_hd })

      console.log(this.state.likesU2);

    })
    .catch((err) => {if(err.status === 404){window.alert("No existe ese usuario")}} );

    this.whoWins();
    this.setState({clicked:true});

//post to the DB in the backend
    request
    .post('/api')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({ usernameU1: this.state.usernameU1,
            usernameU2: this.state.usernameU2,
    })
    .end(function(err, res){
        console.log(res.text);
    });
    

  }

// logic of which user has more likes than the other
  whoWins(){
    const userOne = this.state.likesU1;
    const userTwo = this.state.likesU2;
    console.log(userOne);
    console.log(userTwo);
    var condicion = (userOne > userTwo) ? (this.setState({winner: this.state.usernameU1})):(this.setState({winner: this.state.usernameU2}))

  }

//get info from DB after everything is loaded
  componentDidMount() {
    let me = this;
    fetch("/api")
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        me.setState({history : info});
      })
      .catch((err) => console.log(err) );
  }

//this renders the htlm DOM
  render() {
    return (
      <div className="App">
      <div className="container-contact2">
            <div className="wrap-contact2">

                  <h1 className="contact2-form-title">InstaFight</h1>
                  

                  <div className="wrap-input2 validate-input" data-validate="Username Required">  
                        <input className="input2" type="text" name="name" value={this.state.value} onChange={this.handleChangeUser1} />
                        <span className="focus-input2" data-placeholder="FIRST RIVAL"></span>
                  </div>
                  <div className="wrap-input2 validate-input" data-validate="Username Required"> 
                        <input className="input2" type="text" name="name" value={this.state.value} onChange={this.handleChangeUser2} />
                        <span className="focus-input2" data-placeholder="SECOND RIVAL"></span>
                  </div>
                  <div className="container-contact2-form-btn">
                        <div className="wrap-contact2-form-btn">
                            <div className="contact2-form-bgbtn"></div>
                            <button className="contact2-form-btn" onClick={this.handleSubmit.bind(this)} >Submit</button>
                      </div>
                </div>
                {this.state.clicked && <h2 className="pasado1">The TOP InstaFighter is <span id="gana">{this.state.winner}</span></h2>}
                <div className="row">
                    <div className = "col-sm-6">
                      <div className="wrap-input100 rs1-wrap-input100">
                            <h3 className="pasado">{this.state.usernameU1}</h3>
                            {this.state.clicked &&<img className="foticos" src={this.state.imgU1} alt="first user profile pic"/>}
                            {this.state.clicked && <h4>Number of comments from all pictures {this.state.commentsU1}</h4>}
                      </div>
                      </div>
                      <div className = "col-sm-6">
                      <div className="wrap-input100 rs1-wrap-input100">
                            <h3 className="pasado">{this.state.usernameU2}</h3>
                            {this.state.clicked && <img className="foticos" src={this.state.imgU2} alt="second user profile pic"/>}
                            {this.state.clicked && <h4>Number of comments from all pictures {this.state.commentsU2}</h4>}
                      </div>
                      </div>
                </div>
                
                <h2 className="pasado">Past Fights</h2>
                <h4 className="pasado">You can try them out</h4>
                <div className="pasado"> {this.state.history.map((d,index) => {
                  return <p value={d} key = {index}> {d.usernameU1} <span id="vs"> •vs• </span> {d.usernameU2}</p>
            })}</div>
            <div className="pasado"><span role="img" aria-label="Thunder">⚡️</span>️</div>
      </div>
</div>
</div>

  
      );
  }
}

export default App;

