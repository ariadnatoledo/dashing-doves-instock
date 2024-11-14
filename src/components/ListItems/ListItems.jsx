import "./ListItems.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import PagesHeader from "../PagesHeader/PagesHeader";
import InventoryItem from "../InventoryItem/InventoryItem";
import TableHeader from "../TableHeader/TableHeader";

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
          <TableHeader page="warehouses" />
          {list.map((listItem) => (
            <div key={listItem.id}>
              <WarehouseItem warehouse={listItem} />
            </div>
          ))}
        </>
      )}

      {items === "inventory" && (
        <>
          <PagesHeader title="inventory" />
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
