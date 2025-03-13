import { supabase } from "../supabase-client";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/account/update-password",
    });

    if (error) {
      setErrorMessage("Supabase Error Please try again");
    }

    if (data) {
      setMessage("Verification email sent!");
    }
  };

  return (
    <div>
      <div className="flex min-h-screen justify-center gap-3 items-center ">
        <div>
          <div className="w-110 ml-7 mb-45">
            <img
              className="p-3 mb-3 z-[-1] bottom-0 "
              src="src\assets\Jour-03.jpg"
              alt=""
            />
            <h3 className="text-3xl font- ml-8">
              Plan and share your next adventure with friends using Jour
            </h3>
          </div>
        </div>
        <div className="border-2 p-3 shadow-2xl rounded-3xl w-120 h-110 ml-7 justify-center align-middle">
          <h2 className="p-5 text-3xl font-semibold text-slate-800 inline-block ">
            Recover your password
          </h2>
          <form onSubmit={handlePasswordReset}>
            <div className="flex justify-around mt-4 ">
              <input
                className="p-2 border-1 rounded-lg w-112"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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

export default ForgotPassword;
