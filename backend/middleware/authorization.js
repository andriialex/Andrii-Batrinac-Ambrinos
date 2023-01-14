import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()
import supabase from "../configSupabase.js"

const authorize = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Nu esti autentificat" })
        }
        const { user } = jwt.verify(token, process.env.JWT_SECRET);
        let { data: users, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", user);
        const { name, email, id, isProffesor, listActivities, last_feedback } = users[0];
        req.user = { name, email, id, isProffesor, listActivities, last_feedback };

        next();
    } catch (error) {
        res.status(401).json({ message: "Nu esti autentificat!" });
    }
}
export default authorize;