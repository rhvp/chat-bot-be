const AppError = require("../config/appError");
const CONSTANTS = require("../config/constants");
const { postProfile } = require("../services/request");

const setupGetStarted = async() => {
    let payload = {
        get_started:{
            payload: CONSTANTS.APP_START
        }
    }

    const response = await postProfile(payload);

    if(!response) throw new AppError("error intializing", 500);
}

exports.initializeApp = async(req, res, next) => {
    try {
        await setupGetStarted();

        return res.status(200).json({
            status: "success",
            message: "App Initialized"
        })
    } catch (error) {
        return next(error);
    }
}