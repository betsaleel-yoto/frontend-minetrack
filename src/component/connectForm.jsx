export default function ConnectForm(props) {
  return (
    <div
      className="relative h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('./src/img/prise-vue-au-grand-angle-machines-excavation-dans-lookout-jackerath-garzweiler-skywalk-allemagne.jpg')",
      }}
    >
         <h1 className="relative text-6xl font-semibold text-center font-raleway top-40">{props.h1}</h1>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="bg-white w-[40rem] h-[25rem] ml-[37rem] relative top-[15rem] p-8 rounded-md shadow-2xl">
        <div>
          <form action="" method="POST" className="flex-col mt-[2.5rem]">
            <div>
              <label htmlFor="username" className="font-semibold font-raleway text-[#808080]">username</label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your name"
                className="p-4 border-2 rounded w-[35rem]"
                onChange={props.change}
              />
            </div>

            <div className="flex-col pt-10">
              <label htmlFor="matriculationNumber" className="font-semibold font-raleway text-[#808080]">ID number</label>
              <br />
              <input
                type="text"
                id="matriculationNumber"
                name="matriculationNumber"
                placeholder="Enter your ID number"
                className="p-4 border-2 rounded w-[35rem]"
                onChange={props.change1}
              />
            </div><br />
            <div className="">
            <input type={props.checkbox} name="remember_me" id="" className="font-raleway"/>  <label htmlFor="checkbox" className="text-[#808080]  font-raleway">{props.remember}</label>
            </div>
            <button type="button" className="ml-[30rem] bg-[#4886FF] text-white w-20 h-10 rounded-[8px] hover:bg-[#39527B]  font-raleway font-semibold" onClick={props.click}>{props.button}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
