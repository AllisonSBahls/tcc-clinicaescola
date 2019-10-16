const bd = require('./dbConnection');
const Permissao = require("./Permissoes");

const User = bd.sequelize.define('users', {
    email: {
        type: bd.Sequelize.STRING
    },
    password: {
        type: bd.Sequelize.STRING
    },

});

User.belongsTo(Permissao, {as : 'NivelPermissao', foreingKey: {name: 'fk_permissao_usuario'}});
//User.sync({force: true});

User.verifyEmail = async function(email) {
    return await this.findAll({
        where: { email: email }
    })
}

User.searchEmailUser = async function(idUser){
    return await this.findOne({
        where: { id: idUser}
    })
}

User.searchPasswordUser = async function(req){
    return await this.findOne({
        where: { id: req.user.id}
    })
}

User.updateEmailUser = async function(idUser, email){
    return await this.update({
        email: email
    },{ 
        where: { id: idUser }, 
    }); 
}

User.updatePassword = function(password, req){
    return this.update({
        password: password
    },{
        where: {id: req.user.id}
    })

}

module.exports = User;