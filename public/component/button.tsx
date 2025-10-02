import { ReactElement } from "react";
import React from "react";
import "tailwindcss";


interface ButtonProps{
    
        variant:"primary"|"secondary"|"normal";
    
    size:"lg"|"sm"|"md",
    onclick:()=>void,
    text:string,
    starticon:ReactElement|null,
   
}

const variantstyle={
    "primary":
    "  rounded-t-md rounded-r-md rounded-b-md rounded-l-md bg-blue-500 text-white place-content-center hover:bg-blue-300 focus:outline-2 focus:outline-blue-300 focus:outline-offset-1",
    "secondary":"  rounded-t-md rounded-r-md rounded-b-md rounded-l-md bg-blue-200 text-purple place-content-center  focus:border-solid-blue-350",

    "normal":""
}
const sizestyle={
    "lg": "px-8 py-4 text-xl rounded-xl m-1",
    "md": "px-4 py-2 text-md rounded-md m-1",
    "sm": "px-2 py-1 text-sm rounded-sm m-1",
}
export const Button =(props:ButtonProps)=>{
  
            return(<button className={sizestyle[props.size] +""+variantstyle[props.variant] } onClick={props.onclick}>
                <div className="flex items-center">
                <span >
                    {props.starticon}
                </span> 
                <span>
                   {props.text}
                </span>
                
                </div>
            </button>   
            )
}


//button -variant="prim,sec"  size="md"  onclick={} text={}...