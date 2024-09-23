import { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import LoggedIn from "../components/LoggedIn/LoggedIn";
function LogIn() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const isAdmin=localStorage.getItem("isAdmin");
return (
    <>
    {isAdmin ? (
        <LoggedIn setIsLoggedIn={setIsLoggedIn} />
    ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
    )}
    </>
);
}
export default LogIn;