
import './InventoryPage.scss'
import PagesHeader from "../../components/PagesHeader/PagesHeader.jsx";
import InventoryList from '../../components/InventoryList/InventoryList.jsx'

function InventoryPage() {
  return (
    <div className="inventory-page">
        <PagesHeader name="Inventory"/>
        <InventoryList />
    </div>
  )
}

export default InventoryPage
