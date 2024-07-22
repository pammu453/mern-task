import Login from "../models/login.model.js";
import bcrypt from 'bcryptjs'

// Login a user
export const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await Login.findOne({ f_userName: userName });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.f_Pwd);
            if (isMatch) {
                res.status(200).json({
                    success: true, message: "Login successful", user: {
                        userName: user.f_userName,
                        fs_no: user._id
                    }
                })
            } else {
                return res.json({ success: false, message: "Invalid credentials" })
            }
        } else {
            const newUser = new Login({ f_userName: userName, f_Pwd: await bcrypt.hash(password, 10) })
            await newUser.save();
            res.status(201).json({
                success: true, message: "New Login successfully created", user: {
                    userName: newUser.f_userName,
                    fs_no: newUser._id
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}