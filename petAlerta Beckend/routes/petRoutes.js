const express = require('express');
const router = express.Router();

const upload = require('../middlewares/uploadMiddleware');

const { criarPet, listarPets, limparPets } = require('../controllers/petController');

router.post('/pets', upload.single('foto'), criarPet);
router.get('/pets', listarPets);

router.delete('/pets/:id', limparPets);

module.exports = router;