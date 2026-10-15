const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatorio'],
        trim: true,
        minlength: 3,
        maxlength: 80
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/,
            'E-mail inválido.']
    },
    senha: {
        type: String,
        required:[true, 'A senha é obrigatoria'],
        minlength:6,
        select:false
    },
    cargo: {
        type: String,
        enum: ['ADMIN', 'MODERADOR'],
        default: 'MODERADOR'
    },    
    ativo: {
        type: Boolean,
        default: true
    },
    ultimoLogin: {
            type: Date,
            default: null
        }
}, {
    timestamps: true
});

UserSchema.pre('save', async function() {

    if (!this.isModified('senha')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);   

});

UserSchema.methods.compararSenha = async function (senhaInformada) {
    return await bcrypt.compare(
        senhaInformada,
        this.senha
    );
};

module.exports = mongoose.model('User', UserSchema);