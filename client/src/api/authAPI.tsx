import { UserLogin } from "../interfaces/UserLogin";
import axios from "axios";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try{
    const response = await axios.post('/auth/login', userInfo, {
      headers:{
        'Content-Type': 'application/json'
      }
    });
    return response.data; //send post request to login route and if successful return data
  } catch (error: any){ {
    if (error.response){
      return error.response.data; //if error return response data
    } else {
      return { message: error.message }; //if error return error message
    }
  }
  }  
};


export { login };
