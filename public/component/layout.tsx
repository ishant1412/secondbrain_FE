import { ReactElement, useEffect, useState } from "react"
import Alert from "./notpop";
import { Card } from "./card";
import { Button } from "./button";
import { Form } from "./form";
import { Brain, Share2, Plus, Book, Twitter ,Newspaper,Image,Instagram,Notebook,File,Link} from "lucide-react"
import axios from "axios"
import { Getlinkbox } from "./getlink";
import { ObjectId } from "mongoose";
import { useNavigate } from "react-router-dom";

const errorstyle = "text-[10px] text-red-400 flex"
type AlertType = 200 | 300 | 400 ;

interface AlertProps {
  type: AlertType;
 
  message: string;
  isVisible: boolean;
  onClose: () => void;
 
  
}

type Section = "All" | "tweet" | "video" | "notes"|"image"|"article"|"instapost"|"document"; 
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


const sectionstyle = "pt-7 pl-3 font-mono text-gray-700"
const sectionboxstyle = "   pt-2 rounded-md hover:bg-blue-100 focus:bg-blue-100  transition-colors duration-200 cursor-pointer  "
const icoonstyle = "h-5 w-5 pr-2 text-blue-500"

const layout = {
    logo: <Brain className="h-10 w-10 text-blue-600" />,
    sections: ["All" , "tweet" , "video" , "notes","image","article","instapost","document"] as Section[]
}

const icon: Record<Section, ReactElement> = {
     "All":<Book className={icoonstyle}></Book>,
     "tweet": <Twitter  className={icoonstyle}/>,
    "document": <File  className={icoonstyle}/>,
   "video": <Link  className={icoonstyle}/>,
    "notes":<Notebook className={icoonstyle}/>,
    'instapost':<Instagram className={icoonstyle} ></Instagram>,
    'image':<Image className={icoonstyle} ></Image>,
    'article':<Newspaper className={icoonstyle} ></Newspaper>
}
export const Dashboard = () => {
      const [alert,setalert]=useState<AlertProps>({
    type:200 as AlertType,
    message:"",
    isVisible:false,
    onClose:()=>{}
  })
    const [showgetlink, setshowgetlink] = useState(false);
    const [shareable_content, set_shareable_content] = useState<ObjectId[]>([]);
    const [selection, setselection] = useState(false);
    const [showform, setshowform] = useState(false);
    const navigate = useNavigate();
    const [content, setcontent] = useState<CardProps[] | any>();
    const [isdelete,setisdelete]=useState(false);
    const [type,settype]=useState("All");


   const token = localStorage.getItem("token");

   useEffect(()=>{
    if(!token){
        navigate("/");
    }
   })

function ondeletehandler(){
    setisdelete(!isdelete);
}

function closer(){
    setshowgetlink(false);
}
    function formclosehandler() {
        setshowform(!showform)
    }
    async function getcontent() {

        const response = await axios.get("http://localhost:3000/api/v1/getcontent", {
            headers: {
                "Authorization": `Bearer ${token}`,

            }

        });
         if(response.status===200){
      setcontent(response.data.usercontentdata);
        setalert(prev=>({...prev,
          type:200,
          message:response.data.message,
          isVisible:true
        }))
        
        }else if(response.status===300){
              setalert(prev=>({...prev,
          type:300,
          message:response.data.message,
          isVisible:true
        }))
        }
        else if(response.status===400){
              setalert(prev=>({...prev,
          type:400,
          message:response.data.message,
          isVisible:true
        }))
        }
   
       

        

    }

    useEffect(() => {
       
        getcontent();
         
    }, [showform,isdelete])

   function selectcontent(){
      setshowgetlink(false);
      setselection(true);

   }
   async function confirmhandler(){
        const response = await axios.put("http://localhost:3000/api/v1/setshareables",{
           ids:shareable_content
           
        },
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    
       if (response.status===200){
          setalert(prev=>({...prev,
          type:200,
          message:response.data.message,
          isVisible:true
        }))
    
setselection(false);
    setshowgetlink(true);
       }else if(response.status===400){
          setalert(prev=>({...prev,
          type:400,
          message:response.data.message,
          isVisible:true
        }))
       }
    
   }
   function oncheckhandler(id:any,check:any){
    if(check){
 set_shareable_content((prev)=>[...prev,id]); 
    }
    else{
        console.log("couldnt add the id ")
    }
     
   }

    return (<>

        {showform && (
            <div className=" isolation-auto fixed inset-0 flex items-center transition-colors justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300 ">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"></div>

                {/* Center the Form */}
                <div className="flex justify-center items-center min-h-screen relative z-10">
                    <Form onClose={formclosehandler} />
                </div>
            </div>
        )}
        {showgetlink && (<div className="fixed  inset-0 flex  justify-end ">
           
                    <div className="flex wrap p-2 rounded-md bg-white mt-20 h-fit pb-4 border-1 border-gray-300 mr-5 "> 
            <Getlinkbox
                selectcontent={selectcontent} closer={closer}></Getlinkbox>
                </div>
        </div>)}


        <div className="flex  flex-col h-screen md:flex-row min-h-screen">
             <Alert type={alert.type}
  message={alert.message}
  isVisible={alert.isVisible}
  onClose={()=>{setalert(prev=>({...prev,isVisible:false}))}}></Alert>
            { }
            { /* Sidebar */}


            <div className=" inset-0  md:basis-[20%]  w-full bg-white shadow-md ">
                <div className="flex items-center justify-center md:justify-start p-4">
                    {layout.logo}
                    <span className="  pl-3 text-[20px] font-mono font-bold text-blue-700 hidden md:block">SECOND BRAIN</span>
                </div>

                <div className={`${sectionstyle}`}>
                    {layout.sections.map((section) => (
                        <div key={section} tabIndex={0} className={`${sectionboxstyle}`} onClick={()=>{settype(section)}}>
                            <Button
                                variant="normal"
                                text={section}
                                starticon={icon[section]}
                                onclick={() => { }}
                                size="sm"
                            >

                            </Button>
                        </div>
                    ))}
                </div>
            </div>


            <div className="  md:basis-[80%] h-svh  w-full bg-gray-200">
                <div className="sticky top-0 bg-white">
                <div className="flex flex-col  sm:flex-row justify-between items-center p-4 border-b bg-white shadow-sm">
                    <div className="text-xl font-mono font-semibold text-gray-700"></div>
                    <div className="flex  gap-2 mt-3 sm:mt-0">
                        <Button
                            variant="secondary"
                            text="Share"
                            starticon={<Share2 className="h-4" />}
                            onclick={() => { setshowgetlink(true) }}
                            size="sm"
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            text="Add content"
                            starticon={<Plus className="h-4" />}
                            onclick={() => {
                                setshowform(true)
                                console.log(showform);
                            }}
                        />
                    </div>
                    </div>
                     {selection&& ( <div className="justify-end flex pr-4 ">
                        <Button
                    text="Confirm"
                    onclick={confirmhandler}
                    variant="primary"
                    size="md"
                    starticon={null}></Button> </div>)}
                </div>

                {/* Content placeholder */}
                
                <div className="overflow-y-auto pt-3 h-max  bg-gray-200 flex flex-wrap m-0 ">
                    {type==="All" && content?.map((card:CardProps) => {
                        return <Card
                        ondeletehandler={ondeletehandler}
                        shared={false}
                        selection={selection}
                            infotype={card.type}
                            title={card.title}
                            
                            Link={card.link}
                            description={card.description}
                            tags={card.tags}
                            id={card._id}
                            oncheckhandler={oncheckhandler}></Card>
                            
                    })}
                    {type!=="All" && content?.filter((card:CardProps)=>card.type===type).map((card:CardProps)=>{
                         return <Card
                        ondeletehandler={ondeletehandler}
                        shared={false}
                        selection={selection}
                            infotype={card.type}
                            title={card.title}
                            
                            Link={card.link}
                            description={card.description}
                            tags={card.tags}
                            id={card._id}
                            oncheckhandler={oncheckhandler}></Card>
                    })}
                </div>
            </div>
        </div>
    </>)
}
