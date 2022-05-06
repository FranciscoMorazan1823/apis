const UserModel = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await UserModel.find({}, "-password");
    res.send({
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let username = req.params.username;
    let user = await UserModel.findOne({ username }, "-password");
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }
    res.send({ user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    //TODO: Requiere validation
    let { username, name, lastName, email, password } = req.body;
    let newUser = await UserModel.create({
      username,
      name,
      email,
      lastName,
      password,
    });
    newUser.password = null;
    res.send({ newUser });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // TODO: Requiere validation
    // What user?
    let usernameToUpdate = req.params.username;
    // New data
    let { username, name, lastName } = req.body; // TODO: Omit email and password, we need create a recovery strategic
    let user = await UserModel.findOne({ username: usernameToUpdate });

    if (!user)
      return res.status(400).send({
        message: "User to update not found",
      });

    user.username = username;
    user.name = name;
    user.lastName = lastName;

    let updatedUser = await user.save();

    if (user == updatedUser) {
      return res.send({
        message: "User is updated",
        user: { username, name, lastName, email: user.email},
      });
    }
    res.send({
      message: "cannot update the user",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let username = req.params.username;
    let { deletedCount } = await UserModel.deleteOne({ username });
    if (deletedCount == 1) {
      return res.send({
        message: "successfully deleted",
      });
    }
    return res.status(400).send({
      message: "cannot delete the user, maybe is delete before",
    });
  } catch (err) {
    next(err);
  }
};
/**
 * Get word by
 * TODO: Add pagination feature
 */
 exports.getWord = async (req, res, next) => {
    try {
      let term = req.params.term;
      let word = await WordModel.findOne({ term });
      if (!word) {
        return res.status(404).send({
          message: "word not found",
        });
      }
      res.send({ word });
    } catch (err) {
      next(err);
    }
  };
  
  exports.createWord = async (req, res, next) => {
    try {
      //TODO: Requiere validation
      let { term, description } = req.body;
      let newWord = await WordModel.create({ term, description });
      res.send({ newWord });
    } catch (err) {
      next(err);
    }
  };
  
  exports.updateWord = async (req, res, next) => {
    try {
      // TODO: Requiere validation
      // What word update?
      let termToUpdate = req.params.term;
      // New data
      let { term, description } = req.body;
      let word = await WordModel.findOne({ term: termToUpdate });
      if(!word) return res.status(400).send({
        message: "Word to update not found"
      })
  
      word.term = term;
      word.description = description;
      let updatedWord = await word.save();
      
      if (word == updatedWord) {ø
        return res.send({
          message: "word is updated",
          word: updatedWord,
        });
      }
      res.send({
        message: "cannot update de word",
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.deleteWord = async (req, res, next) => {
    try {
      let term = req.params.term;
      let { deletedCount } = await WordModel.deleteOne({ term });
      if (deletedCount == 1) {
        return res.send({
          message: "successfully deleted",
        });
      }
      return res.status(400).send({
        message: "cannot delete the word, maybe is delete before",
      });
    } catch (err) {
      next(err);
    }
  };