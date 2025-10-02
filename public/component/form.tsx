import { useState } from "react";
import { WandSparkles, X , CircleSlash} from "lucide-react";
import React from "react";
import { Button } from "./button";
import axios from "axios";
import Alert from "./notpop";
const crossstyle = "h-3 pt-1 ";
const tagstyle = "bg-blue-200 m-1 rounded-md place-content-center text-gray-500 text-[13px]";
const errorstyle = "text-[10px] text-red-400 flex"

type proptype = {
  onClose: () => void
}
type AlertType = 200 | 300 | 400 ;

interface AlertProps {
  type: AlertType;
 
  message: string;
  isVisible: boolean;
  onClose: () => void;
 
  
}
export const Form = ({ onClose }: proptype) => {

    const [alert,setalert]=useState<AlertProps>({
      type:200 as AlertType,
      message:"",
      isVisible:false,
      onClose:()=>{}
    })
    const [FErrors,setFErrors]=useState<any>()
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const [input, setTagInput] = useState("");
  const [loading,setloading]= useState(false);






  const btnstyle = "border h-10 rounded border-black w-44 ml-1 flex bg-blue-400 text-white";

  function addTag() {
    if (input.trim() !== "") {
      setTags([...tags, input.trim()]);
      setTagInput("");
    }
  }

  async function sendContent() {
    setloading(true);
    try {
      
      const token = localStorage.getItem("token");
      if (!token) {

        setalert(prev=>({...prev,
          type:300,
          message:"token not recieved",
          isVisible:true
        }))
        return
      }
      console.log("Data being sent:", {
        link, type, title, description, tags
      });
     
      const response = await axios.post(
        "http://localhost:3000/api/v1/contentpost",
        {
          link: link,
          type: type,
          title: title,
          description: description,
          tags: tags,
        }, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,

        }
      }


      );
      if(response.status===200){
         setalert(prev=>({...prev,
          type:200,
          message:response.data.message,
          isVisible:true
        }))
      }
      else if(response.status===300){
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
        if(response.data.message?.fieldErrors){
          setFErrors(response.data.message?.fieldErrors)
        }
      }
     
      onClose();
    } catch (err) {
       setalert(prev=>({...prev,
          type:300,
          message:"couldnt submit the content",
          isVisible:true
        }))
    }
  }

  return (
    <div className={"border-2 border-gray-300 p-2 bg-white rounded-2xl w-140 isolate"}>
       <Alert type={alert.type}
  message={alert.message}
  isVisible={alert.isVisible}
  onClose={()=>{setalert(prev=>({...prev,isVisible:false}))}}></Alert>
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-xl">Add Content</div>
        <button onClick={onClose}>
          <X className="h-5 w-5 text-gray-700 hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
          {FErrors?.fieldErrors?.title && (<>
            <div className={errorstyle}><CircleSlash className="size-2 mt-0.5"> </CircleSlash>{FErrors.fieldErrors.title[0]}</div></>)}
      </div>

      <div className="mb-2">
        <select
          className="w-full border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="tweet">Tweet</option>
          <option value="video">Video</option>
          <option value="notes">Notes</option>
          <option value="image">Image</option>
          <option value="article">Article</option>
          <option value="instapost">Insta Post</option>
        </select>
      </div>

      <div className="mb-2 flex">


        {type !== "notes" && (
          <>
          <input
            type="text"
            placeholder="Paste link here"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border p-2 rounded"
          />
            {FErrors?.fieldErrors?.link && (<>
            <div className={errorstyle}><CircleSlash className="size-2 mt-0.5"> </CircleSlash>{FErrors.fieldErrors.link[0]}</div></>)}
          </>
        )}
      </div>

      <div className="mb-2">
        <textarea
          className="border p-2 rounded w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={type === "notes" ? "text here.." : "description here.."}
        ></textarea>
      </div>

      <div className="mb-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Add tags"
          className="w-full border p-2 rounded mr-2"
        />
        <button onClick={addTag} className="bg-blue-500 text-white px-3 py-2 rounded">
          Add
        </button>
      </div>

      <div className="flex flex-wrap mb-3">
        {tags.map((tag, index) => (
          <div key={index} className={tagstyle}>
            {tag}{" "}
            <button onClick={() => setTags(tags.filter((t) => t !== tag))}>
              <X className={crossstyle} />
            </button>
          </div>
        ))}
      </div>

      <button
        className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
        onClick={sendContent}
      >
        Submit
      </button>
    </div>
  );
};
