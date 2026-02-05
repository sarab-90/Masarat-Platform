// read role and check access
export const checkRole = (allowedRole) => {
    return async (req, res, next) => {
        if (req.user && allowedRole.includes(req.user.role)){
            next();
        } else{
            return res.status(403).json({message: "Access Denied"})
        }
    };
};