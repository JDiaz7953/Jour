/* 
TODO:
- Test SignIn 
- Implement password Constraints to update password page 
*/

import { useState } from "react";
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";

const SignUp = () => {
  const passwordConstraints =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //Adds Authorized users to the database
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passwordConstraints.test(password)) {
      setErrorMessage(
        "Make sure your password includes  1 upppercase, 1 number, 1 special character"
      );
      setPassword("")
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:5173/login",
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
      // const { error: updateError } = await supabase
      //   .from("auth.users")
      //   .update({ display_name: `${firstName} ${lastName}` })
      //   .eq("id", userId);

      // if (updateError) {
      //   console.error("Error updating displaying name:", updateError.message);
      // } else {
      //   console.log("Display name updated succesfully");
      // }

      // setMessage(
      //   "Check your email to verify your account and start exploring Jour!"
      // );

      const { error: insertError } =  await supabase.from("users").insert({
        id: userId,
        name: firstName + " " + lastName,
        email: email
      })

      if (insertError) {
        console.error("Error inserting into users table:", insertError.message);
      } else {
        console.log("User added to users table!");
      }



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
            Sign Up
          </h2>
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
            {ErrorMessage && (
              <p className="text-red-500 p-1 mt-1 ">{ErrorMessage}</p>
            )}
            {message && <p className="text-slate-800 p-1 mt-1 ">{message}</p>}
            <div className="flex w-100 justify-center mt-5 ml-4 mb-4">
              <button
                className="bg-slate-800 text-white hover:bg-amber-600   cursor-pointer  rounded-xl w-50 p-1"
                type="submit"
              >
                Create account
              </button>
            </div>
          </form>
          <span className="text-sm">have an account?</span>{" "}
          <Link
            className="text-sm underline text-slate-800 hover:text-amber-600 "
            to="/login"
          >
            {" "}
            login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
