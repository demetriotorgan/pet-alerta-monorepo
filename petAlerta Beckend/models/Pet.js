const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
    {
        nomeAnimal: {
            type: String,
            default: 'Animal sem identificação',
            trim: true,
            maxlength: 50
        },

        especie: {
            type: String,
            required: [true, "A espécie é obrigatória."],
            enum: ["CACHORRO", "GATO", "OUTRO"]
        },

        raca: {
            type: String,
            required: false,
            default: 'SRD',
            trim: true,
            maxlength: 40
        },

        sexo: {
            type: String,
            required: [true, "O sexo do animal é obrigatório."],
            enum: ["MACHO", "FEMEA"]
        },

        idade: {
            type: String,
            enum: ["FILHOTE", "ADULTO", "IDOSO", "NAO-INFORMADO"],
            default: "NAO-INFORMADO"
        },
        porte: {
            type: String,
            required: [true, "O porte do animal é obrigatório."],
            enum: ["PEQUENO", "MEDIO", "GRANDE"]
        },

        cor: {
            type: String,
            required: [true, "A cor do animal é obrigatória."],
            trim: true,
            maxlength: 40
        },

        categoria: {
            type: String,
            required: [true, "A categoria do animal é obrigatória."],
            enum: ["DOACAO", "ENCONTRADO", "ABANDONADO", "PERDIDO", "CAMPANHA"]
        },
        estado: {
            type: String,
            enum: [
                'ATIVO',
                'ADOTADO',
                'LOCALIZADO',
                'ENCERRADO'
            ],
            default: 'ATIVO'
        },        
        descricao: {
            type: String,
            required: [true, "A descrição do animal é obrigatória."],
            trim: true,
            minlength: 1,
            maxlength: 500
        },

        cidade: {
            type: String,
            required: [true, "A cidade é obrigatória."],
            trim: true,
            maxlength: 80,
            uppercase: true
        },
        nomeResponsavel: {
            type: String,
            required: [true, "O nome do responsável é obrigatório."],
            trim: true,
            maxlength: 80
        },
        telefone: {
            type: String,
            required: [true, "O telefone é obrigatório."],
            trim: true,
            validate: {
                validator: function (v) {
                    return /^\d{10,11}$/.test(v);
                },
                message: "Telefone inválido."
            }
        },

        foto: {
            url: {
                type: String,
                required: true
            },
            publicId: {
                type: String,
                required: true
            }
        },
        moderacao: {
            status: {
                type: String,
                enum: [
                    'PENDENTE',
                    'APROVADO',
                    'REJEITADO'
                ],
                default: 'PENDENTE'
            },

            moderador: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                default: null
            },

            dataModeracao: {
                type: Date,
                default: null
            }
        }
    },
    {
        timestamps: true
    }
);

PetSchema.index({ cidade: 1 });

PetSchema.index({ especie: 1 });

PetSchema.index({ situacao: 1 });

PetSchema.index({ porte: 1 });

PetSchema.index({ sexo: 1 });

PetSchema.index({ idade: 1 });

PetSchema.index({ cor: 1 });

PetSchema.index({ createdAt: -1 });

PetSchema.index({
    cidade: 1,
    situacao: 1
});

PetSchema.index({
    especie: 1,
    porte: 1
});

module.exports = mongoose.model('Pet', PetSchema);