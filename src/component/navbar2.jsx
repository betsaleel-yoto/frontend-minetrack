import LinkElement from "./linkElement";
function NavBar2() {
  return ( 
    <>
    <div className="bg-[#39527B] w-[20%] sticky top-0 h-[100vh]">
        <div className="flex border border-white pb-7 pt-7">
          <img src="" alt="" className="px-12"/>
          <h1 className="relative font-bold text-white font-raleway left-5">MineTrack</h1>
          <img src="/src/img/settings_.svg" alt="" className="relative px-11 left-24"/>
        </div>
        
        <h3 className="pb-12 pt-3 text-[#9E9E9E] font-semibold font-raleway ml-5">Main Navigation</h3>
        <LinkElement link='' src='/src/img/🦆 icon _dashboard_.svg' titleLink='Dashboard'/>
        <LinkElement link='' src='/src/img/🦆 icon _rocket_.svg' titleLink='ShipmentMaster'/>
        <LinkElement link='' src='/src/img/🦆 icon _iconoir_.svg' titleLink='StockManager'/>
        <LinkElement link='' src='/src/img/🦆 icon _truck length_.svg' titleLink='RoutePlanning'/>
        <LinkElement link='' src='/src/img/🦆 icon _green vehicle_.svg' titleLink='VehiculeManage'/>
        <LinkElement link='' src='/src/img/🦆 icon _send pounds_.svg' titleLink='SupplierManage'/>
        <LinkElement link='' src='/src/img/🦆 icon _reports_.svg' titleLink='Reports Analysis'/>
      </div>
    </>
   );
}

export default NavBar2;