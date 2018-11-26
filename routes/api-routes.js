const router = require("express").Router()
const db = require("../models");
  router.get("/api/kudos",function(req,res){
  db.Kudos.find(function(err,kudos){
      res.json(kudos)
  });
});
module.exports = router;
