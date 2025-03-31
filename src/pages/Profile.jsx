import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

//TO DO: -Make Sure to Understand the code currently developed, -Make it so when a user adds a trip its updated instantly, -User can remove trips
// code to review Supabase, modal code

const Profile = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      //error handeling

      //getting users data
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("user_id", user.id);

      setTrips(data);
    };
    fetchTrips();
  }, []);

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
        <Navbar className={"shadow-2xl"} />
        <div className="w-200">
          <div className="flex p-10 justify-between items-center">
            <div className="flex ">
            <img src="src\assets\icons8-airplane-48.png" alt="" />
            <h1 className="text-2xl font-semibold ml-10">Your Future Adventures</h1>
            </div>
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
          {!trips ? (
            <p>Add Your Next Adventure!</p>
          ) : (
            <ul className="ml-9">
              {trips.map((trip) => (
                <li
                  key={trip.id}
                  className="mb-2 bg-white border p-10 w-110 h-30 shadow-lg rounded-2xl"
                >
                  <strong>{trip.title}</strong> :<p>{trip.description}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="p-10"></div>
        </div>
      </main>
    </>
  );
};

export default Profile;
