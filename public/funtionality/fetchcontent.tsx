import axios from "axios";
export const FetchContent=(){
    
    axios.get("/api/v1/content")
}