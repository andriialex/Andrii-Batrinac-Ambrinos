const express = require('express')
const router = express.Router()
const feedback = require('./models/feedbackSchema')

router.post('/login', (req, res) => {

})

router.get('/get-cursuri-student', (req, res) =>{
    const id = '638bb7fffbbdda3ec1ef8bc9'
    const tt = feedback.findById(id);
    // res.json(tt.type)
    feedback.findById(id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            // console.log("Result : ", docs);
            res.send(docs)
        }
    });
})

router.get('/get-cursuri-profesor', (req, res) =>{
    
})

router.post('/inscriere-curs', (req,res) => {

})

router.post('/creare-curs', (req,res) => {

})

router.post('/feedback', (req, res) => {

})

router.get('/get-feedback', (req, res) => {

})

module.exports = router