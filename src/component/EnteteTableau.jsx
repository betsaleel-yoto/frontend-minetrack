function EnteteTableau(props) {
  const classNames=`text-[#39527B] font-raleway font-semibold rounded-t-lg bg-[#D9D9D9] w-[100%] pt-[1rem] pl-[1rem] pb-3`
  return ( 
    <>
    <h2 className={classNames}>
    {props.text}
    </h2>
    </>
   );
}

export default EnteteTableau;