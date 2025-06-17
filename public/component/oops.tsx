import React from "react"
import { useNavigate } from "react-router-dom"

export const Oops=()=>{
    const navigate= useNavigate();
    function navigatetohome(){
        navigate("/home")
    }
return <>
<div className="h-dvh w-dvw">
    <div className="h-fit w-fit grid place-content-center   ``156">
        .
    <img  src="https://static.vecteezy.com/system/resources/thumbnails/010/886/262/small_2x/error-page-free-download-free-vector.jpg" alt="" />
      <button onClick={navigatetohome}>Go to home</button>
    </div>
    
    </div></>
}