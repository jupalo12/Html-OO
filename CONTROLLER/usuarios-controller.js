const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.Cadastro = (req, res, next) => {
    mysql.getConnection((error, conn) => { //CRIA A CONEXAO NO MYSQL
        if (error) { return res.status(500).send({ error: error }) } // RETORNA ERRO (SE DER)
        conn.query(`SELECT * FROM usuarios WHERE email = ?`, [req.body.email], (error, results) => { /*QUERY PARA O SQL*/
// SE O USUARIO JA ESTIVER CADASTRADO
            if (results.length > 0) {
                res.status(409).send({
                    mensagem: 'USUÁRIO JÁ CADASTRADO'
                })
            } else {
                // CRIPTOGRAFA A SENHA EM HASH QUANDO CRIADA
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => { 
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }//PEGA ERRO
                    conn.query(`INSERT INTO usuarios (email,senha) VALUES (?,?)`, //INSERE NO SQL
                        [req.body.email, hash],
                        (error, results) => {
                            conn.release(); //LIBERA A CONEXAO PARA NAO DAR LOOPING
                            if (error) { return res.status(500).send({ error: error }) }//PEGA ERRO
                            response = {
                                mensagem: 'USUÁRIO CRIADO COM SUCESSO',
                                usuarioCriado: {
                                    id_usuario: results.insertId,
                                    email: req.body.email
                                }
                            }
                            return res.status(201).send(response)//RETORNA O USUARIO CRIADO
                        })
                });
            }
        })

    });
};

exports.Login = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) } //PEGA ERRO
        const query = 'SELECT * FROM usuarios WHERE email = ?'; //AUTENTICA O LOGIN NO SQL
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release(); 
            if (error) { return res.status(500).send({ error: error }) } //PEGA ERRO
            if (results.length < 1) { // CASO O USUARIO NAO TENHA LOGIN CADASTRADO
                return res.status(401).send({ mensagem: 'FALHA NA AUTENTICAÇÃO' })
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {// COMPARA A SENHA
                if (err) {
                    return res.status(401).send({ mensagem: 'FALHA NA AUTENTICAÇÃO' })
                }
                if (result) { // ENTRA NA SESSÃO
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h" //SESSAO EXPIRA EM 1 HORA
                        });
                    return res.status(200).send({
                        mensagem: 'AUTENTICADO COM SUCESSO',
                        token: token //RETORNA O TOKEN DE SESSÃO 
                    });
                }
                return res.status(401).send({ mensagem: 'FALHA NA AUTENTICAÇÃO' })
            })
        })
    })
};