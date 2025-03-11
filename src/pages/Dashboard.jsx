import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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
    <div>
      <button className="bg-blue-600 rounded-2xl " onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
