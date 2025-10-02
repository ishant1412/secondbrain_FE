import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { Card } from "./card";
import { ObjectId } from "mongoose";
interface CardProps {
    type:  "tweet" | "video" | "notes"|"image"|"article"|"instapost"|"document" ;
    title: string;
    link: string;
   description: string;
    tags: string[];
    shareable:boolean;
    userId:ObjectId;
    _id:ObjectId;

}
export  const Shareview=()=>{

  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const  id:any =   queryparams.get("u_id");
  
const [user,setuser]=useState("");
const [content,setcontent] = useState<CardProps[]>()
async function getsharecontent(){
  
  const response = await axios.get("http://localhost:3000/api/v1/sharecontent",{
    headers:{
      'u_id':id
    }
  })
  const res_content = response.data.shared_content;
    setcontent(res_content)
    setuser(response.data.username);
}
useEffect(()=>{
   getsharecontent();
},[])
    
    
     
   
 return <div className="w-full h-full p-7">
    <div className="">
    <div className="mb-3 pl-1 text-[20px] font-mono"> {user} have shared thier second brain contents to you   </div>
    <div className=" bg-gray-300 h-dvh pt-5 ">
  <div className=" rounded-md w-full justify-start  overflow-y-auto flex flex-wrap">
    
                        {content?.map((card:CardProps,index) => {
                            return <Card
                            ondeletehandler={()=>{}}
                            oncheckhandler={()=>{}}
                            id={card._id}
                               selection={undefined}
                                infotype={card.type}
                                title={card.title}
                                shared={true}
                                Link={card.link}
                                description={card.description}
                                tags={card.tags}
                                key={index}
                                ></Card>
                                
                        })}
  </div>
  </div>
  </div>
 </div>
}