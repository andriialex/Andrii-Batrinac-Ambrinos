import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()
import supabase from "../configSupabase.js"

const authorize = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Nu esti autentificat!" });
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ message: "Nu esti autentificat!" });
            let { data: users, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", user.user);
            if (!users[0]) res.status(400).json({ message: "Id user invalid" });
            else {
                const { name, email, id, isProffesor, listActivities } = users[0];
                req.user = { name, email, id, isProffesor, listActivities };
                next();
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
export default authorize;