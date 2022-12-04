const express = require('express');

const app = express();
const router = express.Router();


router.get("/",function(req,res){
    res.render("checkoutresttwo",
    {prod1:0,prod2:0,prod3:0,
     prod4:0,prod5:0,prod6:0})
});

module.exports = router;