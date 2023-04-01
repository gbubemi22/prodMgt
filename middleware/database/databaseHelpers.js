const User = require("../../models/User")
const CustomeError = require("../../errors")
const StatusCodes = require("http-status-codes")



const checkUserExist = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user) {
        return next(new CustomeError.NOT_FOUND("There is no such user with that id."));

    };
    next();
}

module.exports = {
    checkUserExist
}