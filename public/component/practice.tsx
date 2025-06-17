import { ReactNode } from "react";
 // export const UseE=()=>{
//     const[value,setvalue]=useState(0);
// function rend(){
//     const key =setInterval(()=>{
//      setvalue(value=>value+1);
//     },2000)
//     return ()=>{
//      clearInterval(key);
//      }
// }
// useEffect(rend,[value])

//     return <>
//     <div className="bg-blue-300">
//          {value} </div>
//         </>
// }
export const Main=()=>{
    return <>
    <Parent >
        {adiv}
    </Parent>
    </>
}
type Parentprop={
    children:ReactNode;
}
const adiv=<div> yyoyoyoyoy</div>;

 const Parent=({children}:Parentprop)=>{
    return <>
    <div className="bg-red-400">hyyy there this is div
          this is the parent div which gets passing
          <div>
            {children}
          </div>
        </div></>
}

