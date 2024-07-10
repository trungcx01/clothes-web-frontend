import {useState, useEffect} from "react";
import { loginAPI } from "../services/AuthService";
import { toast } from "react-toastify";
import { NavLink, useNavigate} from "react-router-dom";



const Login = () =>{
    const navigate = useNavigate();
    const [loginDTO, setLoginDTO] = useState({username:'', password:''});
    const [showPassword, setShowPassword] = useState(false)
    const [loadingData, setLoadingData] = useState(false)  
    
   useEffect(() => {
        let token = localStorage.getItem("token");
        if (token){
            navigate("/home")
        }
   },[]);


   const handleLogin = async () => {
    if(!loginDTO.username || !loginDTO.password) {
      toast.error("Email/Password is required!");
      return;
    }

    setLoadingData(true);
   
    try {
      const res = await loginAPI(loginDTO);
      console.log(loginDTO)
      console.log(res);
      const token = res.data.accessToken;  
      if (token){
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed!");
    }
      setLoadingData(false);
  };

   
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Log in</div>
                <div className="text">Email or username</div>

                <input 
                type="text" 
                placeholder="Email or username"
                value={loginDTO.username}
                name="username"
                onChange={(e)=> setLoginDTO({...loginDTO, username: e.target.value})}
                />

                <div className="input-2">
                    <input type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginDTO.password}
                    name="password"
                    onChange={(e) => setLoginDTO({...loginDTO, password: e.target.value})}
                    />

                <i className={showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"} 
                    onClick={() => setShowPassword(!showPassword)}></i>
                </div>

                <button 
                className={(loginDTO.username && loginDTO.password) ? "active" : ""}
                disabled={(loginDTO.username && loginDTO.password) ? false : true} 
                onClick={handleLogin}>
                    {loadingData && <i className="fa-solid fa-sync fa-spin"></i>} 
                    &nbsp;Login
                </button>
                <div className="back">
                    <NavLink to="/users" className="nav-link" >
                        <i className="fa-solid fa-chevron-left"></i> Go Back
                        </NavLink>
                </div>
            </div>
        </>
    )
}
export default Login;