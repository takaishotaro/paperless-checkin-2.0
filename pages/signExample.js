import React, { useState, createRef, useRef } from "react"
import Router from 'next/router'
import { useQuery } from "@apollo/client"
import { Navbar, NavbarBrand, Dropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Container, Col,
  FormGroup, Label, Input, Row, Button, Spinner
} from 'reactstrap';

import SignatureCanvas from 'react-signature-canvas'
import { useScreenshot } from "use-react-screenshot";

const signExample = () => {
  const today = new Date();
  const stringToday = today.toLocaleString({ timeZone: 'Asia/Tokyo' }).split(' ')[0]

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lang, setLang] = useState("JP")
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const checkBoxChange = () => setChecked(!checked)

  //===============
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => takeScreenshot(ref.current)
//===============
  let sigPad = useRef({})

  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const clear = () => {
    setStarted(false)
    sigPad.current.clear()
  }
  const save = async () => {
    setLoading(true)
    const generatedImage = await getImage()

    //api--------------------------------------------
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ sign: generatedImage, email, date: stringToday });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("/signImage/example", requestOptions)
    .then(result => {
      console.log(result)
      setLoading(false)
      alert('署名が完了しました。ご入力いただきましたメールアドレスにこの書類を送信します。')
    }).catch(error => {
      console.log('error', error)
      alert(error)
      setLoading(false)
    });

  //-----------------------------------------------
  }
  const isValidOperation = () => {
    if( checked===false || !started || loading || email==="" ){
      return false
    } else { return true }
  }

  return(
    <div>
      <Navbar color="light" light className="mb-3">
        <NavbarBrand  href="/dashbord" className="mr-auto">Example</NavbarBrand>
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

    <Container>
      <div ref={ref}>
          <h3 className="mt-4 border-bottom">{lang==="JP" ? "同意書(Example)":"Terms and conditions for example"}</h3>
          <p>{lang==="JP" ? "テスト署名になります。":"This is test signing."}</p>
          <ul>
            <li>{lang==="JP" ? "文言1":"sentence1"}</li>
            <li>{lang==="JP" ? "文言2":"sentence2"}</li>
            <li>{lang==="JP" ? "文言3":"sentence3"}</li>
          </ul>

          <p className="mt-2">{stringToday}</p>
          <FormGroup check className="mb-2">
            <Label check>
              <Input type="checkbox" checked={checked} onChange={checkBoxChange}/>{' '}
              {lang==="JP" ? "同意する":"Agree"}
            </Label>
          </FormGroup>

          <p className="mt-2">{lang==="JP" ? "灰色の欄に署名をお願いします。":"Please sign here."}</p>

        <SignatureCanvas backgroundColor="#ededed" ref={sigPad}
          canvasProps={{width: 900, height: 200, className: 'sigCanvas'}}
          onBegin={()=>setStarted(true)}
        />
    </div>

      <FormGroup>
        <Label>書類の送付先メールアドレスをこちらにご記入ください。</Label>
        <Input
            type="text" placeholder="email"
            value={email} onChange={(e)=>setEmail(e.target.value)}
          />
      </FormGroup>
      <Button className="m-1 p-3" onClick={clear}>{lang==="JP" ? " 書き直し ":" clear "}</Button>
      <Button className="m-1 p-3" onClick={save} color="primary" disabled={!isValidOperation()}>{lang==="JP" ? " 署名完了 ":" done signing "}</Button>
      { loading && (
        <span className="ml-3 mb-3">
          <Spinner size="sm" color="primary"  className="mt-3"/>
          <span>送信中...</span>
        </span>
      )}
      <div style={{height:50}}></div>
    </Container>

  </div>
  )
}

export default signExample