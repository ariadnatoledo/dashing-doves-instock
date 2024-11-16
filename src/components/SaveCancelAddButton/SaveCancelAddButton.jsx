import React from 'react';
import "./SaveCancelAddButton.scss";
import { useNavigate } from 'react-router-dom';

export default function SaveCancelAddButton({ showSave, showAddWarehouse, showAddItem }) {
    const navigate = useNavigate();

    const handleCancelClick = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <div className="saveCancel">
            <button type="button" className="cancelButton" onClick={handleCancelClick}>
                Cancel
            </button>

            {showSave && (
                <button type="submit" className="saveButton" >Save</button>
            )}

            {showAddWarehouse && (
                <button type="submit" className="addWarehouse" >+ Add Warehouse</button>
            )}

            {showAddItem && (
                <button type="submit" className="addItem" >+ Add Item</button>
            )}
        </div>
    );
}

