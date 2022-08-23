const { CanvasData } = require('../../database/Models')

exports.SendCanvasData = async function(req, res) {
    const { room_id } = req.params
    try {
        const canvasData = await CanvasData.findOne({ room_id })
        if(canvasData) return res.json({ canvasData })
    } catch (error) {
        console.log(error);
    }
    res.json({ canvasData: null })
}