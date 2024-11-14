import "./ListItems.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseItem from "../WarehouseItem/WarehouseItem";

function ListItems({ items }) {
  const [list, setList] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getItems = async () => {
      const response = await axios.get(`${baseUrl}/${items}`);
      setList(response.data);
    };
    getItems();
  }, [items]);

  return (
    <>
      {items === "warehouses" &&
        list.map((listItem) => (
          <div key={listItem.id}>
            <WarehouseItem warehouse={listItem} />
          </div>
        ))}

      {items === "inventory" &&
        list.map((listItem) => (
          <div key={listItem.id}>
            <InventoryItem inventory={listItem} />
          </div>
        ))}
    </>
  );
}

export default ListItems;
