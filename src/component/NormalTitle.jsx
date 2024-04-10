function NormalTitle(props) {
  return ( 
    <>
    <div className=" w-[80%] pt-[1rem] pl-[1rem] pb-3 m-auto flex border-b border-[#AEAEAE]">
      <p className="font-semibold font-raleway text-[#5D5D5D] w-[25%] text-center">{props.text1}</p>
      <p className="font-semibold font-raleway text-[#5D5D5D] w-[25%] text-center">{props.text2}</p>
      <p className="font-semibold font-raleway text-[#5D5D5D] w-[25%] text-center">{props.text3}</p>
      <p className="font-semibold font-raleway text-[#5D5D5D] w-[25%] text-center">{props.text4}</p>
     </div>
    </>
   );
}

export default NormalTitle;