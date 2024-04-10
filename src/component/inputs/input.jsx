function Input(props) {
  const classNames=`p-4 border-2 rounded ${props.classes}`
  return ( 
    <>
    <div className="pt-3 pb-5">
    <label htmlFor={props.htmlFor} className="font-semibold font-raleway text-[#808080]">{props.label}</label><br />
    <input type={props.type} name={props.name} id="" className={classNames} onChange={props.change}/>
    </div>
   
    </>
   );
}

export default Input;