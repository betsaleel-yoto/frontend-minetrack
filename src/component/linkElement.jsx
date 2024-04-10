import { NavLink  } from "react-router-dom";
function LinkElement(props) {
  return ( 
    <>
    <div className="pt-5 border-b border-white h-11 pb-14  hover:bg-[#4886FF]">
      <NavLink to={props.link } className="flex" onClick={props.click}>
      <img src={props.src} alt="" className="px-8"/>
      <p className="relative font-semibold text-white font-raleway left-5 w-96">{props.titleLink }</p>
      <img src="/src/img/🦆 icon _nav arrow right_.svg" alt="" className="px-11"/>
      </NavLink >
    </div>
    </>
   );
}

export default LinkElement;