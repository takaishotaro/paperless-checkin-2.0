import React,{useRef,useState} from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from 'reactstrap'

const testing=()=>{
  let sigPad = useRef({})
  let data =''

  const clear = () => {
    sigPad.current.clear()
  }
  const save = () => {
    data=sigPad.current.toDataURL('image/png')

    const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({sign:data});

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("/signImage/createFile", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }
  const show = () => {
    sigPad.current.fromDataURL(data)
    console.log(data)
  }

  return(
    <div>
  <SignatureCanvas penColor='green' backgroundColor="#ededed" ref={sigPad}
    canvasProps={{width: 1024, height: 500, className: 'sigCanvas'}}
  />
  <Button className="m-1" onClick={clear}>clear</Button>
  <Button className="m-1" onClick={save}>save</Button>
  <Button className="m-1" onClick={show}>show</Button>
  </div>
  )
}
export default testing