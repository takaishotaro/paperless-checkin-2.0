import React,{ useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import withApollo from '../hoc/withApollo'
import Header from '../components/Header'
import {
  Form, FormGroup, Button, Container, Row, Col, Label, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, Table, Spinner
} from 'reactstrap'
import { CURRENT_USER } from '../apollo/query'
import withAuth from '../hoc/withAuth'
import { UPDATE_USER } from '../apollo/mutation'

const userEdit = () => {
  const { loading: querying, data } = useQuery(CURRENT_USER)
  const user = data && data.user || {email:"",name:"",subEntrancePIN:"",openAt:"",closeAt:""}

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [subEntrancePIN, setSubEntrancePIN] = useState('')
  const [openAt, setOpenAt] = useState('')
  const [closeAt, setCloseAt] = useState('')

  const [updateUser,{ loading: mutating }] = useMutation(UPDATE_USER,{
    variables: {email, name, subEntrancePIN, openAt, closeAt},
    refetchQueries: [{ query: CURRENT_USER }],
    awaitRefetchQueries: true
  })

  useEffect(()=>{
    setEmail(user.email)
    setName(user.name)
    setSubEntrancePIN(user.subEntrancePIN)
    setOpenAt(user.openAt)
    setCloseAt(user.closeAt)
  },[querying])

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal)

  const isValidOperation = () => {
    if(
      email==="" ||  name ==="" ||
      subEntrancePIN==="" || openAt==="" || closeAt===""
    ){ return false } else { return true }
  }
  const handleSubmit = () => {
    updateUser().then((res)=>{
      setModal(false)
      alert('更新しました。')
      console.log(res)
    }).catch(e=>{
      setModal(false)
      alert(e)
    })
  }

  if(querying){ return '...読み込み中'}

  return (
    <div>
      {user ? <Header user={user}/>:<Header/>}
      <Container>
        <Row>
          <Col sm="10" lg="6" xl="4">
            <h3 className="mb-4 mt-3">店舗情報更新</h3>
            <Form>
              <FormGroup>
                <Label>email</Label>
                <Input
                  type="text" value={email}
                  onChange={(e)=>setEmail(e.target.value)}
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
              <Button color="primary" disabled={!isValidOperation()} onClick={toggle}>更新</Button>
            </Form>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>更新内容確認</ModalHeader>
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
                <Button color="primary" onClick={()=>handleSubmit()} disabled={mutating}>更新</Button>{' '}
                <Button color="secondary" onClick={()=>toggle()}>キャンセル</Button>
                { mutating && (
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
export default withApollo(withAuth(userEdit))