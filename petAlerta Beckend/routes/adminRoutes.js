const express = require('express');
const authorize = require('../middlewares/authorize');
const authMiddleware = require('../middlewares/authMiddleware');
const { rotaPrivadaTeste } = require('../controllers/authController');
const { listarTodosPets, aprovarPet, reprovarPet, deletarPet, mudarEstadoLocalizado, mudarEstadoAdotado, mudarEstadoEncerrado, mudarEstadoAtivar } = require('../controllers/adminPetController');
const router = express.Router();

router.get('/perfil', authMiddleware, authorize('ADMIN', 'MODERADOR'), rotaPrivadaTeste);
router.get('/pets', authMiddleware,authorize('ADMIN', 'MODERADOR'),listarTodosPets);

//Rotas de moderação
router.patch('/pets/:id/aprovar', authMiddleware, authorize('ADMIN', 'MODERADOR'), aprovarPet);
router.patch('/pets/:id/reprovar', authMiddleware, authorize('ADMIN', 'MODERADOR'), reprovarPet);
router.delete('/pets/:id/deletar', authMiddleware, authorize('ADMIN'), deletarPet);

//Rotas de mudança de estado
router.patch('/pets/:id/localizar', authMiddleware, authorize('ADMIN'), mudarEstadoLocalizado);
router.patch('/pets/:id/adotar', authMiddleware, authorize('ADMIN'), mudarEstadoAdotado);
router.patch('/pets/:id/encerrar', authMiddleware, authorize('ADMIN'), mudarEstadoEncerrado);
router.patch('/pets/:id/ativar', authMiddleware, authorize('ADMIN'), mudarEstadoAtivar);

module.exports = router;