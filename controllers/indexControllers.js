const renderIndex = (req, res) => {  
    res.render("index", { req });
  };

  module.exports = {
    renderIndex
  }