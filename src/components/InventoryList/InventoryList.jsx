import React from 'react'
import './InventoryList.jsx'
import ListItems from "../ListItems/ListItems";

function InventoryList() {
  return (
    <div className="inventory-list">
        <ListItems items="inventory" />
    </div>
  )
}

export default InventoryList