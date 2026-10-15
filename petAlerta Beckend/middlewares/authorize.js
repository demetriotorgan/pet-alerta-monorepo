module.exports = (...cargosPermitidos)=>{
    return (req,res,next) => {
        //authMiddleware já autenticou então req.user existe
        if(!req.user){
            return res.status(401).json({
                success:false,
                erro:'Usuário não autenticado'
            })
        };
        
        //verifica se o cargo é permitido
        if(!cargosPermitidos.includes(req.user.cargo)){            
            return res.status(403).json({
                success:false,
                erro:'Acesso negado. Você não tem permissão para isso'
            })
        }
        next();
    }    
};