import { Link} from 'react-router-dom'; // Importer Link et Navigate depuis react-router-dom

function RoleAuth() {

  return ( 
    <>
      <div className="relative h-screen bg-center bg-cover"
        style={{
          backgroundImage:
            "url('./src/img/gros-plan-excavatrice-chantier 1.jpg')",
        }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="bg-white w-[50rem] h-[25rem] ml-[30rem] relative top-[15rem] p-8 rounded-md shadow-2xl">
          <h1 className="font-raleway text-[#545454] font-bold text-[2rem] text-center">Mining Logistics Management</h1>
          <p className="text-center font-raleway text-[#565656] pt-16 text-[20px]">Welcome to our logistics management platform</p><br />
          <p className="text-center font-raleway text-[#565656] text-[20px]">Please select your role:</p>
         

         {/* flex */}
          <div className='flex'>
          <div className='ml-[5rem] bg-[#4886FF]  w-32 h-10 rounded-[8px] hover:bg-[#39527B] mt-12'>
          <Link to="/S_adminLogin" className="relative w-32 h-10 font-semibold text-white font-raleway left-[1.8rem] top-[5px]">S.Admin</Link>
          </div>

          <div className='ml-[5rem] bg-[#4886FF]  w-32 h-10 rounded-[8px] hover:bg-[#39527B] mt-12'>
          <Link to="/login" className="relative w-32 h-10 font-semibold text-white font-raleway left-[2.2rem] top-[5px]">Admin</Link>
          </div>

          <div className='ml-[5rem] bg-[#4886FF]  w-32 h-10 rounded-[8px] hover:bg-[#39527B] mt-12'>
          <Link to="/supplierlogin" className="relative w-32 h-10 font-semibold text-white font-raleway left-[1.8rem] top-[5px]">Supplier</Link>
          </div>
          </div>

          
          
         
          
          
        </div>
      </div>
    </>
  );
}

export default RoleAuth;
