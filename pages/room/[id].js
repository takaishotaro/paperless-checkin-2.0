import React, { useState, useEffect } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import withApollo from '../../hoc/withApollo'
import { getDataFromTree } from '@apollo/react-ssr'
import { ROOM } from '../../apollo/query'
import { Navbar, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Container, Table, ListGroup, ListGroupItem } from 'reactstrap';

const roomInfo = () => {
  const { id } = useRouter().query;
  const { loading , data } = useQuery(ROOM,{ variables: { roomId: id } } )
  const room = data && data.room || null

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lang, setLang] = useState("JP")

  const toggle = () => setDropdownOpen(!dropdownOpen);

  if(loading){ return '読み込み中...'}

  return(
    <div>
      <Navbar color="light" light className="mb-3" fixed="top">
        <NavbarBrand className="mr-auto">Welcome!!</NavbarBrand>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            言語 / Language
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={()=>setLang("JP")}>日本語</DropdownItem>
            <DropdownItem onClick={()=>setLang("ENG")}>English</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Navbar>

      <Container className="pt-5 mb-5">
        <h4 className="pt-4">Room</h4>
        <Table>
          <tbody>
            <tr className="mt-2">
              <th>Floor</th>
              <td className="pl-3 text-right">{room && room.floor}</td>
            </tr>
            <tr className="mt-2">
              <th>{room.isPrivate ? "Room No.":"Room & Bed No."}</th>
              <td className="pl-3 text-right">{room && room.roomNum}</td>
            </tr>
            { (room && !room.isPrivate) && (
              <tr className="mt-2">
                <th>Safe Box No.</th>
                <td className="pl-3 text-right">{room && room.safeBoxNum}</td>
              </tr>
            )}
          </tbody>
        </Table>

        <h4>PIN</h4>
        <Table>
          <tbody>
            <tr className="mt-2">
              <th>Room PIN</th>
              <td className="pl-3 text-right">{room && room.roomPIN}</td>
            </tr>
            <tr className="mt-2">
              <th>Sub Entrance PIN</th>
              <td className="pl-3 text-right">{room && room.branch.subEntrancePIN}</td>
            </tr>
          </tbody>
        </Table>

        <h4>Wi-Fi</h4>
        <Table>
          <tbody>
            <tr className="mt-2">
              <th>ID</th>
              <td className="pl-3 text-right">{room && room.wifiID}</td>
            </tr>
            <tr className="mt-2">
              <th>PASS</th>
              <td className="pl-3 text-right">{room && room.wifiPASS}</td>
            </tr>
          </tbody>
        </Table>

        <h4>Reception</h4>
        <Table>
          <tbody>
            <tr className="mt-2">
              <th>Open</th>
              <td className="pl-3 text-right">{room && room.branch.openAt}</td>
            </tr>
            <tr className="mt-2">
              <th>Close</th>
              <td className="pl-3 text-right">{room && room.branch.closeAt}</td>
            </tr>
          </tbody>
        </Table>

        <h4>Notices</h4>
        <ListGroup>
          { (room && lang==="JP") && room.branch.noticesJP.map((notice)=><ListGroupItem key={notice}>{notice}</ListGroupItem>)}
          { (room && lang==="ENG") && room.branch.noticesENG.map((notice)=><ListGroupItem key={notice}>{notice}</ListGroupItem>)}
        </ListGroup>
      </Container>
    </div>
  )
}

export default withApollo(roomInfo)