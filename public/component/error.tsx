import React, { useState } from "react"
import { Ban } from "lucide-react"
const errorbox="flex mt-20 rounded-lg bg-red-200 text-red-500 border-3 w-200 h-15 pt-3 flex place-content-start pl-10"
function Errorpopup(){
    const [error,seterror]=useState("testing error")
    return <>
       <div className=" w-dvw grid place-content-center ">
         <div className={errorbox}><Ban className="h-6 w-5 mr-2"></Ban> <div>{error}</div></div>
       </div>
    </>
}

function Formerror({etext:etext}){
  return <>
  <div className="text-red-500">{etext}</div></>
}