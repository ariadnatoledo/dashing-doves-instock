import ListItems from "../../components/ListItems/ListItems"
import './WarehousePage.scss'
import PagesHeader from "../../components/PagesHeader/PagesHeader.jsx";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";

function WarehousePage() {
  return (
    <div className="warehouse-page">
      <PagesHeader />
      <ListItems items="warehouses" />
  

      <WarehouseDetails />
    </div>
  );
}

export default WarehousePage;
