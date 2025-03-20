import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  //Allows users to log out of their account
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Opps! their seems to be an issue logging out try again!");
    }
    navigate("/login");
  };

  return (
    <>
      <div className=" flex flex-row">


        <div className="flex flex-col h-[100rem] w-[25rem] bg-white border-r-1 border-black shadow-4xl ">
        {/* <button
          className="bg-blue-600 rounded-2xl h-[10rem] "
          onClick={handleSignOut}
        >
          Sign out
        </button> */}
        <div className="flex">
          <img src="src/assets/Jour-03.jpg" alt="" />
        </div>
        <div className="p-2 text-lg mt-10 ml-5">
          Home
        </div>
        <div className="p-2 text-lg ml-5">
          Add to Bucket List
        </div>
        <div className="p-2 text-lg ml-5">
          Plan Your Next Trip
        </div>
        <div className="p-2 text-lg ml-5">
          Profile
        </div>
      </div>
      dfiuhd
      </div>
  
    </>
  );
};

export default Profile;
