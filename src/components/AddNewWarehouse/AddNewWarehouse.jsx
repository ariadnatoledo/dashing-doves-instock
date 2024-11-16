import React, { useState } from "react";
import "../AddNewWarehouse/AddNewWarehouse.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";
import errorIconState from "../../assets/Icons/error-24px.svg";
import axios from "axios";


export default function AddNewWarehouse({ navigateTo }) {
  const [formData, setFormData] = useState({
    warehouseName: "",
    warehouseAddress: "",
    warehouseCity: "",
    warehouseCountry: "",
    contactName: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "warehouseName":
      case "warehouseAddress":
      case "warehouseCity":
      case "warehouseCountry":
      case "contactName":
      case "contactPosition":
        return value.trim() === "" ? "This field is required." : null;
      case "contactPhone":
        return !/^\+\d+ \(\d{3}\) \d{3}-\d{4}$/.test(value)
          ? "Enter a valid phone number"
          : null;
      case "contactEmail":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Enter a valid email address."
          : null;
      default:
        return null;
    }
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    let formattedNumber = '+';

    for (let i = 0; i < digits.length; i++) {
      if (i === 1) formattedNumber += ' (';
      if (i === 4) formattedNumber += ') ';
      if (i === 7) formattedNumber += '-';
      if (i < 11) formattedNumber += digits[i];
    }

    return formattedNumber;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'contactPhone') {
      formattedValue = formatPhoneNumber(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
    setErrors({ ...errors, [name]: validateField(name, formattedValue) });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
        newErrors[field] = validateField(field, formData[field]);
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    if (!Object.values(newErrors).some((error) => error)) {
        try {
            console.log("Submitting formData:", formData);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/warehouses`, // API is not retrieving from this endpoint
                formData
            );

            if (response.status === 201) {
                console.log("Warehouse added successfully:", response.data);
                navigateTo("/warehouses"); 
            }
        } catch (error) {
            console.error("Error adding warehouse:", error);
        }
    }
};

  const renderField = (field, section) => (
    <div key={field} className={`${section}-group`}>
      <h3 className={`${section}-${field}`}>{field.split(/(?=[A-Z])/).join(" ")}</h3>
      <textarea
        className={`${section}-${field}-input ${touched[field] && errors[field] ? 'error-input' : ''}`}
        name={field}
        placeholder={field === 'contactPhone' ? 'Phone Number' : field.split(/(?=[A-Z])/).join(" ")}
        value={formData[field]}
        onChange={handleChange}
        onBlur={handleBlur}
      ></textarea>
      {touched[field] && errors[field] && (
        <div className="error-container">
          <img src={errorIconState} alt="Error" className="error-icon" />
          <span className="error-message">{errors[field]}</span>
        </div>
      )}
    </div>
  );

  return (
    <form className="addNewWarehouse-form" onSubmit={handleSubmit}>
      <ComponentHeader navigateTo="/" text="Add New Warehouse" />
      <section className="addNewWarehouse">
        <div className="warehouseDetails">
          <h2 className="warehouseDetails-title">Warehouse Details</h2>
          {["warehouseName", "warehouseAddress", "warehouseCity", "warehouseCountry"].map((field) =>
            renderField(field, "warehouseDetails")
          )}
        </div>

        <div className="border"></div>

        <div className="contactDetails">
          <h2 className="contactDetails-title">Contact Details</h2>
          {["contactName", "contactPosition", "contactPhone", "contactEmail"].map((field) =>
            renderField(field, "contactDetails")
          )}
        </div>
      </section>

      <SaveCancelAddButton showAddWarehouse={true} navigateTo={`/warehouses`} />
    </form>
  );
}
