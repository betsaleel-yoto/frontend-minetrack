function SubTitleReports(props) {
  return ( 
    <>
    <div className=" w-[80%] pt-[1rem] pl-[1rem] pb-3 m-auto flex">
<p className="font-semibold font-raleway text-[#5D5D5D]">{props.text}</p>
<p  className="pl-24 font-semibold font-raleway text-[#5D5D5D]">Finished:{props.Date}</p>
<img src="/src/img/fleche_bas.svg" alt="" className="pl-[20%]"/>

    </div>
    </>
   );
}

export default SubTitleReports;