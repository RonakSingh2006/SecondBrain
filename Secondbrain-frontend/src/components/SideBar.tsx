import { Brain } from "../icons/Brain";
import { Twitter } from "../icons/Twitter";
import { YouTube } from "../icons/Youtube";
import { SideBarItem } from "./SideBarItem";
import { Document } from "../icons/Document";
import { Link } from "../icons/Link";
import { HashTag } from "../icons/HashTag";

export function SideBar(){
  return <div className="fixed h-screen w-72 border-r-2 border-gray-200 top-0">
      <div className="flex items-center text-2xl text-purple-150 mx-5 my-5 font-bold gap-5">
        <Brain/>
        <div>Second Brain</div>
      </div>

      <div>
        <SideBarItem icon={<Twitter/>} text="Tweets"/>
        <SideBarItem icon={<YouTube/>} text="Videos"/>
        <SideBarItem icon={<Document/>} text="Documents"/>
        <SideBarItem icon={<Link/>} text="Links"/>
        <SideBarItem icon={<HashTag/>} text="Tags"/>
      </div>
  </div>
}