import BarreDeNiveau from "./barreDeNiveau";

function ElementTableau2(props) {
  return ( 
    <>
    <div className="flex  w-[100%] pb-5 pt-2">
          <p className="font-raleway text-[#5D5D5D] font-semibold w-[40%] m-auto pl-3">
            {props.text1}
          </p>
          <div className="w-[40%] m-auto">
          <BarreDeNiveau width={props.w} bgcl={props.bg} h='h-[0.5rem]'/>
          </div>

        <p className="font-raleway text-[#5D5D5D] font-semibold w-[20%] m-auto">
          {props.text2}
        </p>
      </div>
    </>
   );
}

export default ElementTableau2;


// Pour gerer la taille on va prendre le nombre de tache en pourcentage et puis on ramene le pourcentage sur base des 80%