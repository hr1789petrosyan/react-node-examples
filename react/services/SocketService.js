import io from "socket.io-client"
import dotenv from 'dotenv'
dotenv.config()

function SocketService(params){
    if(SocketService.exists){
        return SocketService.instance
    }
    
    const socket = io.connect(process.env.REACT_APP_BASE_URL, {
        'path': "/api/socket",
        query: {
            ...params
        }
    })
    
    SocketService.exists = true
    SocketService.instance = socket
    
    return socket

}



export default SocketService