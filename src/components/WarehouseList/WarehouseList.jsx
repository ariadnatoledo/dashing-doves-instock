import ListItems from "../ListItems/ListItems";
import PagesHeader from "../../components/PagesHeader/PagesHeader.jsx";
import "./WarehouseList.scss";


export default function WarehouseList() {
  return (
    <div className="warehouse-page">
    <PagesHeader />

    <ListItems items="warehouses" />
  </div>
  )
}
