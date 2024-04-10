import IconProfile from "./icon_profil";

function ProfilShipment(props) {
  return ( 
    <>
    <div className="flex pt-[3rem]">
      <div>
        <IconProfile/>
      </div>
      {/* user et title */}
      <div className="pl-4 pr-4">
        <p className="font-semibold font-raleway text-[#5B5B5B]">{props.name}</p>
        <div className="flex">
          <img src={props.src} alt="" />
          <p className="font-semibold font-raleway text-[#9E9E9E] pl-2">{props.title}</p>
        </div>
      </div>

      {/* icons Edit et delete */}

      <div>
        {/* <IconsEditDelete/> */}
        <button type="button" onClick={props.onClick2}><img src="/src/img/Group-1.svg" alt="" /></button>
      </div>
    </div>
    </>
   );
}

export default ProfilShipment;