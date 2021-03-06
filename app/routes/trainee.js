const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')

const {trainee} = require('../helpers/auth')

const TraineeController = require('../controller/TraineeController');
const controller = new TraineeController();

router.post('/save', admin, async (req, res) =>{
    await controller.registerTrainee(req, res)
});

router.get('/', admin, (req, res) =>{
    controller.trainees(req, res)
});

router.get('/profile/:id', admin, (req, res) =>{
    controller.profileTrainee(req, res)
});

router.get('/delete/:id', admin, (req, res) =>{
    controller.deleteTrainee(req, res)
});

router.post('/update/:id', admin, (req, res) =>{
    controller.updateTrainee(req, res)
});

router.post('/edit', trainee, (req, res) => {
    controller.editProfile(req, res);
})

router.get('/register', admin, (req, res) =>{
    controller.form_admin_trainee(req, res)
});

router.post('/search', admin, (req, res) =>{
    controller.searchNameTrainee(req, res)
})


module.exports = router;