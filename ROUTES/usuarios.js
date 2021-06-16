const express = require('express');
const router = express.Router();

const UsuariosController = require('../CONTROLLER/usuarios-controller');

router.post('/cadastro', UsuariosController.Cadastro);// IMPORTA O CADASTRO DO CONTROLLER

router.post('/login', UsuariosController.Login)// IMPORTA O LOGIN DO CONTROLLER

module.exports = router;
