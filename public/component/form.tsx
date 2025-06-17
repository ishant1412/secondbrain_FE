import { useState } from "react";
  import {X} from "lucide-react";
import React from "react";
const crossstyle="h-3 pt-1 "
const tagstyle="bg-blue-200 m-1 rounded-md  place-content-center text-gray-500 text-[13px]"   
export const Form =()=>{
    const [show,setshow]= useState(true);
    const [tags,settags]=useState<string[]>([]);
    const [input,settaginput]= useState("");
    
    function taginput(e){
          settaginput(e.target.value);
    }
     
     function Addtag(){
      settags([...tags,input]);
      settaginput("");
      
     }
    return <>
    <div className="h-dvh w-dvw grid place-content-center font-mono ">
      <div className="h-fit pb-2 w-90 bg-white justify-center pl-2 rounded border-3 border-gray-300 " >
        <div className="flex justify-center font-mono pt-3 font-bold">Add Content</div>
        <div className="flex pr-2 pb-2" ><div className="pr-2">Title</div><input type="text" placeholder="enter title" className="bg-white rounded-md border-2 border-black font-mono text-[15px] w-dvw" /></div>
        <div className="pt-2">Type: <select name="types" id=""  className="bg-white rounded border-2 border-gray w-[83%]">
            <option value="tweet">tweet</option>
            <option value="video">video</option>
            <option value="list">list</option></select></div>
        <div className="flex pd-2 pt-3"> <div> Image Link: </div> <div className="pl-2"><input type="text" placeholder="paste link here" className="bg-white rounded border-2  border-gray w-[128%] h-[100%]" /></div></div>
        <div className="pt-3 flex"><div>Description:</div> <div><input type="text" placeholder="enter the description here"  className="bg-white rounded-md border-2 border-black font-mono text-[15px] w-[140%] h-[350%] "/></div> </div>  
        <div className="pt-18"><input type="text" value={input} onChange={taginput} placeholder="add tags" className="bg-white rounded-md border-2 border-black-300 font-mono text-[15px] w-[85%]"  /> <button className="bg-blue-500 rounded w-9 text-white " onClick={Addtag}>Add</button></div>
           <div className="flex flex-wrap">{tags.map((tag)=>{return <> <div className={tagstyle}>{tag} <button><X className={crossstyle}></X></button></div></>})}</div>
          <div className="pt-2"><button className="w-[96%] bg-blue-400 text-white rounded">submit</button></div>
      </div>
      </div>
    </> 
}