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
      messages: [],
      unreadMessage: 0,
      composeMessage: true,
      isSelected: [],
      markAsRead: false,
      body: [],
      subject: [],
    }
  }

  async componentDidMount() {
    let result = await fetch("http://localhost:8082/api/messages");
    let firstdata = await result.json();
    // let data = firstdata.map(item => {
    //   return item
    // })
    // console.log(data)
    this.setState({
      messages: [...firstdata],
    })
    console.log(this.state.messages)
  }

  toggleMessage = () => {
    if (this.state.composeMessage === true) {
      this.setState({
        composeMessage: false
      })
    } else {
      this.setState({
        composeMessage: true
      })
    }
  }

  patch = async (id, command, attribute, value) => {
    console.log(id, command, attribute, value)
    var patch = {
      messageIds: [id],
      command: command,
      [attribute]:
        value
    }
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    this.setState({
      messages: posted
    })
  }

  markStarred = (event) => {
    this.patch([event.target.id], 'star', "star", true)
  }

  selectMessage = (event) => {
    this.patch([event.target.id], "select", 'selected')
  }
  markChecked = (event) => {
    this.patch([event.target.id], "starred", 'starred', true)
  }
  addLabel = (event) => {
    this.patch([event.target.id], 'addLabel', "label", event.target.value)
  }
  removeLabel = (event) => {
    this.patch([event.target.id], 'removeLabel', "label", event.target.value)
  }
  itemDelete = (event) => {
    this.patch([event.target.id], 'delete')
  }

  subjectOnChange = (e) => {
    console.log(e.target.value)
    var subject = e.target.value
    this.setState({
      subject: subject
    })
  }
  bodyOnChange = (e) => {
    console.log(e.target.value)
    var body = e.target.value
    this.setState({
      body: body
    })
  }
  selectedId = (event) => {
    this.setState({
      isSelected: event.target.id
    })
  }

  submitMessage = async (e) => {
    var newMessage = {
      subject: [this.state.subject],
      read: false,
      labels: [],
      body: [this.state.body],
      id: [this.state.messages.length],
    }
    await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json; charset=utf - 8'
      }
    }).then(response => response.json())

      .then((response) => {
        this.setState({
          messages: [...this.state.messages, response]
        })
      })
  }

  render() {
    return (
      <>
        <Toolbar composeMessage={this.state.composeMessage} itemDelete={this.itemDelete} addLabel={this.addLabel} removeLabel={this.removeLabel} toggleMessage={this.toggleMessage} count={this.state.unreadMessage} />
        <Message composeMessage={this.state.composeMessage} bodyOnChange={this.bodyOnChange} subjectOnChange={this.subjectOnChange} submitMessage={this.submitMessage} />
        <MessageList messages={this.state.messages} selectMessage={this.selectMessage} selectedId={this.selectedId} markStarred={this.markStarred} />
      </>
    )
  }
}

export default App;
