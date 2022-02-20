const AppError = require("../config/appError")

module.exports = {

    verify: (req) => {
        if(req.query.hub.verify_token !== process.env.VERIFY_TOKEN) throw new AppError("invalid verification token", 403);
    }
    
}