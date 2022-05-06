var {
    getAll,
    getWord,
    createWord,
    updateWord,
    deleteWord,
  } = require("../controllers/word");
  var express = require("express");
  var router = express.Router();
  
  router.get("/", getAll);
  router.get("/:term", getWord);
  router.post("/", passport.authenticate("jwt", { session: false }), createWord);
  router.put("/:term",passport.authenticate("jwt", { session: false }), updateWord);
  router.delete("/:term", passport.authenticate("jwt", { session: false }), deleteWord);
  
  
  module.exports = router;