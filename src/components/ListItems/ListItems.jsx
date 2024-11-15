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
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/${items}`);
      setList(response.data);
    };
    getItems();
  }, [items]);

  return (
    <>
      {items === "warehouses" && (
        <>
          <PagesHeader title="warehouses" />
          {list.map((listItem, index) => (
            <div key={listItem.id}>
              <WarehouseItem warehouse={listItem} isFirst={index === 0}/>
            </div>
          ))}
        </>
      )}

      {items === "inventories" && (
        <>
          <PagesHeader title="inventory" button="Item"/>
          {list.map((listItem, index) => (
            <div key={listItem.id}>
              <InventoryItem inventory={listItem} isFirst={index === 0} />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default ListItems;
