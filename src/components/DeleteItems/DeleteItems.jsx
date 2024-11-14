// import React from 'react';
// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../DeleteItems/DeleteItems.scss"
// import InventoryItem from "../InventoryItem/InventoryItem";
// import CancelDeleteButton from "../CancelDeleteButton/CancelDeleteButton"
// import PagesHeader from "../PagesHeader/PagesHeader"



// export default function DeleteItems({ items }) {

//     const [list, setList] = useState([]);

//     useEffect(() => {
//         const getItems = async () => {
//             const response = await axios.get(`${import.meta.env.VITE_API_URL}/${items}`);
//             setList(response.data);
//         };
//         getItems();
//     }, [items]);
//     return (
//         <>
//         {items === "inventory" && (
//             <>
//                 <PagesHeader title="inventory" />
//                 {list.map((listItem) => (
//                     <div key={listItem.id}>
//                         <InventoryItem inventory={listItem} />
//                     </div>
//                 ))}
//             </>
//         )}
//         <CancelDeleteButton/>
//         </>
//     )
// }


