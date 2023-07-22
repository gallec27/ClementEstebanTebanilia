const renderProfile = (req, res) => {
    res.render("profile", { req });
};

module.exports = { renderProfile };