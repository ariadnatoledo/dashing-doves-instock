import React from 'react';
import "./SaveCancelAddButton.scss";

export default function SaveCancelAddButton({ showSave, showAddWarehouse, showAddItem }) {
    return (
        <div className='saveCancel'>
            <button type="button" className="cancelButton" >Cancel</button>

            {showSave && (
                <button type="button" className="saveButton" >Save</button>
            )}

            {showAddWarehouse && (
                <button type="button" className="addWarehouse" >+ Add Warehouse</button>
            )}

            {showAddItem && (
                <button type="button" className="addItem" >+ Add Item</button>
            )}


        </div>
    );
}
