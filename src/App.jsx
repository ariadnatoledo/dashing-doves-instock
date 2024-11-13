import "./App.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header/Header.jsx"
import Footer from "../src/components/Footer/Footer.jsx"
import InventoryPage from "../src/pages/InventoryPage/InventoryPage.jsx"
import WarehousePage from "../src/pages/WarehousePage/WarehousePage.jsx"
import NotFoundPage from "../src/pages/NotFoundPage/NotFoundPage.jsx"
// import axios from 'axios';


function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<WarehousePage/>}/>   {/*  can change the home name*/}
      <Route path="/inventory"  element={<InventoryPage/>}/>
      <Route path="/warehouse"  element={<WarehousePage/>}/>
      <Route path="/warehouse/:warehouseId"  element={<WarehousePage/>}/>
      <Route path='*' element={<NotFoundPage/>} />


    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App