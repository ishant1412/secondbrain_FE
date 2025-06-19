import { ReactElement, useEffect, useState } from "react"
import React from "react";
import { Card } from "./card";
import { Button } from "./button";
import { Form } from "./form";
import { Brain, Share2, Plus, Book, Twitter, FileText, Link2, Tags } from "lucide-react"
import axios from "axios"

interface layoutprops {
    cards: ReactElement[];
    pagename: "All notes" | "Tweets" | "Document" | "links" | "tags";
}

type Section = "All notes" | "Tweets" | "Document" | "links" | "tags";

interface CardProps {
    infotype: "tweet" | "video" | "list";
    title: string;
    image: string;
    Link:String;
    despcription: string;
    tags: string[];
    
  }

const sectionstyle = "pt-7 pl-3 font-mono text-gray-700"
const sectionboxstyle = "pt-2 rounded-md hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
const icoonstyle = "h-5 w-5 pr-2 text-blue-500"

const layout = {
    logo: <Brain className="h-10 w-10 text-blue-600" />,
    sections: ["All notes", "Tweets", "Document", "links", "tags"]as Section[]}

const icon: Record<Section, ReactElement> = {
    "All notes": <Book className={icoonstyle} />,
    "Tweets": <Twitter className={icoonstyle} />,
    "Document": <FileText className={icoonstyle} />,
    "links": <Link2 className={icoonstyle} />,
    "tags": <Tags className={icoonstyle} />
}
export const Dashboard = (props: layoutprops) => {
    const [showform , setshowform]=useState(false);
    const token = localStorage.getItem("token");
    const [content,setcontent] = useState<CardProps[]|any>();


       function formclosehandler(){
        setshowform(!showform)
       }   
        async function getcontent(){ 
            
        const response = await axios.get("http://localhost:3000/api/v1/getcontent",{
             headers:{
                "authorization":token
            }
            
        }) 
      
        setcontent(response.data.usercontentdata);

        }
     
         useEffect(()=>{
     getcontent();
         },[])
  
  

    return (<>
{showform && (
  <div className=" fixed inset-0 flex items-center transition-colors justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"></div>

    {/* Center the Form */}
    <div className="flex justify-center items-center min-h-screen relative z-10">
      <Form onClose={formclosehandler} />
    </div>
  </div>
)}


        
        <div className="flex flex-col md:flex-row min-h-screen">
            {}
           { /* Sidebar */}

         
            <div className="md:basis-[25%] w-full bg-white shadow-md">
                <div className="flex items-center justify-center md:justify-start p-4">
                    {layout.logo}
                    <span className="pl-3 text-[20px] font-mono font-bold text-blue-700 hidden md:block">SECOND BRAIN</span>
                </div>

                <div className={`${sectionstyle}`}>
                    {layout.sections.map((section) => (
                        <div key={section} className={`${sectionboxstyle}`}>
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

           
            <div className="md:basis-[75%] w-full bg-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b bg-white shadow-sm">
                    <div className="text-xl font-mono font-semibold text-gray-700">{props.pagename}</div>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                        <Button
                            variant="secondary"
                            text="Share"
                            starticon={<Share2 className="h-4" />}
                            onclick={() => { }}
                            size="sm"
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            text="Add content"
                            starticon={<Plus className="h-4" />}
                            onclick={()=>{setshowform(true)
                                console.log(showform);
                            }}
                        />
                    </div>
                </div>

                {/* Content placeholder */}
                <div className="p-6 flex">
                   { content?.map((card)=>{return  <Card 
        infotype={card.type}
            title={card.title}
    image={card.imglink}
    Link={card.link}
    despcription={card.description}
    tags={card.tags}></Card>})}
                </div>
            </div>
        </div>
  </> )
}
