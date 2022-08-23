import React from 'react'
import { Link } from 'react-router-dom'
import './Participant.css'
import dotenv from 'dotenv'
dotenv.config()

const Participant = ({ participants }) => {
    return (
        participants.length ?
            <>
                {
                    participants.map((participant, index) => {
                        return (
                            index <= 2
                                ?
                                <div
                                    key={index}
                                    className="avatar-group-item"
                                >
                                    <Link to='' className="d-inline-block">
                                        <img
                                            src={
                                                participant.avatar.startsWith("/avatars")
                                                    ? process.env.REACT_APP_WEB_URL + participant.avatar
                                                    : participant.avatar
                                            }
                                            className='avatar-xs'
                                        />
                                    </Link>
                                    <div className='participant-info'>
                                        {participant.firstName + " " + participant.lastName}
                                    </div>
                                </div>
                                : null
                        )
                    })
                }
                {
                    participants.length > 3
                        ? <div className="avatar-group-item more-participants">
                            {`+ ${participants.length - 3}`}
                        </div>
                        : null
                }
            </>
            : null
    )
}

export default Participant