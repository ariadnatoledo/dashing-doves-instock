import "./ListItems.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import PagesHeader from "../PagesHeader/PagesHeader";
import InventoryItem from "../InventoryItem/InventoryItem";
import DeleteComponent from "../DeleteComponent/DeleteComponent";
import CancelDeleteButton from "../CancelDeleteButton/CancelDeleteButton";

function ListItems({ items }) {
  const [list, setList] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/${items}`);
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
          {list.map((listItem) => (
            <div key={listItem.id}>
              <WarehouseItem warehouse={listItem} />
            </div>
          ))}
        </>
      )}

      {items === "inventories" && (
        <>
          <PagesHeader title="inventory" button="Item" />
          {list.map((listItem) => (
            <div key={listItem.id}>
              <InventoryItem inventory={listItem} onDelete={() => handleDelete(listItem)} />
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
