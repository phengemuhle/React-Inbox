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
      markAsRead: false,
      body: [],
      subject: [],
    }
  }
  markRead = () => {
    var readOrNot = this.state.markAsRead
    if (readOrNot === true) {
      readOrNot = false
    } else {
      readOrNot = true
    }
    this.setState({
      markAsRead: readOrNot,
    })
  }

  async componentDidMount() {
    let result = await fetch("http://localhost:8082/api/messages");
    let firstdata = await result.json();
    let data = firstdata.map(item => {
      item.selected = false
      return item
    })
    this.setState({
      messages: [...data],
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


  // patch = async (id, command, attribute) => {
  // var patch = {
  //   messageIds: id,
  //   command: command,
  //   attribute,
  // }
  //   const response = await fetch('http://localhost:8082/api/messages', {
  //     method: 'PATCH',
  //     body: JSON.stringify(patch),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     }
  //   })
  //   const posted = await response.json()
  //   this.setState({
  //     messages: posted
  //   })
  // }
  // markStarred = (event) => {  
  //   let attribute = { star: true }
  //   this.patch(event.target.id, 'star', attribute)
  // }
  markStarred = async (event) => {
    var patch = {
      messageIds: [event.target.id],
      command: 'star',
      star: true,
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
  markChecked = async (event) => {
    var patch = {
      messageIds: [event.target.id],
      command: 'select',
      selected: true,
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

  addLabel = async (event) => {
    var patch = {
      messageIds: [6],
      command: 'addLabel',
      label: event.target.value,
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

  removeLabel = async (event) => {
    var patch = {
      messageIds: [6],
      command: 'removeLabel',
      label: event.target.value,
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

  itemDelete = async (event) => {
    var patch = {
      messageIds: [event.target.id],
      command: 'delete',
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
        <Message composeMessage={this.state.composeMessage} body={this.state.body} subject={this.state.subject} submitMessage={this.submitMessage} />
        <MessageList messages={this.state.messages} markChecked={this.markChecked} markStarred={this.markStarred} />
      </>
    )
  }
}

export default App;


// patch = async (id, command, attribute) => {
//   var patch = {
//     messageIds: id,
//     command: command,
//     attribute,
//   }
//   const response = await fetch('http://localhost:8082/api/messages', {
//     method: 'PATCH',
//     body: JSON.stringify(patch),
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     }
//   })
//   const posted = await response.json()
//   this.setState({
//     messages: posted
//   })
// }


// var object = ({
//   firstName: FirstName,
//   lastName: LastName,
//   role: role
// })
// fetch('https://galvanize-student-apis.herokuapp.com/gpersonnel/users', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json; charset=utf-8' },
//   body: JSON.stringify(object)

// })
//   .then(response => response.json())
//   .then((response) => {
//     para.setAttribute('class', 'save-status')
//     var save = document.querySelector('.save-status')
//     para.innerText = response.message
//     save.style.opacity = '1'
//     setTimeout(function () {
//       save.style.opacity = '0'
//     }, 2000)
//   })