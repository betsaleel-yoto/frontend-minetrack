import React, { useState, useEffect } from "react";
import { authenticateUser } from "../fonctionAuth/ath";
import EnteteTableau from "../component/EnteteTableau";
import validator from 'validator';
import { Navigate } from 'react-router-dom';
import Select2 from '../component/inputs/Select2'
import NavBar from "../component/navBar";
import Input from "../component/inputs/input";
import DoubleButton from "../component/Button/DoubleBoutton";
import SuperTitle from "../component/SuperTitle";
import IconsEditDelete from "../component/IconsEditDelete";
import ProfilShipment from "../component/ProfilShipment";
import FormDriver from "../component/FormDriver";
import FormTask from "../component/FormTask";
import AffichageDriver from "../component/AffichageDriver";


function CreateShipment() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [showDisplay, setShowDisplay] = useState(false);
  const [ShipmentTitle, setShipmentTitle] = useState("");
  const [ShipmentDescription, setShipmentDescription] = useState("");
  const [BeginDate, setBeginDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [shipmentsDetails,setshipmentsDetails]=useState('');
  const [Driver,setDriver]=useState([]);
  const [Others,setOthers]=useState([]);
  const [DisplayTitle,setDisplayTitle]=useState([]);
  const [displayTasks,setdisplayTasks]=useState([]);
  const [task,setTask]=useState('');
  const [showForm, setShowForm] = useState(false);
  

  useEffect(() => {
    fetch('http://localhost:3000/users/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setShipments(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, [shipments]);

  useEffect(() => {
    fetch('http://localhost:3000/shipments/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setshipmentsDetails(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, [shipmentsDetails]);

  useEffect(() => {
    fetch('http://localhost:3000/participant/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        const id= parseInt(localStorage.getItem('ShipmentId'))
        setDriver(data.filter(participant => participant.ParticipantRole === 'Driver' && participant.ShipmentId=== id));
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, [Driver]);

  useEffect(() => {
    fetch('http://localhost:3000/participant/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        const id= parseInt(localStorage.getItem('ShipmentId'))
        setOthers(data.filter(participant => participant.ParticipantRole !== 'Driver' && participant.ShipmentId===id))
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, [Others]);

  useEffect(() => {
    const id =localStorage.getItem('ShipmentId')
    fetch('http://localhost:3000/shipments/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setDisplayTitle(data.filter(participant => participant.id == id))
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, [DisplayTitle]);

  useEffect(() => {
    const id =parseInt(localStorage.getItem('ShipmentId'))
    fetch('http://localhost:3000/shipmentTasks/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setdisplayTasks(data.filter(task => task.ShipmentId == id))
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, [displayTasks]);

  const textValidator = (inputValueA, inputValueB) => {
    try {
      if (!validator.isLength(inputValueA, { min: 1 })) {
        console.log('le champ A ne doit pas être vide');
      } else if (!validator.matches(inputValueA, /^[^<>]+$/)) {
        console.log("ces caractères ne sont pas autorisés pour le champ A");
      } else if (!validator.isLength(inputValueB, { min: 1 })) {
        console.log('le champ B ne doit pas être vide');
      } else if (!validator.matches(inputValueB, /^[^<>]+$/)) {
        console.log("ces caractères ne sont pas autorisés pour le champ B");
      } else {
        console.log('valide');
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la validation :', error);
    }
  };
  
  const dateValidator = (inputValue) => {
    try {
      const regexDate = /^\d{4}-\d{2}-\d{2}$/;
      if (regexDate.test(inputValue)) {
       console.log("La date est valide.");
      } else {
        console.log("La date n'est pas valide.");
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la validation de la date :', error);
      console.log('Une erreur est survenue lors de la validation de la date');
    }
  };

  const sendData = async () => {
    try {
      // Appel authenticateUser pour vérifier l'authentification avant d'envoyer la demande
      const isAuthenticated = await authenticateUser();
      if (!isAuthenticated) {
        // Si l'authentification échoue, ne pas continuer avec l'envoi de données
        console.log("L'authentification a échoué. Arrêt de l'envoi de données.");
        alert('le token a expiré veuillez vous reconnecter')
        setRedirectToLogin(true);
        return;
      }
  
      // Si l'authentification réussit, continue avec l'envoi de la demande
      const matriculationNumber = localStorage.getItem('matriculationNumber');
      const requestData = {
        ShipmentTitle: ShipmentTitle,
        ShipmentDescription: ShipmentDescription,
        BeginDate: BeginDate,
        EndDate: EndDate,
        matriculationNumberSadmin: matriculationNumber
      };
  
      const response = await fetch('http://localhost:3000/shipments/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }
  
      const data = await response.json();
      const ShipmentId = data.data.id;
      localStorage.setItem('ShipmentId', ShipmentId);
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  const sendData2 = async(e) => {
try{
  const isAuthenticated = await authenticateUser();
  if (!isAuthenticated) {
    // Si l'authentification échoue, ne pas continuer avec l'envoi de données
    console.log("L'authentification a échoué. Arrêt de l'envoi de données.");
    alert('le token a expiré veuillez vous reconnecter')
    setRedirectToLogin(true);
    return;
  }
  
    const id= parseInt(localStorage.getItem('ShipmentId'))
    const ParticipantName=e.target.value
    const requestData = {
      ParticipantName:ParticipantName,
      ShipmentId:id
    };

    fetch('http://localhost:3000/participant/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
    }catch(error){
        console.error('Erreur lors de la requête : ',error)
      }
  };

  const addTask = async() => {
    try{
      const isAuthenticated = await authenticateUser();
      if (!isAuthenticated) {
        // Si l'authentification échoue, ne pas continuer avec l'envoi de données
        console.log("L'authentification a échoué. Arrêt de l'envoi de données.");
        alert('le token a expiré veuillez vous reconnecter')
        setRedirectToLogin(true);
        return;
      }

    
    const id =parseInt(localStorage.getItem('ShipmentId'))
    const requestData = {
      TaskDescription:task,
      Taskstate:'in progress',
      ShipmentId:id
    };

    fetch('http://localhost:3000/shipmentTasks/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête');
        }
        return response.json();
      }).then(data => {
        const ShipmentTaskId = data.data.id;
        localStorage.setItem('ShipmentTaskId', ShipmentTaskId);
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
    }catch(error){
      console.error('Erreur lors de la requête : ',error)
    }
  };

  const handleCheckboxChange = async(event, taskId) => {

    try{
      const isAuthenticated = await authenticateUser();
      if (!isAuthenticated) {
        // Si l'authentification échoue, ne pas continuer avec l'envoi de données
        console.log("L'authentification a échoué. Arrêt de l'envoi de données.");
        alert('le token a expiré veuillez vous reconnecter')
        setRedirectToLogin(true);
        return;
      }
    const updatedTaskState = event.target.checked ? 'finished' : 'in progress';
  
    fetch(`http://localhost:3000/shipmentTasks/edit/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Taskstate: updatedTaskState })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête');
        }
        event.persist(); // Add this line to persist the event
        event.target.checked = updatedTaskState === 'finished'; // Update the checkbox state
        localStorage.setItem(`task_${taskId}`, event.target.checked);
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
    }catch(error){
      console.error('Erreur lors de la requête : ',error)
    }
  };

  const handleShipmentTitle = (e) => {
    setShipmentTitle(e.target.value);
    textValidator(e.target.value, ShipmentTitle);
  };

  const handleShipmentDescription = (e) => {
    setShipmentDescription(e.target.value);
    textValidator(e.target.value, ShipmentDescription);
  };
  
  const handleBeginDate = (e) => {
    setBeginDate(e.target.value);
    dateValidator(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    dateValidator(e.target.value);
  };
  
  const handledisplay = () => {
    setShowDisplay(true);
  };

  const handledisplay2 = () => {
    const id = parseInt(localStorage.getItem('ShipmentId'));
    const shipment = shipmentsDetails.find(element => element.id === id);
    alert(shipment.ShipmentDescription);
  };

  const handleTask = (e) => {
    setTask(e.target.value);
    textValidator(e.target.value, task);
  };
  const EditData = () => {
    let id= localStorage.getItem('ShipmentId');
    const matriculationNumberAdmin = localStorage.getItem(
      "matriculationNumber"
    );
    const requestData = {
      ShipmentTitle:ShipmentTitle,
      ShipmentDescription:ShipmentDescription,
      BeginDate:BeginDate,
      EndDate:EndDate ,    
      matriculationNumberSadmin: matriculationNumberAdmin,
    };

    // Effectuer la requête POST en utilisant fetch
    fetch(`http://localhost:3000/shipments/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        // Vérifiez si la réponse est ok
        // call function that fecth users list fetchUsers()
        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }
        console.log("Utilisateur Modifié");
        setShowForm(false);
        // Si la réponse est ok, retournez les données en JSON
        return response.json();
      })

      .catch((error) => {
        // Gérer les erreurs éventuelles
        console.error("Erreur lors de la requête :", error);
      });
  };  

  
  return ( 
    <>
    {redirectToLogin && <Navigate to="/S_adminLogin" />}
     <div className="flex w-[100%]">
        <NavBar />
        <div className="flex-col w-[80%]">
          <div className="w-[80%] m-auto border border-[#D0D0D0] rounded-lg mt-6">
            <EnteteTableau text='Create a Shipment'/>
            <form action="" className="w-[90%] m-auto h-[40rem]">
              <Input
                classes="w-[100%]"
                type="text"
                name="ShipmentTitle"
                label="Shipment Title"
                htmlFor="ShipmentTitle"
                change={handleShipmentTitle}
              />
              <Input
                classes="w-[100%]"
                type="text"
                name="ShipmentDescription"
                label="Description"
                htmlFor="Description"
                change={handleShipmentDescription}
              />
              <Input
                classes="w-[100%]"
                type="date"
                name="BeginDate"
                label="Begin at"
                htmlFor="Begin"
                change={handleBeginDate}
              />
              <Input
                classes="w-[100%]"
                type="date"
                name="EndDate"
                label="End"
                htmlFor="End"
                change={handleEndDate}
              />
              <DoubleButton click={sendData}/>
            </form>
          </div>
          <div className="flex w-[80%] m-auto pt-24 border-b border-[#BAB2B2] pb-5">
            <div className="w-[40%] h-auto border rounded-lg border-[#C9C9C9]">
              <div className="border-b border-[#D2D2D2]">
                <div className="flex">
                  {DisplayTitle.map(title=>(
                    <SuperTitle
                      key={title.id}
                      text={title.ShipmentTitle}
                      />
                      
                  ))}
                  <div className="relative top-8 left-36">
                  <IconsEditDelete onClick1={()=>setShowForm(true)}/>
                  </div>
                  
                </div>
                <div className="flex m-5">
                  <button type="button" className="flex" onClick={handledisplay2}><img src="/src/img/info.svg" alt="" />
                    <p className="font-semibold font-raleway text-[#6E6E6E] pl-2">Info</p>
                  </button>
                  <button type="button" className="flex pl-[3rem]" onClick={handledisplay}>
                    <img src="/src/img/Group (1).svg" alt="" />
                    <p className="font-semibold font-raleway text-[#6E6E6E] pl-2">Add Participants</p>
                  </button>
                  {showDisplay && <Select2 name='allUsers' change={sendData2} optionText={shipment => shipment.UserName}
                      options={shipments}/>}
                </div>
              </div>
              <div className="p-5">
                {Driver.map(participant=>(
                  <AffichageDriver
                    key={participant.id}
                    name={participant.ParticipantName}/>
                ))}
                {Others.map(participant => (
                  <ProfilShipment
                    key={participant.id}
                    src='/src/img/Ellipse 8.svg'
                    name={participant.ParticipantName}
                    title={participant.ParticipantRole}
                  />
                ))}
              </div>
            </div>
            <div className="w-[40%] h-auto border rounded-lg border-[#C9C9C9] ml-[10rem]">
              <EnteteTableau text='To Do list'/>
              <form action="" className="w-[90%] m-auto h-[12rem] border-b border-[#D2D2D2]">
                <Input
                  classes="w-[100%]"
                  type="text"
                  name="task"
                  label="add task to the shipment"
                  htmlFor="task"
                  change={handleTask}
                />
                <DoubleButton click={addTask}/>
              </form>
              {displayTasks.map(task => (
                <FormTask 
                  key={task.id}
                  taskId={task.id}
                  text={task.TaskDescription}
                  onChange={(e) => handleCheckboxChange(e, task.id)}
                  checked={localStorage.getItem(`task_${task.id}`) === 'true'}
                />   
              ))}
            </div>
          </div>
        </div>
        {showForm ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
             <form action="" className="w-[90%] m-auto h-[40rem]">
              <Input
                classes="w-[100%]"
                type="text"
                name="ShipmentTitle"
                label="Shipment Title"
                htmlFor="ShipmentTitle"
                change={handleShipmentTitle}
              />
              <Input
                classes="w-[100%]"
                type="text"
                name="ShipmentDescription"
                label="Description"
                htmlFor="Description"
                change={handleShipmentDescription}
              />
              <Input
                classes="w-[100%]"
                type="date"
                name="BeginDate"
                label="Begin at"
                htmlFor="Begin"
                change={handleBeginDate}
              />
              <Input
                classes="w-[100%]"
                type="date"
                name="EndDate"
                label="End"
                htmlFor="End"
                change={handleEndDate}
              />
              <DoubleButton click={EditData}/>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default CreateShipment;
