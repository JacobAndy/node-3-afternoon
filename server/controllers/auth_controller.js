const users = require("../models/users");
var id = 1;

module.exports = {
  login: (req, res, next) => {
    let { username, password } = req.body;
    let found = users.find(
      user => (user.username = username && user.password === password)
    );
    if (found) {
      username = req.session.user.username;
      res.status(200).json(req.session.user);
    } else {
      res.status(500).json("bet");
    }
  },
  register: (req, res, next) => {
    let { username, password } = req.body;
    users.push({ id, username, password });
    id++;
    req.session.user.username = username;
    res.status(200).json(req.session.user);
  },
  signout: (req, res, next) => {
    req.session.destroy();
    res.status(200).json(req.session);
  },
  getUser: (req, res, next) => {
    res.status(200).json(req.session.user);
  }
};
