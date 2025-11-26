import type { ReactElement } from "react";

export function SideBarItem(props : {icon : ReactElement , text : string}){
  return <div className="flex gap-5 m-10 cursor-pointer hover:bg-gray-200 p-2 rounded">
    {props.icon}
    <div>{props.text}</div>
  </div>
}