const express = require('express');
const router = express.Router();
const { sendSignImage, sendExampleSignImage } = require("../services/email")
const fs = require('fs')

router.post('/signImage/createFile',   async (req , res) => {
  try{
    const base64Data = req.body.sign.replace(/^data:image\/png;base64,/, "");

    fs.writeFile("image.png",base64Data,'base64',async function(err){
        console.log(err);
        await sendSignImage(req.body.date, req.body.email)
        fs.unlinkSync("image.png")
    })

    res.send("書き込み完了");
  }catch (e) {
    res.status(404).send()
  }

})

router.post('/signImage/example', async (req,res) => {
  try{
    const base64Data = req.body.sign.replace(/^data:image\/png;base64,/, "");

    fs.writeFile("image.png",base64Data,'base64',async function(err){
        console.log(err);
        await sendExampleSignImage(req.body.date, req.body.email)
        fs.unlinkSync("image.png")
    })

    res.send("書き込み完了");
  }catch (e) {
    res.status(404).send()
  }
})

module.exports = router