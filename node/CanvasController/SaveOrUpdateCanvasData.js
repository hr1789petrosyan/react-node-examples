const { CanvasData } = require('../../database/Models')
const mongoose = require('mongoose')

exports.canvasPencilData = async function(req, res) {
    res.json({ succes: true }).end()

    const { lastPencilData } = req.body 
    const { room_id } = req.params

    try {
        const existedPencilData = await CanvasData.findOne({ room_id })
        if(existedPencilData) {
            existedPencilData.pencilData.push(lastPencilData)
            await existedPencilData.save();
        }else {
            const canvasData = new CanvasData({ _id: new mongoose.Types.ObjectId, room_id, pencilData: [ lastPencilData ] })
            await canvasData.save()
        }
    } catch (error) {
        console.log(error);
    }

    
}

exports.createOrUpdateShapeIdentity = async function(req, res) {
    res.json({ succes: true }).end()

    const { selectedShapeIdentity } = req.body
    const { room_id } = req.params

    try {
        await CanvasData.findOneAndUpdate({ room_id, selectedShapeIdentity, new: true })
    } catch (error) {
        console.log(error);
    }
}

exports.objectModified = async function(req, res) {
    res.json({ succes: true }).end()

    const { objectModified } = req.body
    const { room_id } = req.params

    try {
        if(objectModified.text && objectModified.text === "") {
            await CanvasData.updateOne(
                { room_id },
                { "$pull": { "fabricsData": { "identity": +objectModified.identity } }},
                { upsert: false, multi: true }
            )
            return true
        }
        await CanvasData.findOneAndUpdate(
            {
                room_id,
                fabricsData: { $elemMatch: {identity: objectModified.identity}}
            },
            { $set: {'fabricsData.$': objectModified} },
            { 'new': true, 'safe': true, 'upsert': true } 
        )
    } catch (error) {
        console.log(error);
    }

}


exports.addObject = async function(req, res) {
    res.json({ succes: true }).end()

    const { objectInfo } = req.body
    const { room_id } = req.params

    
    try {
        const roomExistedData = await CanvasData.findOne({room_id})
        if(roomExistedData) {
            roomExistedData.fabricsData.push(objectInfo)
            await roomExistedData.save()
        } else {
            const newCanvasData = new CanvasData({ _id: new mongoose.Types.ObjectId, room_id, fabricsData: [ objectInfo ], selectedShapeIdentity: null })
            await newCanvasData.save()
        }
    } catch (error) {
        console.log(error);
    }

}


exports.deleteObject = async function(req, res) {
    res.json({ succes: true }).end()

    const { room_id, identity } = req.params

    console.log(req.params)
    
    try {
        await CanvasData.updateOne(
            { room_id },
            { "$pull": { "fabricsData": { "identity": +identity } }},
            { upsert: false, multi: true }
        )
    } catch (error) {
        console.log(error);
    }

}

exports.deleteActiveShapeIdentity = async function(req, res) {
    res.json({ succes: true }).end()

    const { room_id } = req.params

    try {
        await CanvasData.findOneAndUpdate({ room_id, selectedShapeIdentity: null })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteCanvasData = async function(req, res) {
    res.json({ succes: true }).end()

    const { room_id } = req.params

    await CanvasData.findOneAndDelete({ room_id })
}





