import React from 'react'

const MessageList = (props) => {

    var messages = props.messages.map(message => {
        return (
            <div>
                <div
                    className={`row message ${message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''}`}>
                    <div className='col-xs-1'>
                        <div className='row'>
                            <div className='col-xs-2'>
                                <input type='checkbox'
                                    onChange={() => props.selectMessage(message.id)}

                                    checked={`${message.selected ? 'defaultChecked' : ''}`}
                                />
                            </div>
                            <div className='col-xs-2'>
                                <i onClick={() => props.markStarred(message.id)} className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`}></i>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => props.showBody(message.id)} className='col-xs-11'>
                        <span className='label label-warning'>{message.labels[0]}</span>
                        <span className='label label-warning'>{message.labels[1]}</span>
                        <span className='label label-warning'>{message.labels[2]}</span>

                        <a
                        >{message.subject}</a>
                    </div>
                </div>
                <div className={`row message-body ${message.show ? '' : 'hidden'}`} >
                    <div className='col-xs-11 col-xs-offset-1'>
                        {message.body}
                    </div>
                </div>
            </div >
        )
    })

    return (
        <>
            <div className='container messageListContainer'>
                {messages}
            </div>
        </>
    )
}
export default MessageList