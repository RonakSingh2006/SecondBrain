import { Cross } from "../icons/Cross"
import { Button } from "./Button"

export function AddContent({open,onClose} : {open : boolean , onClose : ()=>void}){
  return<>
    {open && <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-black/85 flex justify-center items-center">
      <div className="bg-white w-80 h-80 rounded-md flex items-center flex-col gap-5 m-24">

        <div className="w-full flex justify-end p-2">
          <div className="cursor-pointer" onClick={onClose}>
            <Cross/>
          </div>
        </div>

        <Input placeholder="Title"/>
        <Input placeholder="Link"/>

        <Button variant="secondry" text="Submit" onClick={()=>{

        }}/>
      </div>
    </div>}
  </>
}

export function Input({placeholder} : {placeholder:string}){
  return <div className="border text-xl my-4 rounded">
    <input type="text" placeholder={placeholder} className="p-2"/>
  </div>
}