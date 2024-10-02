import { useState } from "react"
import { BottomWarning } from "../component/BottomWarning"
import { Button } from "../component/Button"
import { Heading } from "../component/Heading"
import { TextBox } from "../component/TextBox"
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Signup () {
  const Navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign Up"} />
        <TextBox onChange={e=>{setFirstName(e.target.value)}} placeholder="Fiyanshu" label={"First Name"} />
        <TextBox onChange={(e)=>{setLastName(e.target.value)}} placeholder="Gupta" label={"Last Name"} />
        <TextBox onChange={(e)=>{setusername(e.target.value)}} placeholder="Fiyanshu@gmail.com" label={"Email"} />
        <TextBox onChange={(e)=>{setPassword(e.target.value)}} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async()=> { 
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstname,
              lastname,
              password
            });
            localStorage.setItem("token", response.data.token);
            Navigate("/Dashboard")
    
    }} label={"Sign Up"} />
        </div>
        <BottomWarning text={"Don't have an account?"} linkText={"Sign in"} to={"/Signin"} />
      </div>
    </div>
  
  </div>
    
}
export default Signup;