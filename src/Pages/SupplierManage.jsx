import EnteteTableau from "../component/EnteteTableau";
import validator from 'validator';
import { useState,useEffect } from "react";
import NavBar from "../component/navBar";
import Input from "../component/inputs/input";
import DoubleButton from "../component/Button/DoubleBoutton";
import LineTableu from "../component/LineTableau";
import ElementTableau1 from "../component/ElementTableau1";
import { Navigate } from 'react-router-dom';
import { authenticateUser } from "../fonctionAuth/ath";
function SupplierManage() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
const [MaterialName,setMaterialName]=useState('')
const [DateOf_Order,setDateOf_Order]=useState('')
const [Quantity,setQuantity]=useState('')
const [DeliveryDate,setDeliveryDate]=useState('')
const [Supplier,setSupplier]=useState([])

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

useEffect(() => {
  fetch('https://minetrack-back.onrender.com/orders/getAll')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      return response.json();
    })
    .then(data => {
      // Données récupérées avec succès
      setSupplier(data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
    });
}, [Supplier])

console.log(Supplier)
const sendData = async() => {
  try{
    const isAuthenticated = await authenticateUser();
    if (!isAuthenticated) {
      // Si l'authentification échoue, ne pas continuer avec l'envoi de données
      console.log("L'authentification a échoué. Arrêt de l'envoi de données.");
      alert('le token a expiré veuillez vous reconnecter')
      setRedirectToLogin(true);
      return;
    }
  const matriculationNumberAdmin = localStorage.getItem('matriculationNumber');
  const requestData = {
    MaterialName: MaterialName ,
		DateOf_Order:DateOf_Order,
		Quantity:Quantity,
		DeliveryDate:DeliveryDate,
    matriculationNumberSadmin: matriculationNumberAdmin
  };

  // Effectuer la requête POST en utilisant fetch
  fetch('https://minetrack-back.onrender.com/orders/Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(response => {
      // Vérifiez si la réponse est ok
      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }
      // Si la réponse est ok, retournez les données en JSON
      return response.json();
    })
    .then(data => {
      // Récupérer l'ID et l'InitialQte du matériau ajouté
      const OrderId = data.id;

      // Stocker les données dans le localStorage
      localStorage.setItem('MaterialID', OrderId);
      console.log('commande faite ajouté');
      
      // Vous pouvez effectuer d'autres actions avec les données de la réponse si nécessaire
    })
    .catch(error => {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de la requête :', error);
    });
  }catch(error){
    console.error('Erreur lors de la requête : ',error)
  }
};

const handleMaterialName = (e) => {
  setMaterialName(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
  textValidator(e.target.value, MaterialName); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
};

const handleQuantity = (e) => {
  setQuantity(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
  textValidator(e.target.value, MaterialName); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
};


const handleDateOf_Order = (e) => {
  setDateOf_Order(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
  dateValidator(e.target.value); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
};

const handleDeliveryDate = (e) => {
  setDeliveryDate(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
  dateValidator(e.target.value); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
};



  return ( 
    <>
        {redirectToLogin && <Navigate to="/S_adminLogin" />}
    <div className="flex w-[100%]">
        <NavBar />

        {/* div supreme */}
        <div className="flex-col w-[80%]">
          {/* Partie Formulaire */}
          <div className="w-[80%] m-auto border border-[#D0D0D0] rounded-lg mt-6">
            <EnteteTableau text="Place an order" />
            <form action="" className="w-[90%] m-auto h-[40rem]">
              <Input
                classes="w-[100%]"
                type="text"
                name="MaterialName"
                label="Material Name"
                htmlFor="Materialname"
                change={handleMaterialName}
              />


<Input
                classes="w-[100%]"
                type="date"
                name="DateOf_Order"
                label="Date of order"
                htmlFor="DateOfOrder"
                change={handleDateOf_Order}
              />

              <Input
                classes="w-[100%]"
                type="text"
                name="Quantity"
                label="Quantity"
                htmlFor="Quantity"
                change={handleQuantity}
              />
<Input
                classes="w-[100%]"
                type="date"
                name="DeliveryDate"
                label="Determine a delivery date"
                htmlFor="DeliveryDate"
                change={handleDeliveryDate}
              />

              <DoubleButton click={sendData}/>
            </form>
          </div>

          {/* Partie Manipulation de l'Etat des Vehicules */}

          <div className="w-[80%] m-auto mt-24 border border-[#C1C1C1] rounded-lg">
           <EnteteTableau text='List of orders'/>
           <div className="flex">
           <LineTableu text1='Date' text2='Made by' text3='Material Name'/>
           <LineTableu text3='Delivery Date'/>
           <LineTableu text3='Quantity'/>
           </div>

           {Supplier.map(supplier=>(
            <div
            key={supplier.id}
             className="flex">
            <ElementTableau1
             text1={supplier.DateOf_Order}
              text2='Betsaleel yoto'
               text3={supplier.MaterialName}
                cl='text-[#6E6E6E]'/>
            <ElementTableau1
             text3={supplier.DeliveryDate}
              cl='text-[#6E6E6E]'/>
            <ElementTableau1
             text3={supplier.Quantity}
               cl='text-[#6E6E6E]'/>
            </div>
           ))}
           
          
          
          </div>
        </div>
      </div>
    </>
   );
}

export default SupplierManage;