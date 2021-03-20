import React from "react";
import { useQuery } from '@apollo/client'
import Header from "../components/Header";
import { CURRENT_USER } from "../apollo/query";
import withApollo from "../hoc/withApollo";
import withAuth from "../hoc/withAuth";
import { Container, Col, Row } from 'reactstrap'
import AddCovidJP from '../components/AddCovidJP'
import AddCovidENG from '../components/AddCovidENG'

const addCovid = () => {
  const { loading: querying, data } = useQuery(CURRENT_USER)
  const user = data && data.user || null
  const covidJPData = data && data.user.covidJP || []
  const covidENGData = data && data.user.covidENG || []

  if(querying){return '...読み込み中'}

  return (
    <div>
      {user ? <Header user={user}/>:<Header/>}
      <Container fluid={true}>
        <Row>
          <Col>
            <AddCovidJP covidJPData={covidJPData} className="mb-3"/>
          </Col>
          <Col>
            <AddCovidENG covidENGData={covidENGData}/>
          </Col>
        </Row>
      </Container>
</div>
  )
}

export default withApollo(withAuth(addCovid))