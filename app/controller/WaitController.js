
const Wait = require('../model/Wait');
const moment = require('moment');
const Secretary = require('../model/Secretary');
const Patient = require('../model/Patient');
const Master = require('../model/Master');
const Consultation = require('../model/Consultations');

class WaitController {
    async waitSave(req, res) {
        if (req.user.NivelPermissaoId == 1) {

            const {consultationId, patientIdHidden} =  req.body
            const master = await Master.searchProfileMaster(req);
    
            await Consultation.deleteSchedules(consultationId);
        
            Wait.insertWait(patientIdHidden, master.id).then(function () {
                req.flash("success_msg", "Paciente colocado na lista de Espera");
                res.redirect('/dashboard');
            }).catch(function (err) {
                res.send(err);
            })

        } else if (req.user.NivelPermissaoId == 2) {
            const secretary = await Secretary.searchProfileSecretary(req);


            Wait.create({
                dateEntry: moment(),
                waitPatientId: parseInt(req.body.patientIdHidden),
                waitSecretaryId: secretary.id,
            }).then(function () {
                Consultation.destroy({
                    where: { id: req.body.consultationId }
                });
                req.flash("success_msg", "Paciente colocado na lista de Espera");
                res.redirect('/dashboard');
            }).catch(function (err) {
                res.send(err);
            })
        }
    }

    async waitFindAll(req, res) {
        const secretary = await Secretary.searchProfileSecretary(req);
        const master = await Master.searchProfileMaster(req);

        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            Wait.findAll({
                include: [{
                    model: Patient, as: 'waitPatient',
                }, {
                    model: Secretary, as: 'waitSecretary',
                }, {
                    model: Master, as: 'waitMaster',
                }],
            }).then((waits) => {
                res.render('pages/waits', { waits: waits, masterProfile: master });
            })
        } else if (req.user.NivelPermissaoId == 2) {
            Wait.findAll({
                include: [{
                    model: Patient, as: 'waitPatient',
                }, {
                    model: Secretary, as: 'waitSecretary',
                }, {
                    model: Master, as: 'waitMaster',
                }],
            }).then((waits) => {
                res.render('pages/waits', { waits: waits, secretaryProfile: secretary });
            })
        }
    }

    async waitDelete(req, res){
        Wait.destroy({
            where: {'id': req.params.id}
        }).then(()=>{
            req.flash("success_msg", "Paciente retirado na lista de Espera com suceso");
            res.redirect('/waits');
        }).catch(()=>{
            req.flash("error_msg", "Erro ao retirar o paciente da lista de Espera");
            res.redirect('/waits');
        })
    }

    waitUpdate(req, res){
        Wait.update({
            dateExit: moment(),
        },{
            where: {id : req.body.id}
        }).then(()=>{
            req.flash("success_msg", "Paciente retirado na lista de Espera com suceso");
            res.redirect('/waits');
        }).catch(()=>{
            req.flash("error_msg", "Erro ao retirar o paciente da lista de Espera");
            res.redirect('/waits');
        })
    } 
}
module.exports = WaitController;