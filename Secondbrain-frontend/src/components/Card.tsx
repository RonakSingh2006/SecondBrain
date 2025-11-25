import { Share } from "../icons/Share"

interface CardProps{
  title : string,
  type : "youtube" | "tweet",
  link : string
}

export function Card(props :CardProps){
  return <div className="border border-gray-200 shadow-md w-72 min-h-48 rounded-md">
    <div className="flex justify-between m-3 items-center">
      <div className="flex items-center gap-3">
        <Share/>
        {props.title}
      </div>
      <div className="flex items-center gap-3">
        <Share/>
        <Share/>
      </div>
    </div>

    <div className="p-2">
      
      {props.type === "tweet" && <blockquote className="twitter-tweet">
        <a href={props.link.replace("x","twitter")}></a> 
      </blockquote>}

      {props.type === "youtube" && <iframe className="w-full" src={props.link.replace("watch?v=","embed/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

    </div>
  </div>
}