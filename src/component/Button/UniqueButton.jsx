function UniqueButton(props) {
  return ( 
    <>
    <button type="button" className="bg-[#60C84C] text-white w-10 h-5 rounded-[8px] hover:bg-[#89e178]  font-raleway font-semibold text-[10px]"  onClick={props.click}>{props.text}</button>
    </>
   );
}

export default UniqueButton;