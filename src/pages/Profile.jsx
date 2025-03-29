import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useState } from "react";
import Modal from "../components/Modal";

const Profile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
      <main className="flex w-screen h-screen">
        <div className="w-200">
          <div className="flex p-10 justify-between items-center">
            <h1 className="text-2xl font-semibold">Your Future Adventures</h1>
            <Modal open={open} handleClose={() => setOpen(false)} />
            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center bg-slate-900 rounded-md hover:bg-sky-900 w-8 h-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="p-10">Add your dream location Here!</div>
          {/* <div>loop through the database displaying trips from the database</div> */}
          <div className="p-10">
            <h2 className="text-xl font-semibold">Add a New Place:</h2>
            <div className="flex shadow-2xl bg-white">
              <input
                type="text"
                placeholder="Add a New Place"
                className=" shadow-sm user-select:none focus:outline-none w-100 h-7 p-3 border-gray-300 border"
              />
              <button className="text-white bg-slate-900 hover:bg-sky-900 h-7 w-15 shadow-sm">
                Add
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
