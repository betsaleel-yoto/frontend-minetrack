function ElementUser({ user, onClick, src, onDelete }) {
  return (
    <>
      <div className="flex border-b border-[#A6A6A6]  pt-3 w-[100%]">
        <div className="pl-3 pr-6 mt-1">
          <img src={src} alt="" className="w-[1.3rem]" />
        </div>
        <div className="w-[100%]">
          <p className="font-bold font-raleway text-[#565656]">{user.UserName}</p>
          <p className="font-normal font-raleway text-[#A6A6A6] text-[13px]">
            {user.UserTitle}
          </p>
        </div>
        <div className="flex mb-11 w-44">
          <button type="button" onClick={() => onClick(user)}>
            <img src="/src/img/edit.svg" alt="" className="px-6" />
          </button>
          <button type="button" onClick={() => onDelete(user)}>
            <img src="/src/img/Group-1.svg" alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ElementUser;
