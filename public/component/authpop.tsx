import { Brain } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


const inputbox = "border border-gray-300 rounded-md w-full py-2 px-4 mt-3";
const buttonstyle = "bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 w-full transition duration-300";

export const Authpop = () => {
    const navigate = useNavigate();
  const [userinput, setuserinput] = useState("");
  const [passwordinput, setpassinput] = useState("");
  const [issignup, setissignup] = useState(false);

  async function authcall() {
    try {
      if (issignup) {
        const response = await axios.post("http://localhost:3000/api/v1/signup", {
          username: userinput,
          password: passwordinput,
        });
        console.log(response);
        if(response.status===200){
            navigate("/dashboard")
        }
         
      } else {
        const response = await axios.post("http://localhost:3000/api/v1/login", {
          username: userinput,
          password: passwordinput,
        });
        if(response.status===200){
           
            localStorage.setItem("token",`${response.headers['authorization']}`)
            navigate("/dashboard")
        }  

        
        
      }
    } catch (error) {
      console.error("Error during auth call:", error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-mono">
      {/* Left Section */}
      <div className="md:w-3/5 bg-gradient-to-br from-blue-300 to-blue-500 flex flex-col justify-center items-center p-8 text-white">
        <div className="flex items-center text-4xl mb-4">
          <Brain className="w-14 h-14 mr-3" />
          <span>SECOND BRAIN</span>
        </div>
        <p className="text-lg max-w-md text-center">
          Manage your tasks, thoughts, and ideas in one organized place.
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-2/5 flex justify-center items-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Username"
            className={inputbox}
            value={userinput}
            onChange={(e) => setuserinput(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={inputbox}
            value={passwordinput}
            onChange={(e) => setpassinput(e.target.value)}
          />
          <button onClick={authcall} className={`${buttonstyle} mt-6`}>
            {issignup ? "Sign Up" : "Login"}
          </button>
          <div className="text-center mt-4">
            {issignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setissignup(!issignup)}
              className="text-blue-600 underline"
            >
              {issignup ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
