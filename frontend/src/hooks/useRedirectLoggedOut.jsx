import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGGED_IN, USER_DATA } from "../features/auth/authSlice"
import { loginStatus, logoutUser } from "../features/auth/authActions";

const useRedirectLoggedOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const useRedirectLoggedOut = async () => {
            const isLoggedIn = await loginStatus();

            if (!isLoggedIn) {
                await logoutUser();
                dispatch(LOGGED_IN(false))
                dispatch(USER_DATA(null))
                navigate("/login")
                return;
            }
        };
        useRedirectLoggedOut();
    }, [navigate]);
};

export default useRedirectLoggedOut;