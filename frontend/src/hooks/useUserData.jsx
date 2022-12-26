import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { infoUser } from "../features/auth/authActions";
import { LOGGED_IN, USER_DATA } from "../features/auth/authSlice";

const getUserData = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = async () => {
            const user = await infoUser()
            dispatch(USER_DATA(user))
            dispatch(LOGGED_IN(true))
        };
        userData();
    }, []);
}

export default getUserData