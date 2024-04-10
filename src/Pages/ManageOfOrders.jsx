import EnteteRapports from "../component/EnTeteRapports";
import NormalTitle from "../component/NormalTitle";
import SuperLineBlue from "../component/SuperlineBlue";
import { useState,useEffect } from "react";
function ManageOfOrders() {
const [Orders,setOrders]=useState([])

  useEffect(() => {

    fetch('http://localhost:3000/orders/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        // Données récupérées avec succès
        setOrders(data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []);

  return ( 
    <>
    <div className="h-[20%] bg-[#39527B] flex">
    <h1 className="font-bold font-raleway text-[2rem] text-white text-center relative left-[48rem]">Manage your orders</h1>
    <img src="/src/img/Vector.svg" alt="" className="ml-[85rem] border-l border-[white] pl-20"/>
    </div>

    <div className="w-[100%] h-auto pt-6">
<EnteteRapports text='List of orders'/>
<SuperLineBlue text1='Order ID' text2='Date' text3='Product' text4='Quantity'/>
{Orders.map(order=>(
  <NormalTitle
  key={order.id}
 text1={order.id}
  text2={order.DeliveryDate}
  text3={order.MaterialName}
  text4={order.Quantity}/>
))}

</div>
    </>
   );
}

export default ManageOfOrders;