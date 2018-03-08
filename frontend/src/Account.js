import React, { Component } from 'react';

class Account extends Component {

constructor(props) {
    super(props);

    this.state={
      user:""
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


}