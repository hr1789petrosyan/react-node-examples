import React, { useCallback, useEffect, useState } from 'react'
import { setError, setOptionType } from '../Redux/dispatchers/dispatchers' 
import LoadingRoomList from '../Components/Tools/Loading/Loading'
import Paginate from '../Components/Tools/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import RoomListItem from './RoomLIstItem/RoomListItem'
import SocketService from '../services/SocketService'
import Button from '../Components/UI/Button/Button'
import Modal from '../Modal/Modal'
import './RoomList.css'

function RoomList({ teamName, teamId, user }) {

  const dispatch = useDispatch()
  const error = useSelector(state => state.createRoom.error)

  const [ open, setOpen ] = useState(false)
  const [ roomList, setRoomList ] = useState([])
  const [ pageNumber, setPageNumber ] = useState(0)

  const socket = SocketService()
  const roomsPerPage = 9
  const pagesVisited = pageNumber * roomsPerPage
  const pageCount = Math.ceil(roomList.length / roomsPerPage)

  useEffect(() => {
    dispatch(setOptionType([10, 20, 25].some(i => i === user.role) ? 'Permanent' : 'Temporary'))
  }, [dispatch])

  const changePage = ({ selected }) => setPageNumber(selected)
  const handleShow = () => setOpen(true)
  const handleClose = (bool) => {
    if (!error) {
      setOpen(false)
    } else if (bool) {
      dispatch(setError(null))
      setOpen(false)
    }
  }

  const setRoomsAndOnlineParticipants = useCallback((message) => {
    setRoomList(message.rooms)
  }, [socket])

  useEffect(() => {

    if (!teamId) return

    socket.on('rooms-and-online-participants', setRoomsAndOnlineParticipants)
    
    socket.emit(`${teamId}/online-participants`)

    return () => socket.off('rooms-and-online-participants', setRoomsAndOnlineParticipants)

  }, [teamId, socket])

  return (
    roomList.length ? <>
      <Modal
        handleClose={handleClose}
        teamName={teamName}
        teamId={teamId}
        user={user}
        open={open}
      />
      <div className='page-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='page-title-box d-sm-flex align-items-center'>
                <div className="d-flex justify-content-between w-100 page-title-content">
                  <div className="d-flex align-items-center"><h4 className='mb-sm-0 font-size-18'>Room List</h4></div>
                  <Button
                    onClick={handleShow}
                    className="CreateButton"
                    content="Create Room"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex flex-wrap rooms-container'>
            {
              roomList
                .slice(pagesVisited, pagesVisited + roomsPerPage)
                .filter(room => (
                  room.name !== teamName && room.type !== "Permanent"
                    ? room.participants.length !== 0
                    : room
                ))
                .map((room, index) => (
                  <RoomListItem
                    room={room}
                    key={index}
                    teamId={teamId}
                    user={user}
                    teamName={teamName}
                  />
                ))
            }
          </div>
        </div>
      </div>
      {
        roomList.length > 9 ?
          <Paginate
            changePage={changePage}
            pageCount={pageCount}
          />
          : null
      }
    </>
      : <LoadingRoomList />
  )
}


export default RoomList

