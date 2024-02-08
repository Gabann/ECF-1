module.exports.sendResponse = function (res, statusCode, responseMessage) {
	res.status(statusCode).json({response: responseMessage});
};