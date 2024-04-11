import { useState } from "react";
import { Navigate } from 'react-router-dom';
import ConnectForm from "../component/connectForm";
import validator from 'validator';
function UserLogin() {
const [redirect, setRedirect] = useState(false);
const [Username,setUsername]=useState('')
const [matriculationNumber,setmatriculationNumber]=useState('')


  const textValidator = (inputValueA, inputValueB) => {
    try {
      if (!validator.isLength(inputValueA, { min: 1 })) {
        console.log('le champ A ne doit pas être vide');
      } else if (!validator.matches(inputValueA, /^[^<>\s]+$/)) {
        console.log("ces caractères ne sont pas autorisés pour le champ A");
      } else if (!validator.isLength(inputValueB, { min: 1 })) {
        console.log('le champ B ne doit pas être vide');
      } else if (!validator.matches(inputValueB, /^[^<>\s]+$/)) {
        console.log("ces caractères ne sont pas autorisés pour le champ B");
      } else {
        console.log('valide');
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la validation :', error);
    }
  };

 const sendData = () => {

  const requestData = {
    matriculationNumber: matriculationNumber,
    UserName: Username,
  };
  
  // Effectuer la requête POST en utilisant fetch
  fetch('https://minetrack-back.onrender.com/users/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  .then(response => {
    // Vérifiez si la réponse est ok
    if (!response.ok) {
      alert('soit cet utilisateur n\'existe pas il doit etre ajouter soit le mot le passe ou le username ne sont pas correctes')
      throw new Error('Erreur lors de la requête');
    }
    console.log('Utilisateur Connecté');
    // Si la réponse est ok, retournez les données en JSON
    return response.json();
  }).then(data => {
    // Gérer la réponse du serveur
    console.log('Réponse du serveur :', data);
    // Stocker le token dans sessionStorage
    if(data.token) {
      sessionStorage.setItem('token', data.token);
      // Rediriger vers le dashboard une fois que vous avez le token
      setRedirect(true);
    }
  })
  .catch(error => {
    // Gérer les erreurs éventuelles
    console.error('Erreur lors de la requête :', error);
  });
  
};

 


  const handleUserName = (e) => {
    setUsername(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
    textValidator(e.target.value, Username); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
  };

  const handleMatriculation = (e) => {
    setmatriculationNumber(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
    textValidator(e.target.value, matriculationNumber); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
  };

  return ( 
    <>
    {redirect && <Navigate to="/Report" />}
<ConnectForm button='Log in' change={handleUserName} change1={handleMatriculation} click={sendData}/>
    </>
   );
}

export default UserLogin;