import React from 'react'
import withApollo from '../../hoc/withApollo'
import withAuth from '../../hoc/withAuth'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../../apollo/query'
import Header from '../../components/Header'
import { Container, Card, CardTitle, Button, Row, Col } from 'reactstrap'
import Router from 'next/router'

const roomList = () => {
  const { data, loading } = useQuery(CURRENT_USER)
  const user = data && data.user || null

  const privateRooms = user && user.rooms.filter((room)=>room.isPrivate===true)
  const dormitoryRooms = user && user.rooms.filter((room)=>room.isPrivate===false)

  if(loading){ return "読み込み中..."}

  return(
    <div>
      {user ? <Header user={user}/>:<Header/>}
      <Container>
        <Row>
          <Col>
            <h4 className="text-center mb-4">ドミトリー</h4>
            {
              dormitoryRooms && dormitoryRooms.map((room, index)=>(
                <Card key={index} body inverse color="info" className="mb-5">
                  <CardTitle tag="h5" className="text-center">{room.roomNum}</CardTitle>
                <Button color="secondary" onClick={()=>Router.push(`/roomEdit/${room.id}`)}>編集</Button>
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
                <Button color="secondary" onClick={()=>Router.push(`/roomEdit/${room.id}`)}>編集</Button>
              </Card>
              ))
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withApollo(withAuth(roomList))