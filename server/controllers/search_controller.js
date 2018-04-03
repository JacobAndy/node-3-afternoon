const swag = require("../models/swag");

module.exports = {
  search: (req, res, next) => {
    if (req.query.category) {
      let filtered = swag.filter(item => item === req.query.category);
      res.status(200).json(filtered);
    } else {
      res.status(200).json(swag);
    }
  }
};
