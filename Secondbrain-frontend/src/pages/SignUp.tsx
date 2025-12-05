import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignUp(){

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/signup`,{
      username,password
    })

    if(usernameRef.current) usernameRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";

    alert("Signed Up");
    navigate('/signin')
  }


  return <div className="h-screen w-screen flex justify-center items-center bg-gray-200">

    <div className="h-80 w-80 bg-white rounded-md flex flex-col items-center pt-10 gap-10">

      <div className="flex flex-col gap-2">
        <Input placeholder="Username" ref={usernameRef}/>
        <Input placeholder="Password" ref={passwordRef}/>
      </div>

    <Button text="SignUp" variant="secondry" onClick={signup} className="w-72 justify-center"/>

    </div>

  </div>
}