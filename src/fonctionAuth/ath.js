export const authenticateUser = async () => {
  try {
    const Admintoken = localStorage.getItem('Admintoken');
    console.log(Admintoken)
    if (!Admintoken) {
      // Si le token n'est pas présent, retourner false pour indiquer l'échec de l'authentification
      console.log('authentification échouée')
      return false;
    }

    // Envoyer la demande avec le token
    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Admintoken}`
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'authentification');
    }

    // Si l'authentification réussit, vous pouvez continuer vers l'action suivante
    console.log('Authentification réussie');
    return true; // Indique que l'authentification a réussi
  } catch (error) {
    console.error('Erreur lors de l\'authentification :', error);
    // Gérer l'erreur, par exemple, en redirigeant l'utilisateur vers la page de connexion
    return false; // Indique que l'authentification a échoué
  }
};
