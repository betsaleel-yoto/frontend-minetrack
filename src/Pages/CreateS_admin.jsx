import { useState } from 'react';
import ConnectForm from '../component/connectForm';
import validator from 'validator';
import { Link, Navigate } from 'react-router-dom';

function CreateS_admin() {
  const [matriculationNumber, setMatriculationNumber] = useState(""); // État pour stocker le matriculationNumber entré par l'utilisateur
  const [username, setUsername] = useState(""); // État pour stocker le username entré par l'utilisateur
  const [message, setMessage] = useState(""); // État pour stocker le message de réponse du serveur
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); // État pour gérer la redirection

  // Fonction pour valider les entrées de texte
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

  // Fonction pour envoyer les données du formulaire au backend
  const sendData = () => {
    const requestData = {
      matriculationNumber: matriculationNumber,
      username: username
    };
  
    // Effectuer la requête POST en utilisant fetch
    fetch('https://minetrack-back.onrender.com/sAdmin/Signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        // Vérifier si la réponse est ok
        if (!response.ok) {
          throw new Error('Erreur lors de la requête');
        }
        // Si la réponse est ok, retourner les données en JSON
        return response.json();
      })
      .then(data => {
        // Mettre à jour le message avec la réponse du serveur
        setMessage(data.message);
        // Stocker le matriculationNumber dans le localStorage
        if (data.data && data.data.matriculationNumber) {
          localStorage.setItem('matriculationNumber', data.data.matriculationNumber);
          console.log('matricule stocké')
        }
        // Si la création du SuperAdmin est réussie, activer la redirection
        if (data.message === 'SuperAdmin créé avec succès') {
          alert('SuperAdmin créé avec succès');
          setRedirectToDashboard(true);
        }
      })
      .catch(error => {
        // Gérer les erreurs éventuelles
        console.error('Erreur lors de la requête :', error);
      });
  };
  

  // Fonction pour mettre à jour l'état du matriculationNumber
  const handleMatriculationNumberChange = (e) => {
    setMatriculationNumber(e.target.value);
    // Valider le matriculationNumber
    textValidator(e.target.value, username);
  };

  // Fonction pour mettre à jour l'état du username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Valider le username
    textValidator(matriculationNumber, e.target.value);
  };

  return (
    <>
      {/* Si redirectToDashboard est true, rediriger vers '/dashboard' */}
      {redirectToDashboard && <Navigate to="/dashboard" />}
      {/* Afficher le formulaire de connexion */}
      <ConnectForm h1="Create the S.Administrator" button='Sign up' change={handleUsernameChange} change1={handleMatriculationNumberChange} click={sendData} onMatriculationNumberChange={handleMatriculationNumberChange} onUsernameChange={handleUsernameChange} />
      {/* Afficher le message de réponse du serveur */}
      <p>{message}</p>
    </>
  );
}

export default CreateS_admin;
