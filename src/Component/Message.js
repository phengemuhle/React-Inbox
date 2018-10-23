import React from 'react'

const message = (props) => {

    return (
        <form className={`form-horizontal well ${props.composeMessage ? 'hidden' : ''}`}>
            <div className='form-group'>
                <div className='col-sm-8 col-sm-offset-2'>
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className='form-group'>
                <label for='subject' className='col-sm-2 control-label'>Subject</label>
                <div className='col-sm-8'>
                    <input type='text' onChange={(e) => props.subjectOnChange(e)} className='form-control' id='subject' placeholder='Enter a subject' name='subject'></input>
                </div>
            </div>
            <div className='form-group'>
                <label for='body' className='col-sm-2 control-label'>Body</label>
                <div className='col-sm-8'>
                    <textarea name='body' id='body' onChange={(e) => props.bodyOnChange(e)} className='form-control'></textarea>
                </div>
            </div>
            <div className='form-group'>
                <div className='col-sm-8 col-sm-offset-2'>
                    <input type='submit' onClick={(e) => props.submitMessage(e)} value='Send' className='btn btn-primary'></input>
                </div>
            </div>
        </form>
    )
}
export default message
