import { Button } from "./components/Button"
import { Plus } from "./icons/Plus"
import { Share } from "./icons/Share"
import { Card } from "./components/Card"

function App() {

  return (
    <>
      <div className="flex justify-end gap-4">
        <Button startIcon={<Plus size="md"/>} variant="primary" size="md" text="Share Brain" onClick={()=>console.log("hello")}/>
        <Button startIcon={<Share size="md"/>} variant="secondry" size="md" text="Add Content" onClick={()=>console.log("hello")}/>
      </div>
      
      <div className="flex gap-4">
        <Card title="TUF Sheet" link="https://x.com/Ronak_Singh_20/status/1926171421312512075" type="tweet"/>
        <Card title="Open Source" link="https://www.youtube.com/watch?v=U2O0saEXhDg" type="youtube"/>
      </div>
    </>
  )
}

export default App
