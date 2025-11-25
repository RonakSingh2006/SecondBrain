import { cloneElement, isValidElement, type ReactElement } from "react"
import type { IconProps } from "../icons/types";

interface ButtonProps{
  variant : "primary" | "secondry",
  size ?: "sm" | "md" | "lg",
  text : string,
  startIcon? : ReactElement<IconProps>,
  endIcon? : ReactElement<IconProps>,
  onClick : ()=>void
}

const vatiantStyle = {
  "primary" : "bg-purple-50 text-purple-100",
  "secondry" : "bg-purple-150 text-purple-200"
}

const vaiantSize = {
  "sm" : "px-2 py-1",
  "md" : "px-4 py-2",
  "lg" : "px-6 py-4"
}

export function Button(props :ButtonProps){
  const size = props.size || "md";

  const startIcon = props.startIcon && isValidElement(props.startIcon) ? cloneElement(props.startIcon,{size}) : null;
  const endIcon = props.endIcon && isValidElement(props.endIcon) ? cloneElement(props.endIcon,{size}) : null;

  return <button className={`${vatiantStyle[props.variant]} ${vaiantSize[size]} rounded-md font-semibold m-1 flex justify-between gap-2 items-center` } >
    {startIcon}
    {props.text}
    {endIcon}
    </button>
}