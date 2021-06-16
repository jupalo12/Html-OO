const jwt = require('jsonwebtoken');
// PARA PAGINAS QIE NECESSITEM DE LOGIN OBRIGATORIO
exports.obrigatorio = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]// PEGA A AUTHORIZHATION
        const decode = jwt.verify(token , process.env.JWT_KEY);// VERIFICA O TOKEN
        req.usuario = decode;
        next();// VAI PARA A PROXIMA AÇÃO
    } catch (error) {
     return res.status(401).send({mensagem: 'FALHA NA AUTENTICAÇÃO'});
    }
    
}; 
// PARA PAGINAS QIE NÃO NECESSITEM DE LOGIN 
exports.opcional = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]// PEGA A AUTHORIZHATION
        const decode = jwt.verify(token , process.env.JWT_KEY);// VERIFICA O TOKEN
        req.usuario = decode;
        next();
    } catch (error) {
     next();
    }
    
} 