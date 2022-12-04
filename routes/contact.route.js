const express = require('express');
const bodyParser = require('body-parser');



const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true}));

router.get('/',function(req,res){
  res.render("contact");
});

router.post("/",function(req,res){


  res.redirect("contact");

})

module.exports = router;
