function Select(props) {
  return ( 
    <>
    <div className="pt-3 pb-5">
    <label htmlFor={props.htmlFor} className="font-semibold font-raleway text-[#808080]">{props.label}</label><br />
    <select name={props.name} id="" onChange={props.change}>
      <option value={props.option1}>{props.option1}</option>
      <option value={props.option2}>{props.option2}</option>
      <option value={props.option3}>{props.option3}</option>
    </select>
    </div>
   
    </>
   );
}

export default Select;