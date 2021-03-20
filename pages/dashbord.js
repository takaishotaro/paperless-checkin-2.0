import React, { useState } from 'react'
import Router from 'next/router'
import withApollo from '../hoc/withApollo'
import withAuth from '../hoc/withAuth'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../apollo/query'
import Header from '../components/Header'
import { Container, Card, CardTitle, Button, Row, Col,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import CheckInGuide from '../components/checkInGuide'
import QRCode from "qrcode.react"

const dashbord = () => {
  const { data, loading } = useQuery(CURRENT_USER)
  const user = data && data.user || null

  const privateRooms = user && user.rooms.filter((room)=>room.isPrivate===true)
  const dormitoryRooms = user && user.rooms.filter((room)=>room.isPrivate===false)

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal)

  const [roomForModal, setRoomForModal] = useState({})

  const renderModal = (room) => {
    setRoomForModal(room)
    toggle()
  }

  if(loading){ return "読み込み中..."}

  return(
    <div>
      {user ? <Header user={user}/>:<Header/>}
      <Container>
        <div className="d-flex flex-row-reverse">
          <Button className="m-3 p-3 align-items-end" color="primary"　onClick={()=>Router.push("/agreeCovidPolicy")}>コロナ同意書サイン</Button>
        </div>
        <Row className="mt-3">
          <Col>
            <h4 className="text-center mb-4">ドミトリー</h4>
            {
              dormitoryRooms && dormitoryRooms.map((room, index)=>(
                <Card key={index} body inverse color="info" className="mb-5">
                  <CardTitle tag="h5" className="text-center">{room.roomNum}</CardTitle>
                  <Button color="secondary" onClick={(e)=>renderModal(room)}>Check In</Button>
                </Card>
              ))
            }
          </Col>

          <Col>
            <h4 className="text-center mb-4">個室</h4>
            {
              privateRooms && privateRooms.map((room, index)=>(
                <Card key={index} body inverse color="success" className="mb-5">
                  <CardTitle tag="h5" className="text-center">{room.roomNum}</CardTitle>
                <Button color="secondary" onClick={(e)=>renderModal(room)}>Check In</Button>
              </Card>
              ))
            }
          </Col>
          {modal && (
            <Modal isOpen={modal} toggle={toggle} scrollable={true} size="20">
              <ModalHeader toggle={toggle}>{roomForModal.roomNum}でチェックイン</ModalHeader>
              <ModalBody >
                <Container>
                  <Row className="d-flex justify-content-between">
                    <Col md="3" sm="3" className="mb-4">
                      <QRCode value={`${process.env.BASE_URL}/room/${roomForModal.id}`} />
                    </Col>
                    <Col md="8" sm="8" >
                      <CheckInGuide room={roomForModal}/>
                    </Col>
                  </Row>
                </Container>
              </ModalBody>
            </Modal>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default withApollo(withAuth(dashbord))