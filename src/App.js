import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';
import Message from './Component/Message'
import MessageList from './Component/MessageList'
import Toolbar from './Component/Toolbar'


class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: []

    }
  }

  async componentDidMount() {
    let result = await fetch("http://localhost:8082/api/messages");
    let data = await result.json();
    this.setState({
      messages: data,
    })
  }



  render() {
    return (
      <>
        <Toolbar />
        <Message />
        <MessageList />
      </>
    )
  }
}

export default App;
