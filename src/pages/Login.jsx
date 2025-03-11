import { useState } from "react";
import { supabase } from "../supabase-client";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")

  //Handels users logging into their account
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
        setEmail("")
        setPassword("")
      setMessage(error.message);
      return;
    }

    if (data) {
      console.log("User Created");
      navigate('/dashboard')
    }
  };

  return (
    <div className=" flex min-h-screen justify-center">
      <div>
        <div className="flex justify-center ">
          <div className="w-120 ml-7">
          <img className="" src="src\assets\Jour-01.jpg" alt="" />
          </div>
        </div>
        <div className="border-2 p-3 shadow-2xl rounded-3xl w-120 h-100 ml-7 ">
          <h2 className="p-5 text-3xl font-semibold text-slate-800 inline-block ">Login</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
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
            <div className="flex w-100 justify-center mt-5 ml-4 mb-4">
              <button className="bg-slate-800 text-white hover:bg-amber-600   cursor-pointer  rounded-xl w-50 p-1" type="submit">
                Login
              </button>
            </div>
          </form>
          <span className="text-sm">no account?</span> <Link className="text-sm underline text-slate-800 hover:text-amber-600 " to="/"> Create one</Link>
          <br /><Link className="text-sm underline text-slate-800 hover:text-amber-600  " >forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
