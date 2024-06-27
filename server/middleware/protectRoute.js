import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv"



dotenv.config({ path: '../.env.local' });
const protectRoute = async (req, res, next) => {
    try {
        // Ensure cookies exist before accessing
        if (!req.cookies || !req.cookies.jwt) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }
        console.log("token",process.env.JWT_SECRET)

        const token = req.cookies.jwt;

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        console.log("user found: ");
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
