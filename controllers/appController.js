const AppError = require("../config/appError");
const CONSTANTS = require("../config/constants");
const messaging = require("../services/messaging");
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

exports.getMessages = async (req, res, next) => {
    try {
        const response = await messaging.getMessages();

        return res.status(200).json({
            status: 'success',
            data: response
        })
    } catch (error) {
        return next(error);
    }
}

exports.fetchMessage = async (req, res, next) => {
    try {
        let {id} = req.params;

        if(!id) throw new AppError("id required", 400);

        const response = await messaging.fetchMessage(id);

        return res.status(200).json({
            status: 'success',
            data: response
        })
    } catch (error) {
        return next(error);
    }
}

exports.summary = async (req, res, next) => {
    try {
        const response = await messaging.getSummary();

        return res.status(200).json({
            status: 'success',
            data: response
        })
    } catch (error) {
        return next(error);
    }
}