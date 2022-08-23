const Socket = require('socket.io')

class SocketServer {
    constructor(httpsServer) {
        if(!SocketServer.instance){
            SocketServer.instance = Socket(httpsServer, {
                path: "/api/socket",
                serverClient: true
            })
        }
    }
}


module.exports = SocketServer

