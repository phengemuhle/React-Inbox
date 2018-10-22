import React from 'react'

const toolbar = (props) => {
    let count = props.messages.filter(item => item.read === false)
    let plurl = true
    let select = props.messages.filter(item => item.read === false)
    if (select.length === 1) {
        plurl = false
    }

    console.log(props.unRead)
    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{count.length}</span>
                    {`Unread message${plurl ? "s" : ""}`}
                </p>

                <a onClick={props.toggleMessage} className="btn btn-danger">
                    <i className={`fa  ${props.composeMessage ? " fa-plus" : "fa-minus"}`}></i>
                </a>
                <button onClick={props.deselectAll} className="btn btn-default">
                    <i className="fa fa-minus-square-o"></i>
                </button>

                <button onClick={props.markRead} className="btn btn-default">Mark As Read</button>

                <button onClick={props.markUnread} className="btn btn-default">Mark As Unread</button>

                <select onChange={(e) => { props.addLabel(e); e.target.selectedIndex = 0 }} className="form-control label-select">
                    <option selected disabled >Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select onChange={(e) => { props.removeLabel(e); e.target.selectedIndex = 0 }} className="form-control label-select">
                    <option selected disabled >Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button onClick={props.itemDelete} className="btn btn-default">
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}
export default toolbar


