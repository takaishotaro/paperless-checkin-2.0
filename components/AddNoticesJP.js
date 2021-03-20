import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_NOTICES_JP } from '../apollo/mutation'
import { CURRENT_USER } from '../apollo/query'
import { Form, FormGroup, Button, Col, Input, Card, CardBody, } from 'reactstrap'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsFillTrashFill } from "react-icons/bs";

const AddNoticesJP = (props) => {
  const [notices, setNotices] = useState(props.noticesJPData);
  const [newNotice, setNewNotice]=useState('')

  const [ updateNotices, { loading }] = useMutation(UPDATE_NOTICES_JP,{
    variables: { noticesJP: notices },
    refetchQueries: [{ query: CURRENT_USER }],
    awaitRefetchQueries: true
  })
  const handleOnDragEnd = (result) => {
    const items = Array.from(notices);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNotices(items);
  }
  const handleDelete=(index)=>{
    const items = Array.from(notices);
    items.splice(index,1)
    setNotices(items)
  }
  const handleAdd = () => {
    const items = Array.from(notices);
    items.push(newNotice)
    setNotices(items)
    setNewNotice('')
  }
  const handleSubmit = () => {
    updateNotices().then(()=>{
      alert('noticesを更新しました。')
    }).catch(e=>alert(e))
  }
  const reset = () => setNotices(props.noticesJPData)

  return(
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between mb-4 mt-3">
          <h4>日本語Notices</h4>
          <div>
            <Button color="primary" disabled={loading} onClick={()=>handleSubmit()}>{loading ? "保存中...": "保存"}</Button>
            <Button className="ml-2" color="danger" disabled={loading} onClick={()=>reset()}>リセット</Button>
          </div>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="hoge">
          {(provided) => (
            <ul
              className="list-group"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {notices.map((notice, index) => {
                return (
                  <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <li
                        className="list-group-item d-flex justify-content-between"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>{notice}</div>
                        <BsFillTrashFill size={21} onClick={()=>handleDelete(index)}/>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Form className="mt-4">
        <FormGroup row>
          <Col xl={11} lg={11} md={11} sm={11} xs={10}>
            <Input
              type="text" placeholder="Noticeを追加"
              value={newNotice} onChange={(e)=>setNewNotice(e.target.value)}
            />
          </Col>
          <Col xl={1} lg={1} md={1} sm={1} xs={2} className="d-flex flex-row-reverse">
            <Button disabled={newNotice==="" || loading } onClick={()=>handleAdd()}>+</Button>
          </Col>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
  )
}

export default AddNoticesJP