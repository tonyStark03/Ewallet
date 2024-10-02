import {Heading} from "../component/Heading"
import {TextBox} from "../component/TextBox"
import {Button} from "../component/Button"
import {BottomWarning} from "../component/BottomWarning"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signin(){
  const [username, setusername] = useState(""); 
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <TextBox onChange={(e)=>{
          setusername(e.target.value)
        }} placeholder="Fiyanshu@gmail.com" label={"Email"} />
        <TextBox onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={()=>{
            axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              password
            }).then(response=>{
              localStorage.setItem("token", response.data.token);
              Navigate("/Dashboard")
            }).catch(e=>{
              alert("Invalid username or password")
            })
          }} label={"Sign in"} />
        </div>
        <BottomWarning text={"Don't have an account?"} linkText={"Sign up"} to={"/Signup"} />
      </div>
    </div>
  </div>
}
export default Signin
