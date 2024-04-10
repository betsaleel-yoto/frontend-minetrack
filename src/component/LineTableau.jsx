function LineTableu(props) {
  return ( 
    <>
    <div className="flex w-[100%] border-b border-[#D2D2D2] pb-5 pt-2">
      <div className="flex w-[80%] m-auto">
      <p className="font-raleway text-[#39527B] font-semibold w-[40%] m-auto">{props.text1}</p>
      <p className="font-raleway text-[#39527B] font-semibold w-[40%] m-auto">{props.text2}</p>
      </div>
      <p className="font-raleway text-[#39527B] font-semibold w-[20%] m-auto">{props.text3}</p>
    </div>
    </>
   );
}

export default LineTableu;