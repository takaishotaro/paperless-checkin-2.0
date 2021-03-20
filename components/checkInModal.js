import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import QRCode from "qrcode.react"

const checkInModal = (props) => {
  return(
    <Modal isOpen={props.modal} toggle={props.toggle}>
    <ModalHeader toggle={props.toggle}>{props.roomNum}でチェックイン</ModalHeader>
      <ModalBody className="text-center">
        <QRCode value={`/room/${props.id}`} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>キャンセル</Button>
      </ModalFooter>
    </Modal>
  )
}

export default checkInModal