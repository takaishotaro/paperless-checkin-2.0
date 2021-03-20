import { Card, Navbar, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Container, Table, ListGroup, ListGroupItem, CardBody } from 'reactstrap';

const checkInGuide = ({room}) => {
  return(
    <Card>
      <CardBody>
        <h4>Room</h4>
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
              { (room && !room.isPrivate) && (
                <tr className="mt-2">
                  <th>Room PIN</th>
                  <td className="pl-3 text-right">{room && room.roomPIN}</td>
                </tr>
              )}
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
            { room && room.branch.noticesJP.map((notice)=><ListGroupItem key={notice}>{notice}</ListGroupItem>)}
          </ListGroup>
      </CardBody>
    </Card>
  )
}

export default checkInGuide