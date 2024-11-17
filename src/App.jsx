import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AddNewWarehouse from "./components/AddNewWarehouse/AddNewWarehouse";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import ListItems from "./components/ListItems/ListItems";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import AddNewInventoryItem from "./components/AddNewInventoryItem/AddNewInventoryItem";
import EditInventory from "./components/EditInventory/EditInventory";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main__card">
        <Routes>
          <Route path="/" element={<ListItems items="warehouses" />} />
          <Route path="/warehouses" element={<Navigate to="/" />} />
          <Route path="/warehouses/add-new" element={<AddNewWarehouse />} />
          <Route path="/warehouses/:warehouseId" element={<WarehouseDetails />} />
          <Route path="/warehouses/:warehouseId/edit" element={<EditWarehouse />} />
          <Route path="/inventory" element={<ListItems items="inventories" />} />
          <Route path="/inventory/add-new" element={<AddNewInventoryItem />} />
          <Route path="/inventory/:inventoryId" element={<InventoryDetails />} />
          <Route path="/inventory/:inventoryId/edit" element={<EditInventory />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
