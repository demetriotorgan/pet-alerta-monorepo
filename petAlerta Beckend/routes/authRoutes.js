const express = require('express');
const {criarUsuario, login, getMe, listarUsuarios, deletarUsuario} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//rotas publicas
router.post('/register', criarUsuario );
router.post('/login', login);

//Rotas privadas
router.get('/me', authMiddleware, getMe);
router.get('/usuarios', authMiddleware, listarUsuarios);
router.delete('/:id/deletar', authMiddleware, deletarUsuario);

module.exports = router;