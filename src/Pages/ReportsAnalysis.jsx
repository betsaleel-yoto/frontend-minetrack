import EnteteRapports from "../component/EnTeteRapports";
import NormalTitle from "../component/NormalTitle";
import SubTitleReports from "../component/SubTitleReports";
import SuperLineBlue from "../component/SuperlineBlue";
import { useState,useEffect } from "react";


function ReportsAnalysis() {
  const [DisplayVehicle,setDisplayVehicle]=useState([])
  const [shipments, setShipments] = useState([]);
  const [participants, setparticipants] = useState([]);
  const [task, settask] = useState([]);

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
        setDisplayVehicle(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, [])

  useEffect(() => {
    const id =localStorage.getItem('ShipmentId')
    console.log(id)
    fetch('http://localhost:3000/shipments/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        // Données récupérées avec succès
        setShipments(data.filter(participant => participant.id == id))
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []);


  useEffect(() => {
    const id =localStorage.getItem('ShipmentId')
    fetch('http://localhost:3000/participant/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        // Données récupérées avec succès
        setparticipants(data.filter(participant => participant.ShipmentId == id))
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []);

  console.log(participants)

  useEffect(() => {
    const id =localStorage.getItem('ShipmentId')
    fetch('http://localhost:3000/shipmentTasks/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        // Données récupérées avec succès
        settask(data.filter(participant => participant.ShipmentId == id))
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []);

  console.log(task && task)

  return (
    <>
    <div className="w-[100%] flex">
    {shipments.map(title=>(
      <div
      key={title.id}
       className="w-[100%] h-auto pt-6">
<EnteteRapports text='Logistics Performance Report'/>

<SubTitleReports
 text={title.ShipmentTitle}
  Date={title.EndDate}
  />
<SuperLineBlue text1='Indicator' text4='Value'/>
<NormalTitle text1='Participants' text4={participants.length}/>
<NormalTitle text1='Vehicles' text4={DisplayVehicle.length}/>
<NormalTitle text1='Tasks' text4={task.length}/>
</div>
    ))}


    </div>
    
    </>
   );
}

export default ReportsAnalysis;