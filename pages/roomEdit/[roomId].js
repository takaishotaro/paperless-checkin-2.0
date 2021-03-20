import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client'
import { ROOM, CURRENT_USER } from '../../apollo/query'
import Header from '../../components/Header'
import {
  Form, FormGroup, Button, Container, Row, Col, Label, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, Table, Spinner
} from 'reactstrap'
import withApollo from '../../hoc/withApollo'
import withAuth from '../../hoc/withAuth'
import { getDataFromTree } from '@apollo/react-ssr'
import { UPDATE_ROOM } from '../../apollo/mutation';

const edit = () => {
  const { roomId } = useRouter().query;
  const { loading: userQuerying, data: userData } = useQuery(CURRENT_USER)
  const user = userData && userData.user || null
  const { loading: querying , data: queryData } = useQuery(ROOM,{ variables: { roomId } } )
  const room = queryData && queryData.room || {floor:0,roomNum:'',wifiID:'',wifiPASS:"",isPrivate:false,roomPIN:'',safeBoxNum:""}

  const [ floor, setFloor ] = useState(1)
  const [ roomNum, setRoomNum ] = useState('')
  const [ wifiID, setWifiID ] = useState('')
  const [ wifiPASS, setWifiPASS ] = useState('')
  const [ roomType, setRoomType ] = useState('')
  const [ isPrivate, setIsPrivate ] = useState(false)
  const [ roomPIN, setRoomPIN ] = useState('')
  const [ safeBoxNum, setSafeBoxNum ] = useState('')

  const [ editRoom, { loading: mutating } ] = useMutation(UPDATE_ROOM,{
    variables:{
      roomId,
      data: { floor, roomNum, wifiID, wifiPASS, isPrivate, roomPIN, safeBoxNum }
    },
    refetchQueries: [{ query: ROOM }],
    awaitRefetchQueries: true
  })

  useEffect(()=>{
    setFloor(room.floor)
    setRoomNum(room.roomNum)
    setWifiID(room.wifiID)
    setWifiPASS(room.wifiPASS)
    setIsPrivate(room.isPrivate)
    setRoomPIN(room.roomPIN)
    setSafeBoxNum(room.safeBoxNum)
  },[querying])

  useEffect(()=>{
    isPrivate ? setRoomType("個室"): setRoomType("ドミトリー")
  },[isPrivate])

  useEffect(()=>{
    roomType==="個室" ? setIsPrivate(true) : setIsPrivate(false)
  },[roomType])

  const isValidOperation = () => {
    if(isPrivate){
      if(roomNum === "" || wifiID === "" || wifiPASS === ""){
        return false
      } else { return true }
    } else {
      if(roomNum === "" || wifiID === "" || wifiPASS === "" ||
        roomPIN === "" || safeBoxNum === ""
      ){
        return false
      } else { return true }
    }
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal)

  const handleSubmit = () => {
    editRoom().then(()=>{
      setModal(false)
      alert(`${roomNum}の内容を更新しました。`)
    }).catch((e)=>{
      setModal(false)
      alert(e)
    })
  }

  if(querying){ return '読み込み中'}

  return(
    <div>
      { user ? <Header user={user}/>:<Header/>}
      <Container>
        <Row>
          <Col xl="8">
            <h3 className="mb-4 mt-3">{roomNum}を編集</h3>
            <Form>
              <FormGroup row>
                <Label sm={3}>Floor</Label>
                <Col sm={9}>
                  <Input
                    type="number" value={parseInt(floor)}
                    onChange={(e)=>setFloor(parseInt(e.target.value))}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>部屋番号</Label>
                <Col sm={9}>
                  <Input
                    type="text" value={roomNum}
                    onChange={(e)=>setRoomNum(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>wifiID</Label>
                <Col sm={9}>
                  <Input
                    type="text" value={wifiID}
                    onChange={(e)=>setWifiID(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>wifiPASS</Label>
                <Col sm={9}>
                  <Input
                    type="text" value={wifiPASS}
                    onChange={(e)=>setWifiPASS(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>部屋タイプ</Label>
                <Col sm={9}>
                  <Input
                    type="select" value={roomType}
                    onChange={(e)=>setRoomType(e.target.value)}
                  >
                    <option>ドミトリー</option>
                    <option>個室</option>
                  </Input>
                </Col>
              </FormGroup>
              { !isPrivate && (
                <div>
                  <FormGroup row>
                    <Label sm={3}>roomPIN</Label>
                    <Col sm={9}>
                      <Input
                        type="text" value={roomPIN}
                        onChange={(e)=>setRoomPIN(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={3}>safeBoxNum</Label>
                    <Col sm={9}>
                      <Input
                        type="text" value={safeBoxNum}
                        onChange={(e)=>setSafeBoxNum(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                </div>
              )}
              <Button onClick={toggle} color="primary" className="mt-3" disabled={!isValidOperation()}>  更新する </Button>
            </Form>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>更新内容確認</ModalHeader>
              <ModalBody>
                <Table>
                  <tbody>
                    <tr className="mt-2">
                      <th>Floor</th>
                      <td className="pl-3">{floor}</td>
                    </tr>
                    <tr className="mt-2">
                      <th>部屋番号</th>
                      <td className="pl-3">{roomNum}</td>
                    </tr>
                    <tr className="mt-2">
                      <th>wifiID</th>
                      <td className="pl-3">{wifiID}</td>
                    </tr>
                    <tr className="mt-2">
                      <th>wifiPASS</th>
                      <td className="pl-3">{wifiPASS}</td>
                    </tr>
                    { !isPrivate && (
                        <tr className="mt-1">
                          <th>roomPIN</th>
                          <td className="pl-3">{roomPIN}</td>
                        </tr>
                    )}
                    { !isPrivate && (
                      <tr className="mt-1">
                        <th>safeBoxNum</th>
                        <td className="pl-3">{safeBoxNum}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" disabled={mutating} onClick={()=>handleSubmit()}>更新する</Button>{' '}
                <Button color="secondary" onClick={toggle}>キャンセル</Button>
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

export default withApollo(withAuth(edit, { getDataFromTree }))