const errorHandler = require('../utils/errorHandler');
const Cargo = require('../models/Cargo')


module.exports.getAll = async function (req, res){
    try {
        const cargo = await Cargo.find({
            user:req.user.id
        })
        res.status(200).json(cargo)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res){
    try {
        const cargo = await new Cargo({
            data: req.body.data,
            user: req.user.id
        }).save();
        res.status(201).json(cargo)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res){
    try {
        await Cargo.remove({_id: req.params.id})
        res.status(200).json({
            message:'Удалено!'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function (req, res){
    try {
        const cargo = await Cargo.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(cargo)
    } catch (e) {
        errorHandler(res, e)
    }
}