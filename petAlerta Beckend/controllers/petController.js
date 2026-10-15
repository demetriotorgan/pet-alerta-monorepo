const Pet = require('../models/Pet');
const uploadImagem = require('../services/cloudinaryService');

module.exports.criarPet = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                erro: 'A foto do animal é obrigatória'
            });
        }

        const resultado = await uploadImagem(req.file.buffer);

        const dadosPet = {
            ...req.body,
            foto: {
                url: resultado.url,
                publicId: resultado.publicId,
                format: resultado.format,
                width: resultado.width,
                height: resultado.height
            }
        };

        const pet = await Pet.create(dadosPet);

        return res.status(201).json({
            success: true,
            data: pet
        });

    } catch (error) {
        // Erro de validação do Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Dados inválidos',
                details: Object.values(error.errors).map(e => e.message)
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Erro interno no servidor'
        });

    }
};

module.exports.listarPets = async (req, res) => {
    try {
        //filtra apenas aprovados
        const pets = await Pet.find({
            'moderacao.status':'APROVADO'            
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: pets.length,
            data: pets
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: 'Erro interno no servidor'
        });

    }
};

module.exports.limparPets = async (req, res) => {
    try {

        const resultado = await Pet.deleteMany({});

        res.status(200).json({
            mensagem: "Todos os Pets foram removidas.",
            totalRemovidos: resultado.deletedCount
        });

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }
};
