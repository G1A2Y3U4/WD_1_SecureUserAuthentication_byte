
const getProtectedData = (req, res) => {
    return res.status(200).json({
        message: "You are authenticated",
        user: req.user,
        data: {
            secret: "This data is visible only to authenticated users"
        }
    });
};

module.exports = {
    getProtectedData
};