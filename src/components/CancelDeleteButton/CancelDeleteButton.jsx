import React from 'react'
import "../CancelDeleteButton/CancelDeleteButton.scss"

export default function CancelDeleteButton() {
    return (
        <div className='cancelDelete'>
            <button type="button" className="cancelButton" >Cancel</button>


            <button type="button" className="addDelete" >Delete</button>

        </div>
    )
}
