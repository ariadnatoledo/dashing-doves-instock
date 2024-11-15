import "./ListItems.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import PagesHeader from "../PagesHeader/PagesHeader";
import InventoryItem from "../InventoryItem/InventoryItem";
import DeleteComponent from "../DeleteComponent/DeleteComponent";
import CancelDeleteButton from "../CancelDeleteButton/CancelDeleteButton";

function ListItems({ items, display, isForWarehouseDetails, warehouse }) {
  const [list, setList] = useState([]);

  const [deleteItem, setDeleteItem] = useState(null);

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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${items}`
      );
      setList(response.data);
    };
    getItems();
  }, [items]);

  const handleDelete = (item) => {
    setDeleteItem(item);
  };

  const handleCloseDelete = () => {
    setDeleteItem(null);
  };

  return (
    <>
      {items === "warehouses" && (
        <>
          <PagesHeader title="warehouses" />
          {list.map((listItem, index) => (
            <div key={listItem.id}>
              <WarehouseItem warehouse={listItem} isFirst={index === 0} />
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
                    isForWarehouseDetails={isForWarehouseDetails} onDelete={() => handleDelete(listItem)
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
                    isForWarehouseDetails={isForWarehouseDetails} onDelete={() => handleDelete(listItem)
                  />
                </div>
              ))}
        </>
      )}
      {deleteItem && (
        <DeleteComponent
          inventory={deleteItem}
          onClose={handleCloseDelete}
          DeleteItemsComponent={CancelDeleteButton}
        />
      )}
    </>
  );
}

export default ListItems;
