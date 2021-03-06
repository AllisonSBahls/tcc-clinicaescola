const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')
const {users} = require('../helpers/auth')

const ConsultController = require('../controller/ConsultationController');
const controller = new ConsultController();

router.post('/save', users, (req, res) =>{
    controller.saveConsult(req, res)
})

router.post('/delete', users, (req, res) =>{
    controller.deleteSchedules(req, res)
});

router.post('/cancelamento', admin, (req, res) =>{
    controller.cancelamentoSchedule(req, res)
});

router.post('/confirmar', admin, (req, res) =>{
    controller.confirmSchedules(req, res);
})

router.post('/name', admin, (req, res) =>{
    controller.searchConsultPatient(req, res);
})

router.post('/date', admin, (req, res) =>{
    controller.searchConsultDate(req, res);
})

router.post('/both', admin, (req, res) =>{
    controller.searchConsultNameDate(req, res);
})

router.post('/conclude', admin, (req, res) =>{
    controller.endConsultation(req, res);
})

router.post('/update', admin, (req, res) =>{
    controller.updateConsult(req, res);
})

router.get('/', users, (req, res) =>{
    controller.listConsults(req, res);
})

router.get('/canceladas', admin, (req, res) => {
    controller.allCancelConsults(req,res);
})
module.exports = router;
