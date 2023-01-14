import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { infoUser } from "../features/auth/authActions";
import { LOGGED_IN, USER_DATA } from "../features/auth/authSlice";

const getUserData = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = async () => {
            const user = await infoUser()
            if (user) {
                dispatch(USER_DATA(user))
                dispatch(LOGGED_IN(true))
                return;
            }
        };
        userData();
    }, []);
}

export default getUserData