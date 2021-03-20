import React from "react";
import { useQuery } from '@apollo/client'
import Header from "../components/Header";
import { CURRENT_USER } from "../apollo/query";
import withApollo from "../hoc/withApollo";
import withAuth from "../hoc/withAuth";
import { Container, Col, Row } from 'reactstrap'
import AddNoticesJP from '../components/AddNoticesJP'
import AddNoticesENG from '../components/AddNoticesENG'

const addNotices = () => {
  const { loading: querying, data } = useQuery(CURRENT_USER)
  const user = data && data.user || null
  const noticesJPData = data && data.user.noticesJP || []
  const noticesENGData = data && data.user.noticesENG || []

  if(querying){return '...読み込み中'}

  return (
    <div>
      {user ? <Header user={user}/>:<Header/>}
      <Container fluid={true}>
        <Row>
          <Col>
            <AddNoticesJP noticesJPData={noticesJPData} className="mb-3"/>
          </Col>
          <Col>
            <AddNoticesENG noticesENGData={noticesENGData}/>
          </Col>
        </Row>
      </Container>
</div>
  )
}

export default withApollo(withAuth(addNotices))