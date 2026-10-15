const Pet = require('../models/Pet');
const cloudinary = require('../config/cloudinary');

module.exports.listarTodosPets = async (req, res) => {
    try {
        const { status } = req.query; //?status=PENDENTE

        let filtro = {};
        if (status) {
            filtro['moderacao.status'] = status.toUpperCase();
        }
        const pets = await Pet.find(filtro).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: pets
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            erro: 'Erro interno do servidor'
        })
    }
};

//Aprovar PET
module.exports.aprovarPet = async (req, res) => {
    try {
        const { id } = req.params; //api/admin/pets/:id/aprovar

        //1.Atualiza pet
        const pet = await Pet.findByIdAndUpdate(
            id, {
            'moderacao.status': 'APROVADO',
            'moderacao.moderador': req.user.id, // vem do authMiddleware
            'moderacao.dataModeracao': new Date()
        },
            { new: true } //retorna documento atualizado
        );

        //2. Se não encontrar 
        if (!pet) {
            return res.status(404).json({
                success: false,
                erro: 'Pet não encontrado'
            });
        };

        //3. Pet atualizado
        return res.status(200).json({
            success: true,
            msg: 'Pet aprovado com sucesso',
            data: pet
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            erro: 'Erro ao aprovar pet'
        });
    }
};

//Reprovar Cadastro PET
module.exports.reprovarPet = async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await Pet.findByIdAndUpdate(
            id, {
            'moderacao.status': 'REJEITADO',
            'moderacao.moderador': req.user.id,
            'moderacao.dataModeracao': new Date()
        },
            { new: true }
        );

        if (!pet) {
            return res.status(404).json({
                success: false,
                erro: 'Pet não encontrado'
            });
        };

        return res.status(200).json({
            success: true,
            msg: 'Pet reprovado',
            data: pet
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            erro: 'Erro ao reprovar pet'
        });
    }
};

//Deletar PET
module.exports.deletarPet = async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await Pet.findByIdAndDelete(id);

        if (!pet) {
            return res.status(404).json({
                success: false,
                erro: 'Pet não encontrado'
            });
        };

        if (pet.foto?.publicId) {
            await cloudinary.uploader.destroy(pet.foto.publicId);
        };

        return res.status(200).json({
            success: true,
            msg: 'Pet deletado com sucesso',
            id: pet._id
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            erro: 'Erro ao deletar pet'
        });
    }
};

module.exports.mudarEstadoLocalizado = async (req, res) => {
    try {
        const { id } = req.params;        

        const pet = await Pet.findByIdAndUpdate(
            id, {
            estado: 'LOCALIZADO'
        },
            { new: true, runValidators: true }
        );

        if (!pet) {
            return res.status(404).json({
                success: false,
                erro: 'Pet não encontrado'
            })
        };
        return res.status(200).json({
            success: true,
            msg: 'Estado do Pet atualizado para Localizado',
            data: pet
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            erro: 'Erro ao alterar estado do pet'
        });
    }
};

module.exports.mudarEstadoAdotado = async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await Pet.findByIdAndUpdate(
            id, {
            estado: 'ADOTADO'
        },
            { new: true, runValidators: true }
        );

        if (!pet) {
            return res.status(404).json({
                success: false,
                erro: 'Pet não encontrado'
            })
        };
        return res.status(200).json({
            success: true,
            msg: 'Estado do Pet atualizado para Adotado',
            data: pet
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            erro: 'Erro ao alterar estado do pet'
        });
    }
};

module.exports.mudarEstadoEncerrado = async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await Pet.findByIdAndUpdate(
            id, {
            estado: 'ENCERRADO'
        },
            { new: true, runValidators: true }
        );

        if (!pet) {
            return res.status(404).json({
                success: false,
                erro: 'Pet não encontrado'
            })
        };
        return res.status(200).json({
            success: true,
            msg: 'Estado do Pet atualizado para Encerrado',
            data: pet
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            erro: 'Erro ao alterar estado do pet'
        });
    }
};

module.exports.mudarEstadoAtivar = async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await Pet.findByIdAndUpdate(
            id, {
            estado: 'ATIVO'
        },
            { new: true, runValidators: true }
        );

        if (!pet) {
            return res.status(404).json({
                success: false,
                erro: 'Pet não encontrado'
            })
        };
        return res.status(200).json({
            success: true,
            msg: 'Estado do Pet atualizado para ATIVADO',
            data: pet
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            erro: 'Erro ao alterar estado do pet'
        });
    }
};