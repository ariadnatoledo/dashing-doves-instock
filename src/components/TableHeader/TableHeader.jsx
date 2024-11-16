import "./TableHeader.scss";
import sortIcon from "../../assets/Icons/sort-24px.svg";

function TableHeader({ page, isForWarehouseDetails }) {

  const warehouseTableHeader = ["warehouse", "address", "contact name", "contact information", "actions"];
  const inventoryTableHeader = ["inventory item", "category", "status", "qty", "warehouse", "actions"];
  const warehouseDetailsTableHeader = ["inventory item", "category", "status", "qty","actions"];

  const tableHeader = page === "warehouses" ? warehouseTableHeader : inventoryTableHeader;
  

  return (
    <div className="table-header">
        {(!isForWarehouseDetails ? tableHeader : warehouseDetailsTableHeader).map((header, index) => (
                <div key={index} className={`table-header__item table-header__item--${header.replace(" ", "-")} ${index === 0 ? 'table-header__item--first' : 'table-header__item--other'}`} >
                  <h4 className="table-header__text">{header}</h4>
                  <img src={sortIcon} alt="Sort" className="table-header__sort-icon" />
                </div>
              ))}
    </div>
  )
}

export default TableHeader;
