import "./InventoryItem.scss";

function InventoryItem( {inventory }) {
  return (
    <div>
      <p>{inventory.id}</p>
    </div>
  )
}

export default InventoryItem
