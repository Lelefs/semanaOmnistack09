const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res) {
        const { filename } = req.file;
        const { empresa, techs, valor } = req.body;
        const { userid } = req.headers;

        const user = await User.findById(userid);

        if (!user) {
            return res.status(400).json({error: 'Usuário não existe'})
        }

        const spot = await Spot.create({
            user: userid,
            imagem: filename,
            empresa,
            techs: techs.split(',').map(tech => tech.trim()),
            valor
        })

        return res.json(spot)
    }
};