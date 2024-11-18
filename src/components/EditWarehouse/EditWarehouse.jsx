import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../EditWarehouse/EditWarehouse.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import backIconImage from "../../assets/Icons/arrowback.svg";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";
import iconErrorState from "../../assets/Icons/error-24px.svg"; // Add error icon

function EditWarehouse() {
    const { warehouseId } = useParams();
    const navigate = useNavigate();
    const [warehouse, setWarehouse] = useState(null);
    const [errors, setErrors] = useState({
        warehouseName: "",
        warehouseAddress: "",
        warehouseCity: "",
        warehouseCountry: "",
        contactName: "",
        contactPosition: "",
        contactPhone: "",
        contactEmail: ""
    });

    const [formData, setFormData] = useState({
        warehouseName: "",
        warehouseAddress: "",
        warehouseCity: "",
        warehouseCountry: "",
        contactName: "",
        contactPosition: "",
        contactPhone: "",
        contactEmail: ""
    });

    // Validation function
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

        if (name === "contactPhone") {
            formattedValue = formatPhoneNumber(value);
        }

        setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));

        // Validate the field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, formattedValue),
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedWarehouse = {
            id: warehouse.id,
            warehouse_name: formData.warehouseName,
            address: formData.warehouseAddress,
            city: formData.warehouseCity,
            country: formData.warehouseCountry,
            contact_name: formData.contactName,
            contact_position: formData.contactPosition,
            contact_phone: formData.contactPhone,
            contact_email: formData.contactEmail,
        };

        // Form validation
        const formErrors = {};
        if (!updatedWarehouse.warehouse_name) formErrors.warehouseName = "Warehouse Name is required.";
        if (!updatedWarehouse.address) formErrors.warehouseAddress = "Street Address is required.";
        if (!updatedWarehouse.city) formErrors.warehouseCity = "City is required.";
        if (!updatedWarehouse.country) formErrors.warehouseCountry = "Country is required.";
        if (!updatedWarehouse.contact_name) formErrors.contactName = "Contact Name is required.";
        if (!updatedWarehouse.contact_position) formErrors.contactPosition = "Contact Position is required.";
        if (!updatedWarehouse.contact_phone) formErrors.contactPhone = "Phone Number is required.";
        if (!updatedWarehouse.contact_email) formErrors.contactEmail = "Email is required.";

        // Validate phone number and email using the validateField function
        const phoneError = validateField("contactPhone", updatedWarehouse.contact_phone);
        if (phoneError) formErrors.contactPhone = phoneError;

        const emailError = validateField("contactEmail", updatedWarehouse.contact_email);
        if (emailError) formErrors.contactEmail = emailError;

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        saveWarehouse(updatedWarehouse);
    };

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/warehouses/${warehouseId}`
                );
                setWarehouse(response.data);
                setFormData({
                    warehouseName: response.data.warehouse_name,
                    warehouseAddress: response.data.address,
                    warehouseCity: response.data.city,
                    warehouseCountry: response.data.country,
                    contactName: response.data.contact_name,
                    contactPosition: response.data.contact_position,
                    contactPhone: response.data.contact_phone,
                    contactEmail: response.data.contact_email,
                });
            } catch (error) {
                console.error("Failed to fetch warehouse data", error);
            }
        };
        fetchWarehouse();
    }, [warehouseId]);

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
            alert("Failed to save warehouse.");
        }
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
                        className={`warehouseDetails-name-input ${errors.warehouseName ? "error-input" : ""}`}
                        name="warehouseName"
                        placeholder="Warehouse Name"
                        value={formData.warehouseName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() =>
                            setErrors((prevErrors) => ({ ...prevErrors, warehouseName: "" }))
                          }
                    ></textarea>
                    {errors.warehouseName && (
                        <p className="error-message">
                            <img src={iconErrorState} alt="Error" className="error-icon" />
                            {errors.warehouseName}
                        </p>
                    )}

                    <h3 className="warehouseDetails-address">Street Address</h3>
                    <textarea
                        className={`warehouseDetails-address-input ${errors.warehouseAddress ? "error-input" : ""}`}
                        name="warehouseAddress"
                        placeholder="Street Address"
                        value={formData.warehouseAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() =>
                            setErrors((prevErrors) => ({ ...prevErrors, warehouseAddress: "" }))
                          }
                    ></textarea>
                    {errors.warehouseAddress && (
                        <p className="error-message">
                            <img src={iconErrorState} alt="Error" className="error-icon" />
                            {errors.warehouseAddress}
                        </p>
                    )}

                    <h3 className="warehouseDetails-city">City</h3>
                    <textarea
                        className={`warehouseDetails-city-input ${errors.warehouseCity ? "error-input" : ""}`}
                        name="warehouseCity"
                        placeholder="City"
                        value={formData.warehouseCity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() =>
                            setErrors((prevErrors) => ({ ...prevErrors, warehouseCity: "" }))
                          }
                    ></textarea>
                    {errors.warehouseCity && (
                        <p className="error-message">
                            <img src={iconErrorState} alt="Error" className="error-icon" />
                            {errors.warehouseCity}
                        </p>
                    )}

                    <h3 className="warehouseDetails-country">Country</h3>
                    <textarea
                        className={`warehouseDetails-country-input ${errors.warehouseCountry ? "error-input" : ""}`}
                        name="warehouseCountry"
                        placeholder="Country"
                        value={formData.warehouseCountry}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() =>
                            setErrors((prevErrors) => ({ ...prevErrors, warehouseCountry: "" }))
                          }
                    ></textarea>
                    {errors.warehouseCountry && (
                        <p className="error-message">
                            <img src={iconErrorState} alt="Error" className="error-icon" />
                            {errors.warehouseCountry}
                        </p>
                    )}
                </div>
                <div className="border"></div>
                <div className="contactDetails">
                    <h2 className="contactDetails-title"> Contact Details</h2>
                    <h3 className="contactDetails-name">Contact Name</h3>
                    <textarea
                        className={`contactDetails-name-input ${errors.contactName ? "error-input" : ""}`}
                        name="contactName"
                        placeholder="Contact Name"
                        value={formData.contactName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() =>
                            setErrors((prevErrors) => ({ ...prevErrors, contactName: "" }))
                          }
                    ></textarea>
                    {errors.contactName && (
                        <p className="error-message">
                            <img src={iconErrorState} alt="Error" className="error-icon" />
                            {errors.contactName}
                        </p>
                    )}

                    <h3 className="contactDetails-position">Position</h3>
                    <textarea
                        className={`contactDetails-position-input ${errors.contactPosition ? "error-input" : ""}`}
                        name="contactPosition"
                        placeholder="Position"
                        value={formData.contactPosition}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() =>
                            setErrors((prevErrors) => ({ ...prevErrors, contactPosition: "" }))
                          }
                    ></textarea>
                    {errors.contactPosition && (
                        <p className="error-message">
                            <img src={iconErrorState} alt="Error" className="error-icon" />
                            {errors.contactPosition}
                        </p>
                    )}

                    <h3 className="contactDetails-phone">Phone Number</h3>
                    <textarea
                        className={`contactDetails-phone-input ${errors.contactPhone ? "error-input" : ""}`}
                        name="contactPhone"
                        placeholder="Phone Number"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() =>
                            setErrors((prevErrors) => ({ ...prevErrors, contactPhone: "" }))
                          }
                    ></textarea>
                    {errors.contactPhone && (
                        <p className="error-message">
                            <img src={iconErrorState} alt="Error" className="error-icon" />
                            {errors.contactPhone}
                        </p>
                    )}

                    <h3 className="contactDetails-email">Email</h3>
                    <textarea
                        className={`contactDetails-email-input ${errors.contactEmail ? "error-input" : ""}`}
                        name="contactEmail"
                        placeholder="Email"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() =>
                            setErrors((prevErrors) => ({ ...prevErrors, contactEmail: "" }))
                          }
                    ></textarea>
                    {errors.contactEmail && (
                        <p className="error-message">
                            <img src={iconErrorState} alt="Error" className="error-icon" />
                            {errors.contactEmail}
                        </p>
                    )}
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
