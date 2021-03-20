import React,{ useState } from 'react'
import Router from 'next/router'
import { useMutation, gql, useQuery } from '@apollo/client'
import { useForm } from "react-hook-form";
import withApollo from '../hoc/withApollo'
import Header from '../components/Header'
import { Form, FormGroup, Button, Container, Row, Col, Spinner } from 'reactstrap'
import { LOGIN } from '../apollo/mutation'
import { CURRENT_USER } from '../apollo/query'

const login = () => {
  const [login, { loading, error }] = useMutation(LOGIN,{
    refetchQueries: [{ query: CURRENT_USER }],
    awaitRefetchQueries: true
  })

  const { register, handleSubmit } = useForm();

  const onSubmitForLogin = ({email, password}) => {
    login({
      variables:{ email, password }
    })
    .then(()=>Router.push('/dashbord'))
    .catch(e=>alert(e))
  }

  return (
    <div>
      <Header/>
      <Container>
        <Row>
          <Col sm="10" lg="6" xl="4">
            <h3 className="mb-4 mt-3">ログイン</h3>
            <Form onSubmit={handleSubmit(onSubmitForLogin)}>
              <FormGroup>
                  <input className="form-control" type="text" name="email" placeholder="email" ref={register}/>
              </FormGroup>
              <FormGroup>
                  <input className="form-control" type="password" name="password" placeholder="password" ref={register}/>
              </FormGroup>
              <Button color="primary" type="submit">ログイン</Button>
            </Form>
            { loading && (
              <div>
                <Spinner size="sm" color="primary"  className="mt-3"/>
                <span>ログイン中...</span>
              </div>
            )}

          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default withApollo(login)