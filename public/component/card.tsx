import React, { ReactElement } from "react"
import {File,Twitter,Link,Share, Delete, Trash, CrossIcon, Circle, CircleX} from "lucide-react"
interface CardProps {
    infotype: "tweet" | "video" | "list";
    title: string;
    image: string;
    Link:String;
    despcription: string;
    tags: string[];
    
  }
  
  // Updated styles
  const cardDesign = "bg-white p-4 w-64 rounded-md border-2 border-gray-300 shadow-sm b transition-transform duration-300 ease-in-out transform hover:scale-110 ml-3 mb-3";
  const topBarStyle = "flex justify-between items-center mb-2";
  const tagStyle = "inline-block rounded-lg bg-blue-100 text-blue-700 px-2 py-1 mr-2 mb-2 text-xs border-1";
  const imageStyle = "h-28 w-full object-cover rounded-md mb-2";
  const iconStyle = "w-5 h-5 mr-1 transition-transform duration-300 ease-in-out transform rounded-md hover:scale-110 hover:bg-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400 ";
  const textStyle = "font-semibold text-sm";
  
  const icon = {
    tweet: <Twitter className={iconStyle} />,
    list: <File className={iconStyle} />,
    video: <Link className={iconStyle} />
  };
  
  export const Card = (props: CardProps) => {
   

    return (
      <div className={cardDesign}>
        {/* Top bar */}
        <div className={topBarStyle}>
          <div className="flex items-center">
            {icon[props.infotype]}
            <span className={textStyle}>{props.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Share className={iconStyle} />
            <Trash className={iconStyle} />
          </div>
        </div>
  
        {/* Image */}
        <div>
          <img src={props.image} className={imageStyle} alt="Card Visual" />
        </div>
  
        {/* Description */}
        <div className="text-gray-600 text-sm mb-2">
          {props.despcription}
        </div>
  
        {/* Tags */}
        <div className="flex flex-wrap">
          {props.tags.map((tag, index) => (
            <span key={index} className={tagStyle}>
             <div> {tag} </div>
            </span>
          ))}
        </div>
      </div>
    );
  };
  