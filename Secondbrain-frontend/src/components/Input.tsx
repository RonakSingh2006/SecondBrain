import type { Ref } from "react"

interface InputProps{
  placeholder : string,
  ref ?: Ref<HTMLInputElement>
}

export function Input({placeholder , ref} : InputProps){
  return <div className="border text-xl my-4 rounded">
    <input type="text" placeholder={placeholder} className="p-2" ref={ref}/>
  </div>
}