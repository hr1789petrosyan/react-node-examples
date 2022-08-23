import React from 'react'
import { handleJoinRoom } from '../../HelperFunctions/Room/handleJoinRoom'
import Button from '../../Components/UI/Button/Button'
import Participant from './Participant/Participant'
import { useDispatch } from 'react-redux'
import './RoomListItem.css'

const RoomListItem = ( { teamName, teamId, room, user } ) => {
    const dispatch = useDispatch()
    const participants = []
    room.participants.forEach(p => {
        participants.push({
            firstName: p.firstname,
            lastName: p.lastname,
            avatar: p.avatar
        })
    })

    return (
        <>
            <div className='row' style={{ width: '35%', marginTop: '20px', minWidth: '240px' }}>
                <div className="col-xl-4 col-ls-4 col-sm-12" style={{ background: "#f8f8fb" }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-shrink-0 me-4"></div>
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="text-truncate font-size-15">
                                        <a className="text-dark room-name">
                                            { room.name != teamId ? room.name : teamName }
                                        </a>
                                    </h5>
                                    {
                                        <p className="text-muted mb-4 room-description">
                                            { 
                                                room.name == teamName 
                                                    ? "Main Room" 
                                                    : room.description || "Here can be description for room" 
                                            }
                                        </p>
                                    }
                                    <div className="avatar-group">
                                        <Participant
                                            participants={participants}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-2 border-top">
                            <ul className="list-inline mb-0 d-flex justify-content-between align-items-center">
                                <li className="list-inline-item me-3">
                                    <span 
                                        className={room.participants.length 
                                            ? "badge bg-success InProgress" 
                                            : "badge bg-success Completed"
                                        }
                                    > 
                                        { 
                                            room.participants.length 
                                                ? "In progress" 
                                                : "Completed"
                                        }
                                    </span>
                                </li>
                                <Button
                                    onClick={ e => handleJoinRoom(e, user.id, teamId, dispatch) }
                                    className="JoinButton"
                                    content="Join"
                                    htmlContent={ <p className='d-none'>{room.name}</p> }
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default RoomListItem