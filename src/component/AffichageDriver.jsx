import ProfilShipment from "./ProfilShipment";
import FormDriver from "./FormDriver";
function AffichageDriver(props) {
  return ( 
    <>
 <ProfilShipment src='/src/img/Ellipse 13.svg' name={props.name} title='Driver'/>
 <FormDriver/>
    </>
   );
}

export default AffichageDriver;