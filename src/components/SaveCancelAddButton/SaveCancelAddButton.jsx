import React from 'react';
import "./SaveCancelAddButton.scss";
import { useNavigate } from 'react-router-dom';

export default function SaveCancelAddButton({ showSave, showAddWarehouse, showAddItem, navigateTo }) {
    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate(navigateTo);
    };

    return (
        <div className="saveCancel">
            <button type="button" className="cancelButton" onClick={handleCancelClick}>
                Cancel
            </button>

            {showSave && (
                <button type="button" className="saveButton">
                    Save
                </button>
            )}

            {showAddWarehouse && (
                <button type="submit" className="addWarehouse">
                    + Add Warehouse
                </button>
            )}

            {showAddItem && (
                <button type="button" className="addItem">
                    + Add Item
                </button>
            )}
        </div>
    );
}

