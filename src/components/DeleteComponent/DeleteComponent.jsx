// import React from 'react';
// import CancelDeleteButton from '../CancelDeleteButton/CancelDeleteButton';
// import '../DeleteComponent/DeleteComponent.scss';
// import close from '../../assets/Icons/close-24px.svg';
// import { Link } from 'react-router-dom';

// export default function DeleteComponent({ inventory, navigateTo}) {
//   return (
//     <section className='deletion'>
//       <div className='deleteInventory'>
//         <Link
//           className="deleteClose-link"
//           to={`/inventory/`}
//         >
//           <img src={close} alt='close icon' className='closePrompt' />
//         </Link>

//         <h1 className='deleteInventory-title'>
//           Delete {inventory ? inventory.item_name : 'inventory item?'}
//         </h1>

//         <p className="deleteDescription">
//           Please confirm that you'd like to delete <strong>{inventory ? inventory.item_name : 'this item'}</strong>
//           from the inventory list. You won't be able to undo this action.
//         </p>

//         <CancelDeleteButton navigateTo={`/inventory/`} />

        
//       </div>
//     </section>
//   );
// }
