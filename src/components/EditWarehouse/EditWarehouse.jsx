import React from 'react'
import "../EditWarehouse/EditWarehouse.scss"
import SaveButton from '../SaveButton/SaveButton'
import CancelButton from '../CancelButton/CancelButton'
import ComponentHeader from '../ComponentHeader/ComponentHeader'
import backIconImage from "../../assets/Icons/arrowback.svg";  
import editIconWhite from "../../assets/Icons/edit-white-24px.svg"

function EditWarehouse() {
    return (
       
            <form className='editWarehouse-form'>
                <ComponentHeader  backIcon={backIconImage} text="Edit Warehouse" editIcon={editIconWhite}  editIconTablet={editIconWhite}/>
                 <section className='editWarehouse'>
                <div className='warehouseDetails'>
                
                    <h2 className='warehouseDetails-title'>Warehouse Details</h2>
                    <h3 className='warehouseDetails-name'>Warehouse Name</h3>
                    <textarea className='warehouseDetails-name-input' name='warehouseName' placeholder='Washington'></textarea>
                    <h3 className='warehouseDetails-address'>Street Address</h3>
                    <textarea className='warehouseDetails-address-input' name='warehouseAddress' placeholder='33 Pearl Street SW'></textarea>
                    <h3 className='warehouseDetails-city'>City</h3>
                    <textarea className='warehouseDetails-city-input' name='warehouseCity' placeholder='Washington'></textarea>
                    <h3 className='warehouseDetails-country'>Country</h3>
                    <textarea className='warehouseDetails-country-input' name='warehouseCountry' placeholder='USA'></textarea>


                </div>
                <div className='contactDetails'>
                    <h2 className='contactDetails-title'> Contact Details</h2>
                    <h3 className='contactDetails-name'>Contact Name</h3>
                    <textarea className='contactDetails-name-input' name='contactName' placeholder='Graeme Lyon'></textarea>
                    <h3 className='contactDetails-position'>Street Address</h3>
                    <textarea className='contactDetails-position-input' name='contactPosition' placeholder='Warehouse Manager'></textarea>
                    <h3 className='contactDetails-phone'>City</h3>
                    <textarea className='contactDetails-phone-input' name='contactPhone' placeholder='+1 (647) 504 -0911'></textarea>
                    <h3 className='contactDetails-email'>Country</h3>
                    <textarea className='contactDetails-email-input' name='contactEmail' placeholder='glyon@instock.com'></textarea>
                </div>
                </section>
                <section className='editWarehouse-button'>
                  <CancelButton/>
                  <SaveButton/>
                </section>
            </form>
           
        
    )
}



export default EditWarehouse
