import React from 'react';
import "../ComponentHeader/ComponentHeader.scss";
import backIconImage from "../../assets/Icons/arrowback.svg";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function ComponentHeader({ text, editIcon, editIconTablet, navigateTo, navigateToEdit}) {
    const navigate = useNavigate();
    const editNavigate = useNavigate();

    const handleBackClick = () => {
        navigate(navigateTo); // Navigate to the route passed via prop
      };
      const handleEditClick = () => {
        editNavigate(navigateToEdit)
      };
    return (
        <div className='componentHeader'>
            <div className='componentHeader-1'>
                
                    <button onClick={handleBackClick} className='backIcon' >
                        <img src={backIconImage} alt='Back Arrow Icon' />
                    </button>
                
                <h2 className='componentTitle'>{text}</h2>
            </div>

            {(editIcon || editIconTablet) && (
                <div className='componentHeader-2'>
                    {editIcon && (
                        <button className='editMobile'  onClick={handleEditClick} >
                            <img src={editIcon} className='editIcon' alt='Edit Icon for Mobile' />
                        </button>
                    )}
                    {editIconTablet && (
                        <button className='editTablet' onClick={handleEditClick}>
                            <img src={editIconTablet} className='editIconTablet' alt='Edit Icon for Tablet' />
                            <span className='editText'>Edit</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

ComponentHeader.propTypes = {
    text: PropTypes.string.isRequired,
    backIcon: PropTypes.string,
    editIcon: PropTypes.string,
    editIconTablet: PropTypes.string,
    
};

ComponentHeader.defaultProps = {
    backIcon: null,
    editIcon: null,
    editIconTablet: null,
    
};
