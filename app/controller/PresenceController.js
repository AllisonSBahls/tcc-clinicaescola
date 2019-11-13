const Presence = require('../model/Presence');
const Consultation = require('../model/Consultations');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const Patient = require('../model/Patient');
const Wait = require('../model/Wait');
const dateFormat = require('../common/dateFormat')
const moment = require('moment');

class PresenceController {

    async presences(req, res) {
        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2){
        const masterProfile = await Master.searchProfileMaster(req);
        const secretaryProfile = await Master.searchProfileMaster(req);
        const consult = await Consultation.searchAllConsults();
        Presence.searchAllFrequence().then((result) => {
            res.render('pages/presence', {consult:consult, masterProfile:masterProfile, result:result})
        }).catch((err) => {
            res.send(err)
        });
  
    }
        else if (req.user.NivelPermissaoId == 3){
            const traineeProfile = await Trainee.searchProfileTrainee(req);
            const consult = await Consultation.searchConsultsTraineesDate(traineeProfile.id)
            Presence.searchAllFrequence(traineeProfile.id).then((result) => {
                res.render('pages/presence', {masterProfile:{}, consult:consult, traineeProfile:traineeProfile, result:result})
            }).catch((err) => {
                res.send(err)
            });
    }
}

    async fillField(req, res){
        const { consultId } = req.body
        Consultation.searchOneConsultation(consultId).then((result) => {
            res.send(result) 
        }).catch((err) => {
            res.send(err)
        });
    }

    async insertFrequence(req, res){
        const {idConsult, startConsult, hoursConsult, endConsult, procedureDescription } = req.body
        const dateTimeStart = startConsult + ' '+ hoursConsult
        const dateTimeEnd = startConsult +' '+ endConsult
        const traineeProfile = await Trainee.searchProfileTrainee(req);
        Presence.insertFrequence(dateTimeStart, dateTimeEnd, procedureDescription, traineeProfile.id, idConsult).then(() => {
            req.flash("success_msg", "Presenca Marcada");
            res.redirect('/frequencias');
        }).catch((err) => {
            res.send("error_msg", "Erro ao marcar a presença", err);
            res.redirect('/frequencias');
            console.log(err)
        });
    }

    async findAllFrequence(req, res){
         if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2){
        const masterProfile = await Master.searchProfileMaster(req);
        const secretaryProfile = await Master.searchProfileMaster(req);
        Presence.searchAllFrequence().then((result) => {
            res.render('pages/presence', {masterProfile:masterProfile, result:result})
        }).catch((err) => {
            res.send(err)
        });
    }
        else if (req.user.NivelPermissaoId == 3){
            const traineeProfile = await Trainee.searchProfileTrainee(req);
            Presence.searchAllFrequence(traineeProfile.id).then((result) => {
                res.render('pages/presence', {traineeProfile:traineeProfile, result:result})
            }).catch((err) => {
                res.send(err)
            });
        } 
    }

    async findTraineeFrequence(req, res){
        const masterProfile = await Master.searchProfileMaster(req);
        const id = req.params.id
        const consult = await Consultation.searchAllConsults();
        Presence.searchTraineeFrequence(id).then((result) => {
            res.render('pages/presence', {consult:consult, masterProfile:masterProfile, result:result})
        }).catch((err) => {
            res.send(err)
        });
    }

    validateFrequence(req, res){
        const{idPresence, validate } = req.body;
        Presence.validateFrequence(idPresence, validate).then(()=>{
            req.flash("success_msg", "Presença confirmada")
            res.redirect('/frequencias')
        }).catch((err)=>{
            console.log(err);
        })
    }

    async deletePresence(req, res){
        await Presence.searchOneFrequence(req.params.id)
        Presence.deleteFrequence(req.params.id).then(()=>{
            req.flash("success_msg", "Presença confirmada")
            res.redirect('/frequencias')
        }).catch((err)=>{
            console.log(err);
        })
    }
}

module.exports =  PresenceController;