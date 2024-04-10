function IconsEditDelete(props) {
  return ( 
    <>
    <div className="flex pl-4">
      <button type="button" onClick={props.onClick1}><img src="src/img/edit.svg" alt="" className="mr-[1rem]"/></button>
    <button type="button" onClick={props.onClick2}><img src="/src/img/Group-1.svg" alt="" /></button>
    </div>

    </>
   );
}

export default IconsEditDelete;