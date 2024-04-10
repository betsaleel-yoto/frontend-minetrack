function ElementTableau1(props) {
  const classNames=`font-raleway ${props.cl} font-semibold w-[20%] m-auto`
  return (
    <>
      <div className="flex  w-[100%] pb-5 pt-2">
        <div className="flex w-[80%] m-auto">
          <p className="font-raleway text-[#5D5D5D] font-semibold w-[40%] m-auto">
            {props.text1}
          </p>
          <p className="font-raleway text-[#5D5D5D] font-semibold w-[40%] m-auto">
            {props.text2}
          </p>
        </div>

        <p className={classNames}>
          {props.text3}
        </p>
      </div>
    </>
  );
}

export default ElementTableau1;
