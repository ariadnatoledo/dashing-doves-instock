import "./WarehouseItem.scss";
import ChevronIcon from "../../assets/Icons/shevron_right_24px/svg";

function WarehouseItem({ warehouse }) {
  return (
    <>
      <div>
        <p>WAREHOUSE</p>

        <div>
          <Link to={`warehouse/${warehouse.id}`}>
            <p>{warehouse.warehouse_name}</p>
            <img className="warehouse__icon" src={ChevronIcon} alt="icon" />
          </Link>
        </div>
      </div>
      <div>
        <p> ADDRESS</p>
      </div>
      <div>
        <p>
          {warehouse.address}, {warehouse.city}, {warehouse.country}
        </p>
      </div>
      <p>CONTACT NAME</p>
      <div>
        <p>{warehouse.contact}</p>
      </div>
    </>
  );
}

export default WarehouseItem;
