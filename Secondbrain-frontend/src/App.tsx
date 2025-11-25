import { Button } from "./components/Button"
import { Plus } from "./icons/Plus"
import { Share } from "./icons/Share"
import { Card } from "./components/Card"

function App() {

  return (
    <>
      <div className="flex justify-end gap-4">
        <Button startIcon={<Share/>} variant="primary" size="md" text="Share Brain" onClick={()=>console.log("hello")}/>
        <Button startIcon={<Plus/>} variant="secondry" size="md" text="Add Content" onClick={()=>console.log("hello")}/>
      </div>
      
      <div className="flex gap-4">
        <Card title="Pakistan" link="https://x.com/virendersehwag/status/1921236534935666812" type="tweet"/>
        <Card title="n8n" link="https://www.youtube.com/watch?v=NYCUMKUBcXM" type="youtube"/>
      </div>
    </>
  )
}

export default App
