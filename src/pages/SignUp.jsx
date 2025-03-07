import { useState } from "react";


const SignUp = () => {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        })

        if(error){
            console.log(error.message)
            return
        }

        if(data){
            console.log('User Created')
        }


      }
      

    return ( 
        <div>
            <h2>Sign Up</h2>
            <form >
                <input type="text" />
            </form>
        </div>
     );
}

export default SignUp;