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
      <main className="flex w-screen h-screen justify-center">
        <div className="w-225 ">
          <nav className="w-auto mb-30">
            <ul className="m-4 flex justify-between ">
              <div>
                <button className="bg-slate-900 text-white rounded-2xl p-2 justify-center mt-2 " >
                  add to bucket list
                </button>
              </div>
              <li>
                <button onClick={handleSignOut} className="bg-slate-900 text-white rounded-2xl p-2 justify-center mt-2 ">
                  sign Out
                </button>
              </li>
            </ul>
          </nav>
          <article>
            <h2 className="text-3xl font-semibold ">Current Bucket List</h2>
          </article>
        </div>
      </main>
    </>
  );
};

export default Profile;
