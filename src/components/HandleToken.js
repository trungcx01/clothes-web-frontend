import { useEffect } from "react";

const HandleToken = () =>{
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }, [])
}
export default HandleToken;