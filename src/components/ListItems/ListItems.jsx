import "./ListItems.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function ListItems({ items }) {
  const [list, setList] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getItems = async () => {
      console.log(baseUrl);
      const response = await axios.get(`${baseUrl}/${items}`);
      setList(response.data);
    };
    getItems();
  }, [items]);

  return (
    <>
      {items === "warehouses" &&
        list.map((listItem) => (
          <li key={listItem.id}>
            <WarehouseItem warehouse={listItem} />
          </li>
        ))}

      {items === "inventory" &&
        list.map((listItem) => (
          <li key={listItem.id}>
            <InventoryItem inventory={listItem} />
          </li>
        ))}
    </>
  );
}

export default ListItems;
