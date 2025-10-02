import { Cross, X } from "lucide-react"
import { Button } from "./button"
import Alert from "./notpop"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
const errorstyle = "text-[10px] text-red-400 flex"
type AlertType = 200 | 300 | 400 ;

interface AlertProps {
  type: AlertType;
 
  message: string;
  isVisible: boolean;
  onClose: () => void;
 
  
}
type boxprop={
  closer:()=>void,
selectcontent:()=>void}
export const Getlinkbox=({closer,selectcontent}:boxprop)=>{

    const [alert,setalert]=useState<AlertProps>({
    type:200 as AlertType,
    message:"",
    isVisible:false,
    onClose:()=>{}
  })
const[linkrecieved , setlinkrecived] = useState(false)
const [iscopy,setiscopy]=useState(false);
const [link,setlink]= useState("");

function copy(){
    navigator.clipboard.writeText(link)
    .then(()=>{
        setiscopy(true);
    })
  }
 async function getlink(){

    const token = localStorage.getItem("token")
    const response = await axios.get("http://localhost:3000/api/v1/getlink",{
        headers:{
       Authorization:`Bearer ${token}`
        }
    })
    if(response.status===200){
 setlink(response.data.link); 
   setalert(prev=>({...prev,
          type:200,
          message:response.data.message,
          isVisible:true
        }))
    }else if(response.status===400){
        setalert(prev=>({...prev,
          type:400,
          message:response.data.message,
          isVisible:true
        }))
    }
     
 }
  
  useEffect(()=>{
    getlink();
  },[])
    
  return(
    <>
     <Alert type={alert.type}
  message={alert.message}
  isVisible={alert.isVisible}
  onClose={()=>{setalert(prev=>({...prev,isvisible:false}))}}></Alert>
    <div className="">

        <div className="justify-end flex pr-2"> <X className="w-4" onClick={closer}></X></div>
        <div className="flex"><div className=" font-mono inline p-2 ">Share your brain to your friends </div> <div><Button 
        text="select_shareables"
        onclick={selectcontent}
        variant="primary"
        size="sm"
        starticon={null}></Button></div></div>
       <hr className="border-gray-400 border-t-2" />
       <div className="flex "><input type="text" value={link} readOnly className="w-full mr-2 rounded-sm border-1 mt-1 border-gray-400 pb-2 pl-2" /><div><Button
       text={iscopy?"copied!":"copy"}
       variant="primary"
       size="sm"
       starticon={null}
       onclick={copy}></Button></div></div>
    </div>
    </>
  )
}
