import { useEffect } from "react";
import { SideMenu } from "../../Components/SideMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NutriProfile = ({ userInfo }) => {
  console.log(userInfo);
  
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <div className="min-h-full flex w-full justify-start flex-col px-6 pt-32 pb-10 bg-slate-100">
        <div className="w-full py-20 flex bg-gray-200 relative h-full justify-center items-start">
          <div className="absolute top-[-10%] left-[50%] transform -translate-x-1/2">
            <AccountCircleIcon
              className="text-gray-400"
              sx={{ width: "140px", height: "140px" }}
            />
          </div>
          {userInfo && (
            <div className="text-center">
              <h1 className="text-4xl">{userInfo.name}</h1>
              <p className="text-gray-600 text-base">{userInfo.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NutriProfile;
