import "./AddNewItem.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";

function AddNewItem() {
  return (
    <form className='addNewItem-form'>
                <ComponentHeader navigateTo="/inventory" text="Add New Item"   />
                <section className='addNewItem'>
                    <div className='itemDetails'>


                        <h2 className='itemDetails-title'>Item Details</h2>

                        <label className='itemDetails-label'>Item Name</label>
                        <textarea className='itemDetails-input' name='itemName' placeholder='Item Name' required></textarea>

                        <label className='itemDetails-label'> Description </label>
                        <textarea className='itemDetails-input itemDetails-input--description' name='itemDescription' placeholder='Please enter a brief item description...' required></textarea>

                        <label className='itemDetails-label'>Category</label>
                        {/* <textarea className='itemDetails-city-input' name='warehouseCity' placeholder='Please Select' required></textarea> */}

                    </div>
                    <div className='border'></div>
                    <div className='itemAvailability'>
                        <h2 className='itemAvailability-title'> Item Availability </h2>
                        
                        <label className='itemAvailability-label'>Quantity</label>
                        <textarea className='itemAvailability-input' name='itemQuantity' placeholder='0' required></textarea>

                        <label className='itemAvailability-label'>Warehouse</label>
                        {/* <textarea className='itemAvailability-phone-input' name='contactPhone' placeholder='Please Select' required></textarea> */}
                        
                    </div>
                </section>


                <SaveCancelAddButton showAddWarehouse={false} showAddItem={true} navigateTo={`/inventory`} />
            </form>
  )
}

export default AddNewItem