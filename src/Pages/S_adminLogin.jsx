import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ConnectForm from "../component/connectForm";
import validator from 'validator';

function S_adminLogin() {
  const [redirect, setRedirect] = useState(null);
  const [matriculationNumber, setMatriculationNumber] = useState("");
  const [username, setUsername] = useState("");

  const handleToken = () => {
    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        matriculationNumber: matriculationNumber,
        username: username
      })
    };

    fetch('http://localhost:3000/sAdmin/Login', requestData)
      .then(response => {
        if (!response.ok) {
          console.error('Erreur lors de la requête');
        }
        return response.json();
      })
      .then(data => {
        if (data.token) {
          localStorage.setItem('Admintoken', data.token); // Stocker le token dans le localStorage
          const token = localStorage.getItem('Admintoken'); 
          console.log(token)
          alert('utilisateur reconnu')
          setRedirect('/dashboard'); // Rediriger vers '/dashboard'
        } else {
          console.error('Mauvaises informations d\'identification');
          alert('mot de passe ou nom incorrect')
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
  };

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

  const handleMatriculationNumberChange = (e) => {
    setMatriculationNumber(e.target.value);
    textValidator(e.target.value, username);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    textValidator(matriculationNumber, e.target.value);
  };

  return ( 
    <>
      {redirect && <Navigate to={redirect} />} {/* Redirection lorsque redirect est défini */}
      <ConnectForm checkbox='checkbox' remember='Let go of the hand' button='Log in' change={handleUsernameChange} change1={handleMatriculationNumberChange} onMatriculationNumberChange={handleMatriculationNumberChange} onUsernameChange={handleUsernameChange} click={handleToken}/>
    </>
  );
}

export default S_adminLogin;
