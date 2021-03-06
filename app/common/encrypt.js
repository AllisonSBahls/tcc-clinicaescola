//Importa a biblioteca crypto
const crypto = require('crypto');

//Define qual a chave utilizada pela criptografia
const alg = 'aes-256-ctr';

//Define a senha de criptografia em 23bits.
const pwd = '$2fdp$vfs.)vk4DS$2fdp$vfs.)vk4DS';

var path = require("path");
var fs = require("fs");

const { writeFileSync } = require('fs')
const { generateKeyPairSync } = require('crypto')

//Função para encriptar os dado do usuário
function encryptReport(reportCrypt){
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(alg, pwd, iv)
    const cryptedReport = cipher.update(reportCrypt, 'utf8', 'hex') + cipher.final('hex');
    const crypted = iv.toString('hex') +':'+cryptedReport;
    return crypted;
}

//Função para decriptar os dadaos do usuário
function decryptReport(field){
    const parts = field.split(':')
    const decipher = crypto.createDecipheriv(alg, pwd, new Buffer.from(parts[0], 'hex')); 
    const reportDecrypt =  decipher.update(parts[1], 'hex', 'utf8') + decipher.final('utf8')
    return reportDecrypt;
}


var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer.from(toDecrypt, "base64");
    // var decrypted = crypto.privateDecrypt(privateKey, buffer);
    const decrypted = crypto.privateDecrypt(

        {
            key: privateKey.toString(),
            passphrase: '',

        },
        buffer,
    )
    return decrypted.toString("utf8");
};


function generateKeys() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', 
    {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'     
            },     
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'mysecret'
            } 
    });

    writeFileSync('private.pem', privateKey)
    writeFileSync('public.pem', publicKey)
}



module.exports ={
    encryptReport,
    encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey,
    decryptReport,
    generateKeys,
}