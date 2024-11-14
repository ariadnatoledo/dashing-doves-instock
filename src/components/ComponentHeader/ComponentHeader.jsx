import React from 'react';
import "../ComponentHeader/ComponentHeader.scss";
import PropTypes from 'prop-types';

export default function ComponentHeader({ text, backIcon, editIcon, editIconTablet}) {
    return (
        <div className='componentHeader'>
            <div className='componentHeader-1'>
                {backIcon && (
                    <button className='backIcon' >
                        <img src={backIcon} alt='Back Arrow Icon' />
                    </button>
                )}
                <h2 className='componentTitle'>{text}</h2>
            </div>

            {(editIcon || editIconTablet) && (
                <div className='componentHeader-2'>
                    {editIcon && (
                        <button className='editMobile' >
                            <img src={editIcon} className='editIcon' alt='Edit Icon for Mobile' />
                        </button>
                    )}
                    {editIconTablet && (
                        <button className='editTablet' >
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
