import { BrowserRouter , Routes , Route} from "react-router-dom"
import DashBoard from "./pages/Dashboard"
import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"

function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
    
    </BrowserRouter>
  </>
}

export default App
