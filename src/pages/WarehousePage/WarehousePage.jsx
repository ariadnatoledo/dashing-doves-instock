import React from 'react'
import PagesHeader from '../../components/PagesHeader/PagesHeader.jsx'
import WarehouseDetails from '../../components/WarehouseDetails/WarehouseDetails'

function WarehousePage() {
  return (
    <div className="warehouse-page">
        <PagesHeader />
    
      <WarehouseDetails />
    </div>
  )
}

export default WarehousePage;
