import "./ListItems.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import PagesHeader from "../PagesHeader/PagesHeader";
import InventoryItem from "../InventoryItem/InventoryItem";

function ListItems({ items }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${items}`
        );
        setList(response.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    getItems();
  }, [items]);

  const deleteItem = async (itemType, id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/${itemType}/${id}`
      );
      if (response.status === 204) {
        setList((prevList) => prevList.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(`Error deleting ${itemType}`, error);
    }
  };

  return (
    <>
      {items === "warehouses" && (
        <>
          <PagesHeader title="warehouses" />
          {list.map((listItem) => (
            <div key={listItem.id}>
              <WarehouseItem
                warehouse={listItem}
                onDelete={() => deleteItem("warehouses", listItem.id)}
              />
            </div>
          ))}
        </>
      )}

      {items === "inventories" && (
        <>
          <PagesHeader title="inventory" button="Item" />
          {list.map((listItem) => (
            <div key={listItem.id}>
              <InventoryItem inventory={listItem} />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default ListItems;
