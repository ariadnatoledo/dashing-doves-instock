import React from 'react';
import '../CancelDeleteButton/CancelDeleteButton.scss';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function CancelDeleteButton({ navigateTo, inventory, onDeleteSuccess }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(navigateTo);
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/inventory/${inventory.id}`);
            console.log(`Item ${inventory.item_name} deleted successfully.`);
            onDeleteSuccess();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    return (
        <div className='cancelDelete'>
            <button type="button" className="cancelButton" onClick={handleBackClick}>Cancel</button>
            <button type="button" className="addDelete" onClick={handleDelete}>Delete</button>
        </div>
    );
}
