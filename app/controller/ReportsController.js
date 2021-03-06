const Report = require('../model/Reports');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const Consultation = require('../model/Consultations');
const moment = require('moment');
const crypt = require('../common/encrypt');
const dateFormat = require('../common/dateFormat')




class ReportController {



    async report_register(req, res) {
        const masters = await Master.findAll();
        const idTraineeProfile = req.user.id

        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            const masterProfile = await Master.searchProfileMaster(req);
            const consult = await Consultation.searchAllConsults();
            res.render("forms/form_report", { consult: consult, masterProfile: masterProfile, traineeProfile: {}, masters: masters });

        }
        else if (req.user.NivelPermissaoId == 3) {
            const traineeProfile = await Trainee.searchProfileTraineeUser(req);
            const consult = await Consultation.searchConsultsTraineesReports(traineeProfile.id)
            res.render("forms/form_report", { consult: consult, masterProfile: {}, traineeProfile: traineeProfile, masters: masters });
        }
    }


    async fillFieldReports(req, res) {
        const { consultId } = req.body
        Consultation.searchOneConsultation(consultId).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
    }


    async report_save(req, res) {
        crypt.generateKeys();
        const { namePatient, dateConsult, report, idConsult, masterId } = req.body
        // let reportCrypt = req.body.report;
        const traineeProfile = await Trainee.searchProfileTraineeUser(req);
        const idtrainee = traineeProfile.id
        //Criptografando o relatorio
        const reportCrypt = crypt.encryptReport(report);

        //criptografando as variaveis
        let nameCrypt = crypt.encryptReport(namePatient)
        // let b = crypt.decryptStringWithRsaPrivateKey(a, "private.pem");

        Report.sendReports(reportCrypt, nameCrypt, idConsult, dateConsult, idtrainee, masterId).then(function () {
            req.flash("success_msg", "Relatório enviado com sucesso");
            res.redirect('/relatorios');
        }).catch(function (erro) {
            req.flash("error_msg", "Erro ao enviar o relatório");
            res.redirect('/relatorios');
            console.log("erro" + erro);
        })
    }

    async updateReport(req, res) {
        const { idReport, dateConsult, report, namePatient } = req.body
        // let reportCrypt = req.body.report;
        const traineeProfile = await Trainee.searchProfileTraineeUser(req);
        const idtrainee = traineeProfile.id

        const datetime = dateFormat(dateConsult);

        //Criptografando o relatorio
        const reportCrypt = crypt.encryptReport(report);

        //criptografando as variaveis
        let nameCrypt = crypt.encryptReport(namePatient)
        // let b = crypt.decryptStringWithRsaPrivateKey(a, "private.pem");

        Report.updateReport(reportCrypt, nameCrypt, datetime, idReport).then(function () {
            req.flash("success_msg", "Relatório alterado com sucesso");
            res.redirect('/relatorios');
        }).catch(function (erro) {
            req.flash("error_msg", "Erro ao alterar o relatório");
            res.redirect('/relatorios');
            console.log("erro" + erro);
        })
    }

    async report_find(req, res) {
        let traineeProfile;
        traineeProfile = await Trainee.searchProfileTraineeUser(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Report.searchOneReport(req.params.id).then(async (report) => {
            if (req.user.NivelPermissaoId == 1) {
                traineeProfile = await Trainee.searchProfileTrainee(report.reportTraineeId);
            }
            const reportDecrypt = crypt.decryptReport(report.reports);
            let patientDecrypt = crypt.decryptReport(report.namePatient);
            res.render('forms/form_report_view', { patientDecrypt: patientDecrypt, reportDecrypt: reportDecrypt, report: report, traineeProfile: traineeProfile, masterProfile: masterProfile })
        }).catch((err) => {
            res.send('erros' + err);
        })

    }

    async reportFindDate(req, res) {
        const { dateFirst, dateEnd } = req.body;
        var startDay = moment.utc(dateFirst);
        startDay.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        var endDay = moment.utc(dateEnd);
        endDay.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
        const datetimeFirst = dateFormat(startDay);
        const datetimeEnd = dateFormat(endDay);
        if (req.user.NivelPermissaoId == 1) {
            const masterProfile = await Master.searchProfileMaster(req);
            await Report.searchReportsDateMaster(datetimeFirst, datetimeEnd, masterProfile.id).then((result) => {
                res.send(result);
            }).catch((err) => {
                req.flash("error_msg", "Não Encontrado")
            });
        } else { 
            const traineeProfile = await Trainee.searchProfileTraineeUser(req);
            await Report.searchReportsDateTrainee(datetimeFirst, datetimeEnd, traineeProfile.id).then((result) => {
            res.send(result);
        }).catch((err) => {
            req.flash("error_msg", "Não Encontrado")
        });
        }
    }

    async reportFindAllTraineeMaster(req, res) {
        const masterProfile = await Master.searchProfileMaster(req);
        Report.searchAllReportTraineeMaster(req.params.id, masterProfile.id).then((report) => {
            res.render('pages/reporttrainee', {reports: report, traineeProfile: {}, masterProfile: masterProfile })
        }).catch((err) => {
            res.send('erros' + err);
        })
    }




    async reports(req, res) {
        if (req.user.NivelPermissaoId == 3) {
            const traineeProfile = await Trainee.searchProfileTraineeUser(req);
            Report.searchAllReportTrainee(traineeProfile.id).then((reports) => {
                res.render('pages/reports', { reports: reports, traineeProfile: traineeProfile })
            }).catch((err) => {
                res.send('erros' + err);
            })

        } else if (req.user.NivelPermissaoId == 1) {
            const masterProfile = await Master.searchProfileMaster(req);

            Report.searchAllReportMaster(masterProfile.id).then((reports) => {
                res.render('pages/reports', { reports: reports, masterProfile: masterProfile })
            }).catch((err) => {
                res.send('erros' + err);
            })
        } else {
            res.render('partials/404');
        }
    }

}

module.exports = ReportController;