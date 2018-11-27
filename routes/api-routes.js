const router = require("express").Router()
const db = require("../models");
  router.get("/api/kudos",function(req,res){
  db.Kudos.find(function(err,kudos){
      res.json(kudos)
  });
});
router.post("/api/users", function(req,res){
  db.User.create(req.body).then(function(newUser){
    res.json({
      message:"userCreated"
    })
  })
})
router.get("/api/users", function(req,res){
  db.User.find().then(function(users){
    res.json(users)
  })
})
module.exports = router;
