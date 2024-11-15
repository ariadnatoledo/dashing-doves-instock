import "./ListItems.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import PagesHeader from "../PagesHeader/PagesHeader";
import InventoryItem from "../InventoryItem/InventoryItem";
import TableHeader from "../TableHeader/TableHeader";

function ListItems({ items, display, isForWarehouseDetails, warehouse }) {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (warehouse) {
      const filterByWarehouse = list.filter(
        (item) => item.warehouse_name === warehouse.warehouse_name
      );
      setFilteredList(filterByWarehouse);
    }
  }, [warehouse]);

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
          <TableHeader page="warehouses" />
          {list.map((listItem, index) => (
            <div key={listItem.id}>
              <WarehouseItem
                warehouse={listItem}
                onDelete={() => deleteItem("warehouses", listItem.id)}
                isFirst={index === 0}
              />
            </div>
          ))}
        </>
      )}

      {items === "inventories" && (
        <>
          <PagesHeader title="inventory" button="Item" display={display} />
          {!warehouse
            ? list &&
              list.length > 0 &&
              list.map((listItem, index) => (
                <div key={listItem.id}>
                  <InventoryItem
                    inventory={listItem}
                    isFirst={index === 0}
                    isForWarehouseDetails={isForWarehouseDetails}
                  />
                </div>
              ))
            : filteredList &&
              filteredList.length > 0 &&
              filteredList.map((listItem, index) => (
                <div key={listItem.id}>
                  <InventoryItem
                    inventory={listItem}
                    isFirst={index === 0}
                    isForWarehouseDetails={isForWarehouseDetails}
                  />
                </div>
              ))}
        </>
      )}
    </>
  );
}

export default ListItems;
