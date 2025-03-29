import { supabase } from "../supabase-client";
import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

const Modal = ({ open, handleClose }) => {
  const [dest, setDest] = useState("");
  const [desc, setDesc] = useState("");
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      setUser(data?.user)
      if (error) console.error("Error fetching user:", error)
    }
    getUser()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.from("trips").insert([{
      user_id: user.id,
      title: dest,
      description: desc
    }]);
    console.log(dest)

    if (data) {
      setDest("");
      setDesc("");
      return;
    }

    if (error) {
      console.log("error");
      return;
    }
  };

  return (
    <>
      {/* handle background transparency */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          open ? "visible bg-black/20" : "invisible"
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all ${
            open ? "scale-150 opacity-100" : "scale-125 opacity-0"
          } `}
        >
          <form>
            <h2 className="text-xl mb-3">Add New Place</h2>
            <p className="p-1 text-xs">Place Name</p>
            <input
              onChange={(e) => {
                setDest(e.target.value);
              }}
              className="border-1 p-0.5 w-70 mb-3 rounded"
              type="text"
              placeholder="Cape Town, South Africa"
            />
            <p className="p-1 text-xs">Description here (optional)</p>
            <input
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              className="border-1 p-0.5 w-70 rounded"
              type="text"
              placeholder="Go for a run ect."
            />
            <button onClick={handleSubmit}>button</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Modal;
