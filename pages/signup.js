import React,{ useState } from 'react'
import Router from 'next/router'
import { useMutation, gql, useQuery } from '@apollo/client'
import withApollo from '../hoc/withApollo'
import Header from '../components/Header'
import {
  Form, FormGroup, Button, Container, Row, Col, Label, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, Table, Spinner
} from 'reactstrap'
import { SIGNUP } from '../apollo/mutation'
import { CURRENT_USER } from '../apollo/query'

const signup = (props) => {
  const { loading: querying, data } = useQuery(CURRENT_USER)
  const user = data && data.user || null

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword]=useState('')
  const [name, setName] = useState('')
  const [subEntrancePIN, setSubEntrancePIN] = useState('')
  const [openAt, setOpenAt] = useState('')
  const [closeAt, setCloseAt] = useState('')

  const [signup, { loading, error }] = useMutation(SIGNUP,{
    refetchQueries: [{ query: CURRENT_USER }],
    awaitRefetchQueries: true,
    variables: { email, password, name, subEntrancePIN, openAt, closeAt  }
  })

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal)
  const openModal = () => {
    if(password===confirmPassword){
      setModal(true)
    } else { alert('passwordと確認用passwordが違います') }
  }

  const isValidOperation = () => {
    if(
      email==="" || password==="" || name ==="" || confirmPassword==="" ||
      subEntrancePIN==="" || openAt==="" || closeAt===""
    ){ return false } else { return true }
  }
  const handleSubmit = () => {
    signup().then(()=>{
      Router.push('/dashbord')
      alert('登録が完了しました。')
    }).catch(e=>alert(e))
  }

  if(querying){ return '...読み込み中'}

  return (
    <div>
      {user ? <Header user={user}/>:<Header/>}
      <Container>
        <Row>
          <Col sm="10" lg="6" xl="4">
            <h3 className="mb-4 mt-3">登録</h3>
            <Form>
              <FormGroup>
                <Label>email</Label>
                <Input
                  type="text" value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>password</Label>
                <Input
                  type="password" value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>確認用password</Label>
                <Input
                  type="password" value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>店舗名</Label>
                <Input
                  type="text" value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>subEntrancePIN</Label>
                <Input
                  type="text" value={subEntrancePIN}
                  onChange={(e)=>setSubEntrancePIN(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>営業開始時刻</Label>
                <Input
                  type="time" value={openAt}
                  onChange={(e)=>setOpenAt(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>営業終了時刻</Label>
                <Input
                  type="time" value={closeAt}
                  onChange={(e)=>setCloseAt(e.target.value)}
                />
              </FormGroup>
              <Button color="primary" disabled={!isValidOperation()} onClick={()=>openModal()}>登録</Button>
            </Form>
            <Modal isOpen={modal} toggle={toggle} className={props.className}>
              <ModalHeader toggle={toggle}>登録情報確認</ModalHeader>
              <ModalBody>
                <Table>
                  <tbody>
                    <tr className="mt-2">
                      <th>email</th>
                      <td className="pl-3">{email}</td>
                    </tr>
                    <tr className="mt-2">
                      <th>店舗名</th>
                      <td className="pl-3">{name}</td>
                    </tr>
                    <tr className="mt-2">
                      <th>subEntrancePIN</th>
                      <td className="pl-3">{subEntrancePIN}</td>
                    </tr>
                    <tr className="mt-2">
                      <th>営業開始時刻</th>
                      <td className="pl-3">{openAt}</td>
                    </tr>
                    <tr className="mt-2">
                      <th>営業終了時刻</th>
                      <td className="pl-3">{closeAt}</td>
                    </tr>
                  </tbody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={()=>handleSubmit()} disabled={loading}>登録</Button>{' '}
                <Button color="secondary" onClick={toggle}>キャンセル</Button>
                { loading && (
                    <div className="mb-2">
                      <Spinner size="sm" color="primary"/>
                      <span className="ml-2">処理中...</span>
                    </div>
                  )}
              </ModalFooter>
            </Modal>

          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default withApollo(signup)