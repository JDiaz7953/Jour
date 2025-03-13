import { supabase } from "../../supabase-client";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const UpdatePassword = () => {
    const passwordConstraints =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    if (!passwordConstraints.test(password)) {
        setErrorMessage(
          "Make sure your password includes  1 upppercase, 1 number, 1 special character "
        );
        setPassword("")
        return;
      }

    const { error, data } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setErrorMessage("Error from supabase try again!");
      setPassword("")
    }

    if (data) {
      setMessage("Password Updated! redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen justify-center gap-3 items-center ">
        <div>
          <div className="w-110 ml-7 mb-45">
            <img
              className="p-3 mb-3 z-[-1] bottom-0 "
              src="..\src\assets\Jour-03.jpg"
              alt=""
            />
            <h3 className="text-3xl font- ml-8">
              Plan and share your next adventure with friends using Jour
            </h3>
          </div>
        </div>
        <div className="border-2 p-3 shadow-2xl rounded-3xl w-120 h-110 ml-7 justify-center align-middle">
          <h2 className="p-5 text-3xl font-semibold text-slate-800 inline-block ">
            Update your password
          </h2>
          <form onSubmit={handleUpdatePassword}>
            <div className="flex justify-around mt-4">
              <input
                className="p-2 border-1 rounded-lg w-112 "
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            {ErrorMessage && (
              <p className="text-red-500 p-1 mt-1 ">{ErrorMessage}</p>
            )}
            {message && <p className="text-slate-800 p-1 mt-1 ">{message}</p>}
            <div className="flex w-100 justify-center mt-5 ml-4 mb-4">
              <button
                className="bg-slate-800 text-white hover:bg-amber-600   cursor-pointer  rounded-xl w-50 p-1"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
