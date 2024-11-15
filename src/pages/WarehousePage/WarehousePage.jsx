import "./WarehousePage.scss";
import PagesHeader from "../../components/PagesHeader/PagesHeader.jsx";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import AddNewWarehouse from "../../components/AddNewWarehouse/AddNewWarehouse.jsx";
import EditWarehouse from "../../components/EditWarehouse/EditWarehouse.jsx";
import ListItems from "../../components/ListItems/ListItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function WarehousePage() {
  return (
    <div className="warehouse-page">
      <PagesHeader name="Warehouse" />
      <WarehouseDetails/>
    </div>
  );
}

export default WarehousePage;
