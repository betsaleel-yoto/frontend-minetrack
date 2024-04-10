import Select2 from "./inputs/Select2";
import { useState,useEffect } from "react";
import UniqueButton from "./Button/UniqueButton";
function FormDriver() {
  const [shipments, setShipments] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:3000/vehicle/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        // Données récupérées avec succès
        setShipments(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []);
  
  return ( 
    <>
    <div className="flex">
    <p className="font-semibold font-raleway text-[#39527B]">Vehicle</p>
    <form action="" className="flex">
    <Select2 name='RelatedVehicle' optionText={shipment => shipment.VehicleName}
                options={shipments}/>
    <UniqueButton text='ok'/>
    </form>
   
  </div>
    </>
   );
}

export default FormDriver;