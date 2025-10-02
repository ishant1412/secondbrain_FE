import { Brain, CircleSlash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./loading"
import React from "react";

import { useNavigate } from "react-router-dom";
import Alert from "./notpop";

const errorstyle = "text-[10px] text-red-400 flex"
const inputbox = "border border-gray-300 rounded-md w-full py-2 px-4 mt-3";
const buttonstyle = "bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 w-full transition duration-300";

type AlertType = 200 | 300 | 400 ;

interface AlertProps {
  type: AlertType;
 
  message: string;
  isvisible: boolean;
  onClose: () => void;
 
  
}
export const Authpop = () => {
  const [alert,setaler]=useState<AlertProps>({
    type:200 as AlertType,
    message:"",
    isvisible:false,
    onClose:()=>{}
  })
  const [errors, seterrors] = useState<any>({})
  const navigate = useNavigate();
  const [userinput, setuserinput] = useState("");
  const [passwordinput, setpassinput] = useState("");
  const [emailinput, setemailinput] = useState("")
  const [issignup, setissignup] = useState(false);
  const[loading, setloading]=useState(false);




  async function authcall() {
    // Clear previous errors
    seterrors({});
      setloading(true);

    try {
      if (issignup) {
      
        const response = await axios.post("http://localhost:3000/api/v1/signup", {
          username: userinput,
          password: passwordinput,
          email: emailinput
        });

        // Check if signup was successful
        if (response.status === 200 || response.status === 201) {

         
          if (response.data.message?.fieldErrors) {
            seterrors(response.data.message);

          } else {
             setaler(prev =>({...prev,
            type:200,
            message:response.data.message,
            isvisible:true
          })
          

          )
            // Signup successful - you might want to auto-login or show success message
            console.log("Signup successful");
            // Optionally switch to login mode
            setissignup(false);
            setloading(false);
          }
        }
      } else {
        // LOGIN LOGIC 
        const response = await axios.post("http://localhost:3000/api/v1/login", {
          username: userinput,
          password: passwordinput
        });

        // Check if login was successful
        if (response.status === 200) {
          // Check for field errors first
          setloading(false);
          if (response.data.message?.fieldErrors) {

          } else {
            // Login successful
            console.log("Login successful");

            // Store token - check both headers and response body
            const token = response.headers['authorization'] ||
              response.data.token ||
              response.data.accessToken;

            if (token) {
              localStorage.setItem("token", token);
              navigate("/dashboard");
            } else {
              console.error("No token received from server");
              setaler(prev =>({...prev,
            type:300,
            message:"no token recieved",
            isvisible:true
          })

          )
          setloading(false);
            }
          }
        } else {
           setaler(prev =>({...prev,
            type:400,
            message:"login failed",
            isvisible:true
          })

          )
          setloading(false);
        }
      }
    } catch (error) {
      console.error("Error during auth call:", error);
setloading(false);
      // Handle different types of errors
      //@ts-ignore
      if (error?.response) {
        // Server responded with error status
        //@ts-ignore
        const statusCode = error.response.status;
        //@ts-ignore
        const errorData = error.response.data;

        if (statusCode === 401) {
          setaler(prev =>({...prev,
            type:400,
            message:"invalid credentials",
            isvisible:true
          })

          )
        } else if (statusCode === 400 && errorData.message?.fieldErrors) {
          seterrors(errorData.message);
        } else {
           setaler(prev =>({...prev,
            type:300,
            message:"authentication failed",
            isvisible:true
          })

          )
        }
        //@ts-ignore
      } else if (error.request) {
        // Network error
         setaler(prev =>({...prev,
            type:400,
            message:"Network error - please check your connection",
            isvisible:true
          })

          )
      } else {
        // Other error
         setaler(prev =>({...prev,
            type:400,
            message:'An unexpected error occurred',
            isvisible:true
          })

          )
      }
    }
  }

  return (




  <>
  
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes wave1 {
          0%, 100% { transform: translateX(0%) rotate(0deg); }
          50% { transform: translateX(-25%) rotate(180deg); }
        }
        
        @keyframes wave2 {
          0%, 100% { transform: translateX(0%) rotate(0deg); }
          50% { transform: translateX(25%) rotate(-180deg); }
        }
        
        @keyframes wave3 {
          0%, 100% { transform: translateX(0%) rotate(0deg); }
          50% { transform: translateX(-15%) rotate(90deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .wave-animation-1 {
          position: absolute;
          top: 20%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          border-radius: 50%;
          animation: wave1 8s ease-in-out infinite;
        }
        
        .wave-animation-2 {
          position: absolute;
          top: 40%;
          right: -50%;
          width: 150%;
          height: 150%;
          background: linear-gradient(-45deg, transparent, rgba(147, 51, 234, 0.1), transparent);
          border-radius: 50%;
          animation: wave2 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .wave-animation-3 {
          position: absolute;
          bottom: 30%;
          left: -25%;
          width: 180%;
          height: 180%;
          background: linear-gradient(30deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          border-radius: 50%;
          animation: wave3 10s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>
      
      <div className="flex flex-col md:flex-row min-h-screen font-mono">
        <Alert 
          type={alert.type}
          message={alert.message}
          isVisible={alert.isvisible}
          onClose={() => setaler(prev => ({ ...prev, isvisible: false }))}
        />
        
        {/* Left Section with Animated Background */}
        <div className="md:w-3/5 relative flex flex-col justify-center items-center p-8 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600">
            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div 
              className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-300 bg-opacity-20 rounded-full animate-bounce" 
              style={{ animationDelay: '1s' }}
            ></div>
            <div 
              className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-blue-200 bg-opacity-15 rounded-full animate-pulse" 
              style={{ animationDelay: '2s' }}
            ></div>
            
            {/* Flowing Waves */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="wave-animation-1"></div>
                <div className="wave-animation-2"></div>
                <div className="wave-animation-3"></div>
              </div>
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="flex items-center text-4xl mb-4 drop-shadow-lg">
              <Brain className="w-14 h-14 mr-3 animate-pulse" />
              <span className="font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                SECOND BRAIN
              </span>
            </div>
            <p className="text-lg max-w-md text-center drop-shadow-md">
              Manage your tasks, thoughts, and ideas in one organized place.
            </p>
          </div>
          
          {/* Particle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
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
            
            {errors?.fieldErrors?.username && (
              <div className={errorstyle}>
                <CircleSlash className="size-2 mt-0.5" />
                {errors.fieldErrors.username[0]}
              </div>
            )}
            
            <input
              type="password"
              placeholder="Password"
              className={inputbox}
              value={passwordinput}
              onChange={(e) => setpassinput(e.target.value)}
            />
            
            {errors?.fieldErrors?.password && (
              <div className={errorstyle}>
                <CircleSlash className="size-2 mt-0.5" />
                {errors.fieldErrors.password[0]}
              </div>
            )}
            
            {issignup && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className={inputbox}
                  value={emailinput}
                  onChange={(e) => setemailinput(e.target.value)}
                />
                {errors?.fieldErrors?.email && (
                  <div className={errorstyle}>
                    <CircleSlash className="size-2 mt-0.5" />
                    {errors.fieldErrors.email[0]}
                  </div>
                )}
              </>
            )}
            
            <button onClick={authcall} className={`${buttonstyle} mt-6`}>
              {loading && <LoadingSpinner />}
              {!loading && (issignup ? "Sign Up" : "Login")}
            </button>
            
            <div className="text-center mt-4">
              {issignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setissignup(!issignup)}
                className="text-blue-600 underline hover:text-purple-600 transition-colors"
              >
                {issignup ? "Login" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
