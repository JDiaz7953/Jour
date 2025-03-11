/* 
TODO:

-Verify ssers use a valid Email address
-Set password constraints ( 1 upppercase, 1 number, 1, special character)
-Update visual appeal of error when user uses invalid credential

tools:
Regex, throw error, ect

*/





import { useState } from "react";
import { supabase } from "../supabase-client";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  //Adds Authorized users to the database
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      console.log(error.message);
      return;
    }

    if (data) {
      console.log("User Created");
      const userId = data.user.id;

      //Updates users name in auth database
      const { error: updateError } = await supabase
        .from("auth.users")
        .update({ display_name: `${firstName} ${lastName}` })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating displaying name:", updateError.message);
      } else {
        console.log("Display name updated succesfully");
      }

      navigate("/login");
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
          <h2 className="p-5 text-3xl font-semibold text-slate-800 inline-block ">Sign Up</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex justify-around">
              <input
                className="p-2 border-1 rounded-lg "
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
              <input
                className="p-2 border-1 rounded-lg"
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </div>
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
                Create account
              </button>
            </div>
          </form>
          <span className="text-sm">have an account?</span> <Link className="text-sm underline text-slate-800 hover:text-amber-600 " to="/login"> login here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
