import HomeIcon from "../assets/icons/Exterior.svg"

export const BottomNav = () => {
  return (
    <nav className=" w-full fixed bottom-0 left-0 bg-[#1C1C1C] h-10">
      <ul>
        <li> <img src={HomeIcon} alt="" />  <p>Menu</p></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  );
};
