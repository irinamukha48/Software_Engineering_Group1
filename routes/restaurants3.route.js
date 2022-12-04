const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/",function(req,res){
    res.render("restThree",{val0:0,val1:0,val2:0,val3:0,val4:0,val5:0})
})

module.exports = router;