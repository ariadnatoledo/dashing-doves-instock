import React from 'react'
import "../EditWarehouse/EditWarehouse.scss"
import ComponentHeader from '../ComponentHeader/ComponentHeader'
import backIconImage from "../../assets/Icons/arrowback.svg";

import SaveCancelAddButton from '../SaveCancelAddButton/SaveCancelAddButton';


function EditWarehouse() {
    return (
       
            <form className='editWarehouse-form'>
                <ComponentHeader backIcon={backIconImage} text="Edit Warehouse" />
                <section className='editWarehouse'>
                    <div className='warehouseDetails'>

                        <h2 className='warehouseDetails-title'>Warehouse Details</h2>
                        <h3 className='warehouseDetails-name'>Warehouse Name</h3>
                        <textarea className='warehouseDetails-name-input' name='warehouseName' placeholder='Washington' required></textarea>
                        <h3 className='warehouseDetails-address'>Street Address</h3>
                        <textarea className='warehouseDetails-address-input' name='warehouseAddress' placeholder='33 Pearl Street SW' required></textarea>
                        <h3 className='warehouseDetails-city'>City</h3>
                        <textarea className='warehouseDetails-city-input' name='warehouseCity' placeholder='Washington' required></textarea>
                        <h3 className='warehouseDetails-country'>Country</h3>
                        <textarea className='warehouseDetails-country-input' name='warehouseCountry' placeholder='USA' required></textarea>


                    </div>
                    <div className='border'></div>
                    <div className='contactDetails'>
                        <h2 className='contactDetails-title'> Contact Details</h2>
                        <h3 className='contactDetails-name'>Contact Name</h3>
                        <textarea className='contactDetails-name-input' name='contactName' placeholder='Graeme Lyon' required></textarea>
                        <h3 className='contactDetails-position'>Position</h3>
                        <textarea className='contactDetails-position-input' name='contactPosition' placeholder='Warehouse Manager' required></textarea>
                        <h3 className='contactDetails-phone'>Phone Number</h3>
                        <textarea className='contactDetails-phone-input' name='contactPhone' placeholder='+1 (647) 504 -0911' required></textarea>
                        <h3 className='contactDetails-email'>Email</h3>
                        <textarea className='contactDetails-email-input' name='contactEmail' placeholder='glyon@instock.com' required></textarea>
                    </div>
                </section>

                <SaveCancelAddButton showSave={true} />

            </form>
       


    )
}



export default EditWarehouse
