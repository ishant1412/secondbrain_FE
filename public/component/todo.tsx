import React, { useState } from "react";
import { Trash } from "lucide-react"
interface proptype {
  prop: string[];
  settodo: React.Dispatch<React.SetStateAction<string[]>>;
}

const Todos = ({ prop, settodo }: proptype) => {


  const todoelement = prop.map((todo, index) => {
    return <><div key={index} >{todo} <button onClick={() => {
      settodo(prop.filter((item) => item != todo))
    }}><Trash></Trash></button></div></>
  })
  return <>
    <div>
      {todoelement}
    </div>
  </>
}


export const Todo = () => {
  const [todos, setodos] = useState<string[]>([]);
  const [input, setinput] = useState("");
  function Add() {
    setodos([...todos, input]);
    setinput("");
  }
  function inp(e: React.ChangeEvent<HTMLInputElement>) {
    setinput(e.target.value);
  }

  return <>
    <div>
      TODOS
      <input type="text" value={input} onChange={inp} />
      <button onClick={Add} >Add</button>
      <Todos prop={todos} settodo={setodos} ></Todos>


    </div>
  </>
}