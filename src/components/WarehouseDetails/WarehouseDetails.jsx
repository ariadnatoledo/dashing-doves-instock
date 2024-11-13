import React from 'react';
import "./WarehouseDetails.scss";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function WarehouseDetails() {
    const baseURL = import.meta.env.VITE_API_URL;

    const [warehouse, setWarehouse] = useState({});

    const { warehouseId } = useParams();

    async function getWarehouseById(id) {
        try {
            const response = await axios.get(`${baseURL}/warehouses/${id}`);
            // console.log(response);
            setWarehouse(response.data);
            
        } catch(error) {
            console.error("Error fetching warehouse data by ID", error);
        }
    }

    console.log("This is my warehouse:", warehouse);

    useEffect(() => {
        getWarehouseById(warehouseId);
    }, []);


  return (
    <section className='warehouse'>
        <article className="card">
        <h4 className="card__title">Warehouse Address:</h4>
        <p className="card__text--mobile body-small">{ warehouse.address }, { warehouse.city }, { warehouse.country }</p>
        <p className="card__text--tablet body-small">{ warehouse.address }</p>
        <p className="card__text--tablet body-small">{ warehouse.city }, { warehouse.country }</p>
        </article>

        <div className="card__contact-div">
        <article className="card">
        <h4 className="card__title">Contact Name:</h4>
        <p className="card__text body-small">{ warehouse.contact_name }</p>
        <p className="card__text body-small">{ warehouse.contact_position }</p>
        </article>

        <article className="card">
        <h4 className="card__title">Contact Information:</h4>
        <p className="card__text body-small">{ warehouse.contact_phone }</p>
        <p className="card__text body-small">{ warehouse.contact_email }</p>
        </article>
        </div>

    </section>
  )
}

export default WarehouseDetails