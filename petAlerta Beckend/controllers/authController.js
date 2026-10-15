const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

module.exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        //1.Validação
        if (!email || !senha) {
            return res.status(400).json({
                erro: 'Email e senha são obrigatórios'
            })
        };

        //2.Buscar usuario e senha 
        const user = await User.findOne({ email }).select('+senha');

        if (!user) {
            return res.status(401).json({
                success: false,
                erro: 'Credenciais inválidas'
            })
        };

        //3.Verifica conta ativa
        if (user.ativo === false) {
            return res.status(403).json({
                success: false,
                erro: 'Usuario desativado, contato o admin'
            })
        };

        //4. Compara senha
        const senhaCorreta = await user.compararSenha(senha)
        if (!senhaCorreta) {
            return res.status(401).json({
                success: false,
                erro: 'Senha inválida'
            })
        };

        const payload_user = {
            id: user._id,
            cargo: user.cargo
        };

        const token = generateToken(payload_user);

        //5. Atualiza login
        user.ultimoLogin = new Date()
        await user.save({ validateBeforeSave: false })

        user.senha = undefined

        return res.status(200).json({
            success: true,
            msg: 'Login realizado com sucesso',
            token,
            user: {
                id: user._id,
                nome: user.nome,
                email: user.email,
                cargo: user.cargo
            }
        });
    } catch (error) {
        console.error('Erro no login: ', error);
        return res.status(500).json({
            success: false,
            erro: 'Erro interno no servidor'
        })
    };


};

module.exports.getMe = async (req, res) => {
    try {
        // req.user vem do middleware de autenticação com id e cargo
        const user = await User.findById(req.user.id).select('-senha');

        if (!user) {
            return res.status(404).json({
                success: false,
                erro: 'Usuário não encontrado'
            });
        }

        if (user.ativo === false) {
            return res.status(403).json({
                success: false,
                erro: 'Usuário desativado'
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                nome: user.nome,
                email: user.email,
                cargo: user.cargo,
                ultimoLogin: user.ultimoLogin
            }
        });
    } catch (error) {
        console.error('Erro no getMe:', error);
        return res.status(500).json({
            success: false,
            erro: 'Erro interno no servidor'
        });
    }
};

module.exports.criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, cargo } = req.body

        //1.Validação básica
        if (!nome || !senha || !email) {
            return res.status(400).json({
                success: false,
                erro: 'Nome, email e senha são obrigatórios'
            })
        };

        //2.Verifica se email existe
        const userExiste = await User.findOne({ email })
        if (userExiste) {
            return res.status(409).json({
                success: false,
                erro: 'Email já cadastrado'
            })
        };

        //3. Criar novo usuario
        const novoUsuario = await User.create({
            nome,
            email,
            senha,
            cargo,
            ativo:true
        });

        //4.Remove senha do retorno
        novoUsuario.senha = undefined
        return res.status(201).json({
            success: true,
            msg: 'Usuario criado com sucesso',
            user: novoUsuario
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msgs = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ erro: msgs })
        }

        console.error('Erro no register:', error)
        return res.status(500).json({
            erro: 'Erro interno no servidor'
        })
    }
};

module.exports.rotaPrivadaTeste = async(req,res)=>{
     return res.status(201).json({ 
        success:true,
        msg: 'Rota protegida', 
        user: req.user 
    })
};

module.exports.listarUsuarios = async(req,res)=>{
    try {
        const users = await User.find()
        .select('-senha')
        .sort({createdAt:-1})
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao listar usuarios');
        res.status(500).json({
            erro:'Erro ao listar usuarios'
        })
    }
};

module.exports.deletarUsuario = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletado = await User.findByIdAndDelete(id);
        if(!deletado){
            return res.status(404).json({erro:'Registro não encontrado'});
        }
        res.status(200).json({msg:'Usuario deletado com sucesso', deletado});
    } catch (error) {
        console.error('Erro ao deletar usuario: ', error);
        res.status(500).json({erro:'Erro ao deletar leitura'});
    }
};