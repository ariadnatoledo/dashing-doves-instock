import "../AddNewWarehouse/AddNewWarehouse.scss"
import ComponentHeader from '../ComponentHeader/ComponentHeader'
import SaveCancelAddButton from '../SaveCancelAddButton/SaveCancelAddButton';
import { useNavigate } from "react-router-dom";


import React from 'react'


export default function AddNewWarehouse() {
    return (
        <section className='addNewWarehouseDetails'>
            <form className='addNewWarehouse-form'>
                <ComponentHeader navigateTo="/" text="Add New Warehouse"   />
                <section className='addNewWarehouse'>
                    <div className='warehouseDetails'>


                        <h2 className='warehouseDetails-title'>Warehouse Details</h2>
                        <h3 className='warehouseDetails-name'>Warehouse Name</h3>
                        <textarea className='warehouseDetails-name-input' name='warehouseName' placeholder='Warehouse Name' required></textarea>
                        <h3 className='warehouseDetails-address'>Street Address</h3>
                        <textarea className='warehouseDetails-address-input' name='warehouseAddress' placeholder='Street Address' required></textarea>
                        <h3 className='warehouseDetails-city'>City</h3>
                        <textarea className='warehouseDetails-city-input' name='warehouseCity' placeholder='City' required></textarea>
                        <h3 className='warehouseDetails-country'>Country</h3>
                        <textarea className='warehouseDetails-country-input' name='warehouseCountry' placeholder='Country' required></textarea>

                    </div>
                    <div className='border'></div>
                    <div className='contactDetails'>
                        <h2 className='contactDetails-title'> Contact Details</h2>
                        <h3 className='contactDetails-name'>Contact Name</h3>
                        <textarea className='contactDetails-name-input' name='contactName' placeholder='Contact Name' required></textarea>
                        <h3 className='contactDetails-position'>Position</h3>
                        <textarea className='contactDetails-position-input' name='contactPosition' placeholder='Position' required></textarea>
                        <h3 className='contactDetails-phone'>Phone Number</h3>
                        <textarea className='contactDetails-phone-input' name='contactPhone' placeholder='Phone Number' required></textarea>
                        <h3 className='contactDetails-email'>Email</h3>
                        <textarea className='contactDetails-email-input' name='contactEmail' placeholder='Email' required></textarea>
                    </div>
                </section>


                <SaveCancelAddButton showAddWarehouse={true} />
            </form>


        </section>


    )
}
