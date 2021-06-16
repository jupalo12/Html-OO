const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../MIDDLEWARES/login'); //IMPORTANDO A ROTA DE LOGIN
// const upload = multer({dest:'uploads/'});
//ENCURTANDO AS ROTAS COM O CONTROLLER
const ProdutosController = require('../CONTROLLER/produtos-controller'); 


//CONST PARA ARMAZENAR OS UPLOADS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/IMG/');// DEFINE O LOCAL ONDE OS UPLOADS 
    },
    filename: function (req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);// INSERE A DATA QUE FOI POSTADA E NOME DO UPLOAD
    }
});
//CONST PARA FILTRAR OS UPLOADS
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {//DEFINE OS TIPOS DE IMAGEM ACEITOS
        cb(null, true);
    } else {
        cb(null, false);
    }
}
//CONST UPLOAD FINAL
const upload = multer({
    storage: storage,
    limits: {//DEFINE OS LIMITES DA IMAGEM
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
// IMPORTANDO AS ROTAS DO CONTROLLER
router.get('/', ProdutosController.ProdutosGet);
router.post('/',upload.single('produto_imagem')/*PROPIEDADE DO MULTER PARA ENVIAR IMAGENS NO FORM-DATA */, ProdutosController.ProdutosPost);
router.get('/:id_produto',ProdutosController.ProdutosIdGet);
router.patch('/',ProdutosController.ProdutosPatch);
router.delete('/' ,ProdutosController.ProdutosDelete);

module.exports = router;