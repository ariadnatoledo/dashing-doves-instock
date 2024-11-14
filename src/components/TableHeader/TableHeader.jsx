import "./TableHeader.scss";
import sortIcon from "../../assets/Icons/sort-24px.svg";

function TableHeader({ page }) {

  const warehouseTableHeader = ["warehouse", "address", "contact name", "contact information", "actions"];
  const inventoryTableHeader = ["inventory item", "category", "status", "qty", "warehouse", "actions"];

  const tableHeader = page === "warehouses" ? warehouseTableHeader : inventoryTableHeader;

  return (
    <div className="table-header">
      {tableHeader.map((header, index) => (
        <div key={index} className="table-header__item">
          <h4 className="table-header__text">{header}</h4>
          <img src={sortIcon} alt="Sort" className="table-header__sort-icon" />
        </div>
      ))}
    </div>
  )
}

export default TableHeader;
