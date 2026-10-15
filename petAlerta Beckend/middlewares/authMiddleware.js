const jwt = require('jsonwebtoken');

module.exports = (req,res, next)=>{
    const authHeader = req.headers.authorization
    
    if(!authHeader) return res.status(401).json({
        success:false,
        erro:'Token não fornecido'
    });

    const token = authHeader.split(' ')[1]; //Bearer Token

    if(!token){
        return res.status(401).json({
            success:false,
            erro:'Token mal formatado'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // {id, cargo, email}
        next()
    } catch (error) {
        return res.status(401).json({
            success:false,
            erro:'Token inválido ou expirado'
        })
    }
};