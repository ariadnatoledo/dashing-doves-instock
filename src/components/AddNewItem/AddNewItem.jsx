import "./AddNewItem.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AddNewItem() {
    const baseURL = import.meta.env.VITE_API_URL;

    const [itemCategory, setitemCategory] = useState("");
  



  return (
    <form className="addNewItem-form">
      <ComponentHeader navigateTo="/inventory" text="Add New Item" />
      <section className="addNewItem">
        <div className="itemDetails">
          <h2 className="itemDetails-title">Item Details</h2>

          <label className="itemDetails-label">Item Name</label>
          <textarea
            className="itemDetails-input"
            name="itemName"
            placeholder="Item Name"
            required
          ></textarea>

          <label className="itemDetails-label"> Description </label>
          <textarea
            className="itemDetails-input itemDetails-input--description"
            name="itemDescription"
            placeholder="Please enter a brief item description..."
            required
          ></textarea>

          <label className="itemDetails-label">Category</label>
            <select className="itemDetails-input" name="itemCategory" id=""></select>

        </div>
        <div className="border"></div>
        <div className="itemAvailability">
          <h2 className="itemAvailability-title"> Item Availability </h2>

          <label className="itemAvailability-label">Status</label>

          <div className="itemAvailability__status">
            <label htmlFor="stock" className="itemAvailability__radio-label">
              <input
                type="radio"
                className="itemAvailability__radio"
                name="stock"
              />
              In stock
            </label>

            <label htmlFor="stock" className="itemAvailability__radio-label">
              <input
                type="radio"
                className="itemAvailability__radio"
                name="stock"
              />
              Out of stock
            </label>
          </div>

          <label className="itemAvailability-label">Quantity</label>
          <textarea
            className="itemAvailability-input"
            name="itemQuantity"
            placeholder="0"
            required
          ></textarea>

          <label className="itemAvailability-label">Warehouse</label>
          <select className="itemAvailability-input" name="itemWarehouse" ></select>
        </div>
      </section>

      <SaveCancelAddButton
        showAddWarehouse={false}
        showAddItem={true}
        navigateTo={`/inventory`}
      />
    </form>
  );
}

export default AddNewItem;
