
// const roles = require('./permissions'); // File is a CommonJS module; it may be converted to an ES module.
import roles from "../permissions.js";
export const authUser = (action) => {
    return (req, res, next) => {        
        const userRole = req.query?.role || '';
        const permissions = roles[userRole]?.can || '';
        console.log('action', permissions, action);
        if (permissions.includes(action)) {
            next();
        } else {
            res.status(403).json({message: 'Unauthorized user'});
        }
    }   
}
