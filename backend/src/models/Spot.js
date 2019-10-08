const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    imagem: String,
    empresa: String,
    valor: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('imagem_url').get(function() {
    return `http://localhost:3333/files/${this.imagem}`
})

module.exports = mongoose.model('Spot', SpotSchema);