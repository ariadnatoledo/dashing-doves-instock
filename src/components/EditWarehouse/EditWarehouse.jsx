import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../EditWarehouse/EditWarehouse.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import backIconImage from "../../assets/Icons/arrowback.svg";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";

function EditWarehouse() {
    const { id } = useParams();
    const [warehouse, setWarehouse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/warehouses/${id}`
                );
                setWarehouse(response.data);
            } catch (error) {
                console.error("Failed to fetch warehouse data", error);
            }
        };
        fetchWarehouse();
    }, [id]);

    const [formData, setFormData] = useState({
        warehouse_name: "",
        address: "",
        city: "",
        country: "",
        contact_name: "",
        contact_position: "",
        contact_phone: "",
        contact_email: "",
      });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
  
    const validateField = (name, value) => {
      switch (name) {
        case "warehouse_name":
        case "address":
        case "city":
        case "country":
        case "contact_name":
        case "contact_position":
          return value.trim() === "" ? "This field is required." : null;
        case "contact_phone":
          return !/^\+\d+ \(\d{3}\) \d{3}-\d{4}$/.test(value)
            ? "Enter a valid phone number"
            : null;
        case "contact_email":
          return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? "Enter a valid email address."
            : null;
        default:
          return null;
      }
    };

    const formatPhoneNumber = (value) => {
        const digits = value.replace(/\D/g, "");
        let formattedNumber = "+";
    
        for (let i = 0; i < digits.length; i++) {
          if (i === 1) formattedNumber += " (";
          if (i === 4) formattedNumber += ") ";
          if (i === 7) formattedNumber += "-";
          if (i < 11) formattedNumber += digits[i];
        }
    
        return formattedNumber;
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
    
        if (name === "contact_phone") {
          formattedValue = formatPhoneNumber(value);
        }
    
        setFormData({ ...formData, [name]: formattedValue });
        setErrors({ ...errors, [name]: validateField(name, formattedValue) });
      };

      const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
      };

    const saveWarehouse = async (updatedWarehouse) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/warehouses/${updatedWarehouse.id}`,
                updatedWarehouse
            );
            if (response.status === 200) {
                alert("Warehouse updated successfully!");
                navigate("/warehouses");
            }
        } catch (error) {
            console.error("Failed to save warehouse changes", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        const updatedWarehouse = {
            id: warehouse.id,
            warehouse_name: e.target.warehouseName.value,
            address: e.target.warehouseAddress.value,
            city: e.target.warehouseCity.value,
            country: e.target.warehouseCountry.value,
            contact_name: e.target.contactName.value,
            contact_position: e.target.contactPosition.value,
            contact_phone: e.target.contactPhone.value,
            contact_email: e.target.contactEmail.value,
        };

        saveWarehouse(updatedWarehouse);
    };

    return (
        <form className="editWarehouse-form" onSubmit={handleSubmit}>
            <ComponentHeader
                backIcon={backIconImage}
                navigateTo="/warehouses"
                text="Edit Warehouse"
            />
            <section className="editWarehouse">
                <div className="warehouseDetails">
                    <h2 className="warehouseDetails-title">Warehouse Details</h2>
                    <h3 className="warehouseDetails-name">Warehouse Name</h3>
                    <textarea
                        className="warehouseDetails-name-input"
                        name="warehouseName" 
                        placeholder="Warehouse Name"
                        defaultValue={warehouse?.warehouse_name}
                        required
                    ></textarea>
                    <h3 className="warehouseDetails-address">Street Address</h3>
                    <textarea
                        className="warehouseDetails-address-input"
                        name="warehouseAddress"
                        placeholder="Street Address"
                        defaultValue={warehouse?.address}
                        required
                    ></textarea>
                    <h3 className="warehouseDetails-city">City</h3>
                    <textarea
                        className="warehouseDetails-city-input"
                        name="warehouseCity"
                        placeholder="City"
                        defaultValue={warehouse?.city}
                        required
                    ></textarea>
                    <h3 className="warehouseDetails-country">Country</h3>
                    <textarea
                        className="warehouseDetails-country-input"
                        name="warehouseCountry"
                        placeholder="Country"
                        defaultValue={warehouse?.country}
                        required
                    ></textarea>
                </div>
                <div className="border"></div>
                <div className="contactDetails">
                    <h2 className="contactDetails-title"> Contact Details</h2>
                    <h3 className="contactDetails-name">Contact Name</h3>
                    <textarea
                        className="contactDetails-name-input"
                        name="contactName"
                        placeholder="Contact Name"
                        defaultValue={warehouse?.contact_name}
                        required
                    ></textarea>
                    <h3 className="contactDetails-position">Position</h3>
                    <textarea
                        className="contactDetails-position-input"
                        name="contactPosition"
                        placeholder="Position"
                        defaultValue={warehouse?.contact_position}
                        required
                    ></textarea>
                    <h3 className="contactDetails-phone">Phone Number</h3>
                    <textarea
                        className="contactDetails-phone-input"
                        name="contactPhone"
                        placeholder="Phone Number"
                        defaultValue={warehouse?.contact_phone}
                        required
                    ></textarea>
                    <h3 className="contactDetails-email">Email</h3>
                    <textarea
                        className="contactDetails-email-input"
                        name="contactEmail"
                        placeholder="Email"
                        defaultValue={warehouse?.contact_email}
                        required
                    ></textarea>
                </div>
            </section>

            <SaveCancelAddButton
                showSave={true}
                navigateTo="/warehouses" 
            />
        </form>
    );
}

export default EditWarehouse;
