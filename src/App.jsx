import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import WarehousePage from "./pages/WarehousePage/WarehousePage.jsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import WarehouseList from "./components/WarehouseList/WarehouseList.jsx";
import AddNewWarehouse from "./components/AddNewWarehouse/AddNewWarehouse.jsx";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<WarehouseList />} />{" "}
        <Route path="/edit-warehouse" element={<EditWarehouse />} />
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/add-new-warehouse" element={<AddNewWarehouse />} />
        <Route path="/warehouse/:warehouseId" element={<WarehousePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;
