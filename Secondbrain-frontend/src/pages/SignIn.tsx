import axios from "axios";
import { useRef } from "react";
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignIn(){

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function signin(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const output = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
      username,password
    })


    localStorage.setItem('token',output.data.token);

    if(usernameRef.current) usernameRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";

    alert(output.data.message);

    navigate('/dashboard');
  }

  return <div className="h-screen w-screen flex justify-center items-center bg-gray-200">

    <div className="h-80 w-80 bg-white rounded-md flex flex-col items-center pt-10 gap-10">

      <div className="flex flex-col gap-2">
        <Input placeholder="Username" ref={usernameRef}/>
        <Input placeholder="Password" ref={passwordRef}/>
      </div>

    <Button text="SignIn" variant="secondry" onClick={signin} className="w-72 justify-center"/>

    </div>

  </div>
}