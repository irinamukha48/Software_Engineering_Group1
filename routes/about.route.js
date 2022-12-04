const express = require('express');

const app = express();
const router = express.Router();

router.get('/',function(req,res){
  res.render("about");
});

module.exports = router;
