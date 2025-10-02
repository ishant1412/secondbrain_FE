
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import {Oops} from "../public/component/oops";
import {Authpop} from"../public/component/authpop";
import { Dashboard } from '../public/component/layout';
import {Shareview} from "../public/component/shareview"
import SecondBrainLanding from "../public/component/landingpage"
function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
  <Route path="/" element={<SecondBrainLanding/>} />
  <Route path='/signin' element={<Authpop/>}/>
  <Route path="*" element={<Oops />} />
  <Route path="/dashboard" element={<Dashboard/>} />
  <Route path="/sharecontent" element={<Shareview></Shareview>} />
</Routes>

      
      </BrowserRouter>
    </>   
  )
}

export default App
