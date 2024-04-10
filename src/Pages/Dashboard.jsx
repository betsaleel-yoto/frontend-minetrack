import ElementUser from "../component/ElementUser";
import { Navigate } from 'react-router-dom';
import NavBar from "../component/navBar";
import Input from "../component/inputs/input";
import Select from "../component/inputs/Select";
import DoubleButton from "../component/Button/DoubleBoutton";
import validator from "validator";
import Search from "../component/Search";
import EnteteTableau from "../component/EnteteTableau";
import LineTableu from "../component/LineTableau";
import ElementTableau2 from "../component/ElementTableau2";
import ElementTableau1 from "../component/ElementTableau1";
import { authenticateUser } from "../fonctionAuth/ath";
import { useState, useEffect } from "react";
function Dashboard() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [Username, setUsername] = useState("");
  const [matriculationNumber, setmatriculationNumber] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [UserTitle, setUserTitle] = useState("");
  const [User, setUser] = useState([]);
  const [admin, setadmin] = useState([]);
  const [DisplayTitle, setDisplayTitle] = useState([]);
  const [Materials, setMaterials] = useState([]);
  const [Vehicles, setvehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  //orinary

  useEffect(() => {
    fetch("http://localhost:3000/users/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        // Données récupérées avec succès
        setUser(data.filter((user) => user.UserRole === "Ordinary"));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [User]);

  //Admin

  useEffect(() => {
    fetch("http://localhost:3000/users/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        const id = parseInt(localStorage.getItem("ShipmentId"));
        // Données récupérées avec succès
        setadmin(data.filter((user) => user.UserRole !== "Ordinary"));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [User]);

  //shipment Title
  useEffect(() => {
    // Fonction pour récupérer les données de l'URL vers les expéditions
    const fetchDisplayData = async () => {
      const id = parseInt(localStorage.getItem("ShipmentId"));
      try {
        // Remplacez 'URL_VERS_VOTRE_API_EXPEDITIONS' par l'URL appropriée
        const response = await fetch("http://localhost:3000/shipments/getAll");
        const shipmentData = await response.json();

        // Remplacez 'URL_VERS_VOTRE_API_TACHES' par l'URL appropriée
        const taskResponse = await fetch(
          "http://localhost:3000/shipmentTasks/getAll"
        );
        const taskData = await taskResponse.json();

        const mergedData = {
          shipmentTitle: shipmentData.filter((title) => title.id == id),
          tasks: taskData.filter((task) => task.ShipmentId == id),
        };

        // Mettez à jour l'état avec les données fusionnées
        return setDisplayTitle(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDisplayData();
  }, []);

  let task = DisplayTitle.tasks && DisplayTitle.tasks.length;
  let task2 =
    DisplayTitle.tasks &&
    DisplayTitle.tasks.filter((task) => task.Taskstate === "finished");
  let task3 = task2 && task2.length;
  const total = ((parseInt(task3) * 100) / parseInt(task)).toFixed(0) || 0;
  const width = (total * 80) / 100 ;
  let color;
  if (total >= 50) {
    color = "#39527B";
  } else {
    color = "#FF7473";
  }

  console.log(width);

  //Material

  useEffect(() => {
    fetch("http://localhost:3000/materials/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        // Données récupérées avec succès
        setMaterials(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  console.log(Vehicles);

const regex=/[0-9]/g
function colorMat(Current,initial){
  let curr=parseInt((Current).match(regex).join(''))
  let Init= parseInt((initial).match(regex).join(''))
  let v='#60C84C'
  let r='#FF7473';
  if((curr*100)/Init >50){
    return v
  } else{
    return r
  } 

}


  //Vehicle

  useEffect(() => {
    fetch("http://localhost:3000/vehicle/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        // Données récupérées avec succès
        setvehicles(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const vehicleRegistrationNumber = localStorage.getItem(
    "vehicleRegistrationNumber"
  );
  const State =
    Vehicles &&
    Vehicles.filter(
      (vehicle) =>
        vehicle.VehicleRegistrationNumber === vehicleRegistrationNumber
    );
  const VState = State.map((state) => state.VehicleCondition).join("");
  let color3 = "";
  console.log(VState);
  if (VState == "Good") {
    color3 = "#60C84C";
  } else {
    color3 = "#FF7473";
  }

  const textValidator = (inputValueA, inputValueB) => {
    try {
      if (!validator.isLength(inputValueA, { min: 1 })) {
        console.log("le champ A ne doit pas être vide");
      } else if (!validator.matches(inputValueA, /^[^<>\s]+$/)) {
        console.log("ces caractères ne sont pas autorisés pour le champ A");
      } else if (!validator.isLength(inputValueB, { min: 1 })) {
        console.log("le champ B ne doit pas être vide");
      } else if (!validator.matches(inputValueB, /^[^<>\s]+$/)) {
        console.log("ces caractères ne sont pas autorisés pour le champ B");
      } else {
        console.log("valide");
      }
    } catch (error) {
      console.error("Une erreur est survenue lors de la validation :", error);
    }
  };

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
    const matriculationNumberAdmin = localStorage.getItem(
      "matriculationNumber"
    );
    const requestData = {
      matriculationNumber: matriculationNumber,
      UserName: Username,
      UserRole: UserRole,
      UserTitle: UserTitle,
      matriculationNumberSadmin: matriculationNumberAdmin,
    };

    // Effectuer la requête POST en utilisant fetch
    fetch("http://localhost:3000/users/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        // Vérifiez si la réponse est ok
        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }
        console.log("Utilisateur Crée");
        // Si la réponse est ok, retournez les données en JSON
        return response.json();
      })

      .catch((error) => {
        // Gérer les erreurs éventuelles
        console.error("Erreur lors de la requête :", error);
      });
    }catch(error){
      console.error('Erreur lors de la requête : ',error)
    }
  };

  //Edit

  const EditData = async(matriculationNumber) => {

    try{
      const isAuthenticated = await authenticateUser();
      if (!isAuthenticated) {
        // Si l'authentification échoue, ne pas continuer avec l'envoi de données
        console.log("L'authentification a échoué. Arrêt de l'envoi de données.");
        alert('le token a expiré veuillez vous reconnecter')
        setRedirectToLogin(true);
        return;
      }
    const matriculationNumberAdmin = localStorage.getItem(
      "matriculationNumber"
    );
    const requestData = {
      matriculationNumber: matriculationNumber,
      UserName: Username,
      UserRole: UserRole,
      UserTitle: UserTitle,
      matriculationNumberSadmin: matriculationNumberAdmin,
    };

    // Effectuer la requête POST en utilisant fetch
    fetch(`http://localhost:3000/users/edit/${matriculationNumber}`, {
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
    }catch(error){
      console.error('Erreur lors de la requête : ',error)
    }
  };

  const handleUserName = (e) => {
    setUsername(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
    textValidator(e.target.value, Username); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
  };

  const handleMatriculation = (e) => {
    setmatriculationNumber(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
    textValidator(e.target.value, matriculationNumber); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
  };

  const handleRole = (e) => {
    setUserRole(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
    textValidator(e.target.value, UserRole); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
  };

  const handleTitle = (e) => {
    setUserTitle(e.target.value); // Mettre à jour l'état matriculationNumber avec la valeur entrée
    textValidator(e.target.value, UserTitle); // Appel de textValidator avec la nouvelle valeur du matriculationNumber
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  return (
    <>
     {redirectToLogin && <Navigate to="/S_adminLogin" />}
      <div className="flex w-[100%]">
        <NavBar />
        {/* div supreme */}
        <div className="flex-col w-[80%]">
          {/* div du dessus avec la bannière */}
          <div className="w-[100%]">
            <div className="flex border-b border-[#D8D4D4] pt-3 fixed top-0">
              <div className="border-r border-[#B6B6B6] pl-[2rem] pb-[1.77rem] pr-[2rem]">
                <button type="button">
                  <img src="/src/img/Vector.svg" alt="" className="mt-[1rem]" />
                </button>
              </div>
              <div className="relative left-[62rem]">
                <Search />
              </div>

              <div className="flex ml-[65rem]">
                <img
                  src="/src/img/user-solid.svg"
                  alt=""
                  className="border-2 border-[#909090] rounded-[100%] w-[2rem] h-[2rem]"
                />
                <p className="pl-1 font-semibold font-raleway text-[#787878] mt-1">
                  User
                </p>
                <img
                  src="/src/img/fleche_bas.svg"
                  alt=""
                  className="w-[10px] relative bottom-5 left-2"
                />
              </div>
            </div>
            {/* partie bannière */}
            <div
              className="h-40 w-[73%] ml-[10.3rem] mt-[8rem] rounded-lg bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('./src/img/istockphoto-1322302356-1024x1024 1.jpg')",
              }}
            >
              <div className="inset-0 bg-black opacity-60 h-40 w-[100%] rounded-lg"></div>
              <h1 className="font-bold text-white font-raleway text-[3.5rem] relative bottom-[9rem] left-14">
                Welcome to Minetrack
              </h1>
            </div>
          </div>
          {/* div du dessus avec la bannière */}

          <div className="flex w-[100%] h-[auto] mt-12">
            {/* première grande div */}
            <div className="border  border-[#BCBCBC] rounded-[8px] ml-[10rem] w-[45%] p-5">
              {/* En tete */}
              <div className="flex bg-[#D9D9D9] w-[41.2rem] relative right-[1.3rem] h-16 bottom-6 rounded-t-lg">
                <h2 className="font-bold font-raleway text-[#39527B] pl-8 border-r border-[#B2AEAE] pr-16 h-16 pt-5">
                  All User
                </h2>
                <div className="flex">
                  <img
                    src="/src/img/Ellipse 8.svg"
                    alt=""
                    className="pl-14 w-[4.3rem]"
                  />
                  <h2 className="font-bold font-raleway text-[#39527B] mt-5 pr-16 pl-2">
                    For Admin
                  </h2>
                </div>
                <div className="flex">
                  <img
                    src="/src/img/Ellipse 13.svg"
                    alt=""
                    className="w-[0.7555rem]"
                  />
                  <h2 className="font-bold font-raleway text-[#39527B] mt-5 pl-2">
                    For Others
                  </h2>
                </div>
              </div>
              {/* Partie Liste des Utilisateurs */}
              <div className="flex border rounded-md">
                <div className="border border-[#565656] rounded-md">
                  {admin.map((user, index) => (
                    <div key={index}>
                      <ElementUser
                        onClick={handleEditUserClick}
                        src="/src/img/Ellipse 8.svg"
                        user={user}
                        className="border"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-3 border border-[#565656] rounded-md">
                  {User.map((user, index) => (
                    <ElementUser
                      key={index}
                      src="/src/img/Ellipse 13.svg"
                      onClick={handleEditUserClick}
                      user={user}
                      className="border"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* première grande div */}

            {/* deuxième grande div */}

            {/* Partie formmulaire */}
            <div className="border  border-[#BCBCBC] rounded-[8px] ml-[5rem] w-[23%] p-5">
              <h2 className="bg-[#D9D9D9] w-[21rem] relative right-[1.3rem] h-16 bottom-6 rounded-t-lg font-raleway font-bold text-[#39527B] text-center pt-5">
                Add User
              </h2>
              <form action="" method="POST">
                <Input
                  classes="w-[18rem]"
                  type="text"
                  name="UserName"
                  label="Username"
                  htmlFor="username"
                  change={handleUserName}
                />
                <Input
                  classes="w-[18rem]"
                  type="text"
                  name="matriculationNumber"
                  label="ID number"
                  htmlFor="idnumber"
                  change={handleMatriculation}
                />
                <Select
                  name="UserRole"
                  htmlFor="user_role"
                  label="UserRole"
                  option1="Admin"
                  option2="Supplier"
                  option3="Ordinary"
                  change={handleRole}
                />
                <Input
                  classes="w-[18rem]"
                  type="text"
                  name="UserTitle"
                  label="UserTitle"
                  htmlFor="usertitle"
                  change={handleTitle}
                />
                <DoubleButton click={sendData} />
              </form>
            </div>
            {/* deuxième grande div */}
          </div>
          {/* <BarreDeNiveau width='w-[40rem]' bgcl='bg-[#39527B]' h='h-[0.5rem]'/> */}

          {/* partie tableaux des stats */}

          {/* premier Tableau */}

          <div className="w-[80%] m-auto h-auto border border-[#D1D1D1] rounded-lg mt-[5rem]">
            <EnteteTableau text="Ongoing Expeditions" />
            <LineTableu text1="Title" text2="Progress" text3="%" />
            {DisplayTitle.shipmentTitle &&
              DisplayTitle.shipmentTitle.map((title) => (
                <ElementTableau2
                  key={title.id}
                  text1={title.ShipmentTitle}
                  text2={`${total}%`}
                  bg={`bg-[${color}]`}
                  w={`w-[${width}%]`}
                />
              ))}
          </div>
          <div className="w-[80%] m-auto h-auto border border-[#D1D1D1] rounded-lg mt-[5rem]">
            <EnteteTableau text="Stocks level" />
            <LineTableu
              text1="Material Name"
              text2="Shipment Name"
              text3="Consumed %"
            />
            {Materials.map((material) => (
              <ElementTableau1
                key={material.id}
                text1={material.MaterialName}
                text2={material.RelatedShipment}
                text3={`${((parseInt((material.InitialQte).match(regex).join(''))-parseInt((material.CurrentQte).match(regex).join('')))*100)/(parseInt((material.InitialQte).match(regex).join('')))}%`}
                cl={`text-[${colorMat(material.CurrentQte,material.InitialQte)}]`}
              />
            ))}
          </div>

          <div className="w-[80%] m-auto h-auto border border-[#D1D1D1] rounded-lg mt-[5rem]">
            <EnteteTableau text="Vehicle inspection" />
            <LineTableu text1="Vehicle Name" text3="Vehicle condition" />
            {Vehicles.map((vehicle) => (
              <ElementTableau1
                key={vehicle.VehicleRegistrationNumber}
                text1={vehicle.VehicleName}
                text3={vehicle.VehicleCondition}
                cl={`text-[${color3}]`}
              />
            ))}
          </div>
        </div>
        {showForm ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <form action="" method="POST">
              <Input
                classes="w-[18rem]"
                type="text"
                name="UserName"
                label="Username"
                htmlFor="username"
                change={handleUserName}
              />
              <Input
                classes="w-[18rem]"
                type="text"
                name="matriculationNumber"
                label="ID number"
                htmlFor="idnumber"
                value={selectedUser.matriculationNumber}
              />
              <Select
                name="UserRole"
                htmlFor="user_role"
                label="UserRole"
                option1="Admin"
                option2="Supplier"
                option3="Ordinary"
                change={handleRole}
              />
              <Input
                classes="w-[18rem]"
                type="text"
                name="UserTitle"
                label="UserTitle"
                htmlFor="usertitle"
                change={handleTitle}
              />
              <DoubleButton
                click={() => EditData(selectedUser.matriculationNumber)}
              />
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Dashboard;

// Ici pour changer la couleur on va prendre la valeur ramener en 80 et la mettre en pourcentage et faire des conditions par rapport à cela
