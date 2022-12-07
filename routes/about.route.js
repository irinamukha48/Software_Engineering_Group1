const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',function(req,res){
  if(req.isAuthenticated()){
    res.render("about");
  }else{
    console.log("Not a Authenticated User")
    res.redirect("/user/login")
  }

});

module.exports = router;
