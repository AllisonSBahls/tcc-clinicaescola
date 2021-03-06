/**
 * Importação dos módulos a serem útilizados
 * @module PainelController
 * @require express
 * @require passport
 * @require helpers/auth
 * @require IndexController
 * @require ConsultationController
 */

const express = require("express");
const router = express.Router();
const passport = require("passport");
const {users} = require('../helpers/auth')
const IndexController = require('../controller/IndexController');
const controller = new IndexController();
const ConsultController = require('../controller/ConsultationController');
const consult = new ConsultController();

/**
 * Rota para a página de login do sistema. 
 * Quando o usuário digitar a página ele é direcionado automaticamente para essa rota
 * O "(req,res)=>"" é uma arrow fuction 
 * '/' é o Caminho (rota) para o qual a função de middleware é aplicada.
 * é o método HTTP para o qual a função de middleware é aplicada.
*@method GET
     * @param req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     
*/
router.get('/', (req, res) => {

    /**
  
     * Chamando a função index do controlador passando os argumentos req, res
     * @param req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     */ 
    controller.index(req, res)
});

/**
 * Rota POST para o usuário fazer a autenticação de usuário no portal utilizando login e senha.
 * Dentro do router.post é passado o nome da rota e o método de autenticação.
 * No método de autentica é definico o tipo de autenticação.
 * Local-signin é uma autenticação local.
 * @method POST 

 */
router.post('/login', passport.authenticate('local-signin', {

    /**
     * Redireciona para o painel principal se o usuário e senha forem válidos
     */
    successRedirect: '/dashboard',

     /**
     * Redireciona para a tela de login se o usuário e senha forem válidos
     */
    failureRedirect: '/',

    /**
     * Mensagem de erro quando houver erro de acesso
     */
    failureFlash: true
}
));

/**
 * Rota para "Página não encontrada".
 * Essa rota aparecerá para usuários que tentarem fazer requisições a rotas não desejadas

     * @param req request (requisição)  
     * @param res response (resposta)
     */
router.get('/pagenotfound', (req, res) => {
        /**
     * Chamando a função notfound do controlador passando os argumentos req, res
     * @argument req request (requisição)  
     * @argument res response (resposta)
     */ 
    controller.notfound(req, res);
})

/**
 * Função para a validação do usuário no sistema
 * @function
 * @argument {*} req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
 * @argument {*} res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
 * @argument {*} next Argumento de retorno de chamada para a função de middleware, chamado de "next" por convenção.
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    /**
     * Redirecionando para a rota /signin
     */
    res.redirect('/signin');
}

/**

 * Rotas para o retorno das consultas de acordo com o dia. Dentro do método get é passado o user.
 * @argument {*} req request (requisição)  
 * @argument {*} res response (resposta)
 *  
 */
router.get('/consult/days',  users, (req, res) =>{
    /**
     * Chamando a função findConsultDay do IndexController passando os argumentos req, res
     * @argument req request (requisição)  
     * @argument res response (resposta)
     */ 
    controller.findConsultDay(req, res);
})

/**
 * Rotas para o obter as consultas de acordo com o semana 
 * @argument {*} req request (requisição)  
 * @argument {*} res response (resposta)
 * Dentro do método get é passado também o users definindo que apenas esses usuários tem acesso a esta rota
 */
router.get('/consult/next', users, (req, res) =>{
        /**
     * Chamando a função findConsultNext do IndexController passando os argumentos req, res
     * @argument req request (requisição)  
     * @argument res response (resposta)
     */ 
    controller.findConsultNext(req, res);
})

/**
 * Rotas para deslogar do sistema, por meio do /logout
 * @argument {*} req request (requisição)  
 * @argument {*} res response (resposta)
 */
router.get('/logout', (req, res) => {
    /**
     * req.logout(); Usando o req para chamar o metodo logout do passport
     * req.flash('sucess_msg', 'Deslogado com sucesso') Exibe uma mensagem
     * res.redirect('/')Direcionada para a página de login
     */
    req.logout();
    req.flash('sucess_msg', 'Deslogado com sucesso')
    res.redirect('/')
});


router.get('/dashboard', users, (req, res) => {
    controller.dashboard(req, res)
});


router.get('/signup',(req, res)=>{
    controller.signup(req, res);
})

router.post('/save', async (req, res)=>{
    controller.signup_save(req, res);
});

router.get('/calendar', users, (req, res)=>{    
   consult.consultations(req, res)
})

router.get('/schedules', users, (req, res)=>{    
    controller.onlySchedules(req, res)
 })

 /**
 * Rota GET para o usuário fazer a autenticação de usuário no portal utilizando conta do google.
 * Dentro do router.get é passado o nome da rota e o método de autenticação.
 * No método de autentica é definico o tipo de autenticação.
 * google é uma autenticação feita através do usuário google.
 */

 router.get('/auth/google',  passport.authenticate('google',{

     /**
      * Após a conexão é preciso obter algumas informações do usuário
      * Utilizando o scope:['email', 'profile'] para que o API de autenticação.
      * Será passado o email, e informações do perfil como nome, idade, foto de perfil
      */
     
     scope:['email', 'profile']
 }))

 /**
  * Método GET para ir para a página após autenticação com a conta do google
  * Para deslogár é o mesmo processo da rota /logout
  */

 router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('../../dashboard');
 })

 /**
  * Exportar
  */

module.exports = router;