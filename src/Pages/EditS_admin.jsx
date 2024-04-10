import ConnectForm from "../component/connectForm";
import validator from 'validator';
import { useState } from "react";
function EditS_admin() {
  const [matriculationNumber, setMatriculationNumber] = useState(""); // Déclaration de l'état matriculationNumber
  const [username, setUsername] = useState("");



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
    const matriculationNumber = localStorage.getItem('matriculationNumber');
    const requestData = {
      matriculationNumber: matriculationNumber,
      username: username
    };

    // Effectuer la requête POST en utilisant fetch
    fetch(`http://localhost:3000/sAdmin/edit/${matriculationNumber}`, {
      method: 'PUT',
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
        console.log('succès de la mise à jour');
        // Si la réponse est ok, retournez les données en JSON
        return response.json();
      })
      .catch(error => {
        // Gérer les erreurs éventuelles
        console.error('Erreur lors de la requête :', error);
      });
  };


  const handleMatriculationNumberChange = (e) => {
    setMatriculationNumber(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
    textValidator(e.target.value, username); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value); // Mettre à jour l'état username avec la valeur entrée
    textValidator(matriculationNumber, e.target.value); // Appel de textValidator avec la nouvelle valeur du username
  };


  return ( 
    <ConnectForm h1="New S.Administrator" button="Save" change={handleUsernameChange} change1={handleMatriculationNumberChange} click={sendData}/>
   );
}

export default EditS_admin;