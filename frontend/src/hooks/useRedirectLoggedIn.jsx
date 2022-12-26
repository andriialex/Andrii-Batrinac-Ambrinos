import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "../features/auth/authActions";

const useRedirectLoggedIn = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const useRedirectLoggedIn = async () => {
            const isLoggedIn = await loginStatus();

            if (isLoggedIn) {
                navigate("/")
                return;
            }
        };
        useRedirectLoggedIn();
    }, []);
};

export default useRedirectLoggedIn;