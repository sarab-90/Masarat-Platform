import User from "../models/user.Models.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log("Users",users);
        return res.status(200).json({users: users});
    } catch (error) {
        res.status(500).json({message: "Error Fetched Users", error})
    }
};

// get user by id
export const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User Not Found"});
        }
        return res.status(200).json({user:user})
    } catch (error) {
        res.status(500).json({message: "Error Fetched User", error})
    }
};

// search user by name email 
export const searchUser = async (req, res) => {
    const {name, email, id} = req.body;
    try {
        const users = await User.find(
            {name: name},
            {email: email},
            {_id: id}
        );
        if (users.length < 1 ){
            return res.status(404).json({message: "User Not Found"});
        }
        return res.status(200).json({users: users});
    } catch (error) {
        return res.status(500).json({message: "Error Searching User", error})
    }
};

// delete user by id
export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({message: "User Not Found"});
        }
        return res.status(200).json({message: "User Deleted Successfully"});
    } catch (error) {
        return res.status(500).json({message: "Error Deleting User", error})
    }
};

// update user 
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {name, email},
            {new: true}
        );
        if (!updatedUser){
            return res.status(400).json({message: "User Not Found"});
        }
        return res.status(200).json({message: "User Updated Successfully"});
    } catch (error) {
        return res.status(500).json({message: "Error Updating User", error})
    }
};

// update role of user
export const updateUserRole = async (req,res) => {
    const {id} = req.params;
    const {newRole} = req.body;
    try {
        const updatedRole = await User.findByIdAndUpdate(
            id,
            {role: newRole},
            {new: true}
        );
        if (!updatedRole){
            return res.status(404).json({message: "User Not Found"})
        }
        return res.status(200).json({message: "User Role Updated Successfully"})
    } catch (error) {
        return res.status(500).json({message: "Error Updating User Role", error})
    }
};
// change password 
export const changePassword = async (req, res) => {
    const {id} = req.params;
    const {newPassword, newConfirmPassword, oldPassword} = req.body;
    try {
        const user = await User.findById(id);
        // check if old password is correct
        const isCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isCorrect){
            return res.status(400).json({message: "Old Password Is Incorrect"});
        }
        if (newPassword !== newConfirmPassword){
            return res
            .status(400)
            .json({message: "New Password And Confirm Password Do Not Match"});
        }
        if (oldPassword === newPassword){
            return res
            .status(400)
            .json({message: "New Password Cannot Be Same As Old Password"});
        }
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
        if (newPassword.length < 8 || !regex.test(newPassword)){
            return res
            .status(400)
            .json({
                message:
                "Password Must Be At Least 8 Characters Long And Contain At Least One Number And One Special Character"
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.findByIdAndUpdate(
            id,
            {password: hashedPassword},
            {new: true},
        );
        return res.status(200).json({message: "Password changed successfully"});
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message});
    }
};

