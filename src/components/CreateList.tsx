import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import UserContext from "./Context/UserContext";


export function CreateList() {
    const { user } = useContext(UserContext);

    if (!getCurrentUser()) {
        return <Redirect to="/login" />
    }

    return <>Alo</>
}