import { useState } from 'react'

import {Errorpopup}from "../public/component/error";
//import {UseE} from "../public/component/practice"
import {Main} from "../public/component/practice"
import {Todo} from "../public/component/todo";
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import {Oops} from "../public/component/oops";
import {Authpop} from"../public/component/authpop";
import { Dashboard } from '../public/component/layout';

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
  <Route path="/" element={<Authpop />} />
  <Route path="*" element={<Oops />} />
  <Route path="/dashboard" element={<Dashboard/>} />
  <Route path="/share/:userI" element={<div />} />
</Routes>

      
      </BrowserRouter>
    </>   
  )
}

export default App
