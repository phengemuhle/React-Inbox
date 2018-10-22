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
    this.patch([event], 'star', "star", true)
  }
  selectMessage = (event) => {
    this.patch([event], "select", 'selected')
  }
  markChecked = (event) => {
    this.patch([event], "starred", 'starred', true)
  }
  showBody = (event) => {
    this.patch([event], 'read', 'read', true)
    this.patch([event], 'show', 'show')
  }

  addLabel = (event) => {
    this.state.messages.map(item => {
      if (item.selected === true) {
        return this.patch([item.id], 'addLabel', "label", event.target.value)
      }
    })
    console.log(event.target.id)
  }

  removeLabel = (event) => {
    this.state.messages.map(item => {
      if (item.selected === true) {
        return this.patch([item.id], 'removeLabel', "label", event.target.value)
      }
    })
  }

  itemDelete = () => {
    this.state.messages.map(item => {
      if (item.selected) {
        return this.patch([item.id], 'delete')
      }
    })
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
  markUnread = (event) => {
    event.preventDefault()
    let selected = this.state.messages.filter(item => item.selected === true)
    selected.map(item => this.patch(item.id, 'read', 'read', false))
  }
  markRead = (event) => {
    event.preventDefault()
    let selected = this.state.messages.filter(item => item.selected === true)
    selected.map(item => this.patch(item.id, 'read', 'read', true))
  }
  deselectAll = () => {
    let messages = this.state.messages
    let selected = this.state.messages.filter(item => item.selected === true)
    let notSelected = this.state.messages.filter(item => item.selected === false)

    if (selected.length === messages.length) {
      selected.map(item => { this.patch([item.id], 'select', 'selected') })

    } else {
      notSelected.map(item => { this.patch([item.id], 'select', 'selected', true) })

    }
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
        <Toolbar composeMessage={this.state.composeMessage} deselectAll={this.deselectAll} markUnread={this.markUnread} markRead={this.markRead} itemDelete={this.itemDelete} addLabel={this.addLabel} removeLabel={this.removeLabel} toggleMessage={this.toggleMessage} messages={this.state.messages} />
        <Message composeMessage={this.state.composeMessage} bodyOnChange={this.bodyOnChange} subjectOnChange={this.subjectOnChange} submitMessage={this.submitMessage} />
        <MessageList messages={this.state.messages} selectMessage={this.selectMessage} selectedId={this.selectedId} markStarred={this.markStarred} showBody={this.showBody} />
      </>
    )
  }
}

export default App;
