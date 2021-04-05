import React, { useState, createRef, useRef } from "react"
import Router from 'next/router'
import { useQuery } from "@apollo/client"
import { CURRENT_USER } from '../apollo/query'
import withApollo from "../hoc/withApollo";
import withAuth from "../hoc/withAuth";
import { Navbar, NavbarBrand, Dropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Container, Col,
  FormGroup, Label, Input, Row, Button, Spinner
} from 'reactstrap';

import SignatureCanvas from 'react-signature-canvas'
import { useScreenshot } from "use-react-screenshot";

const agreeCovidPolicy = () => {
  const { loading: querying, data } = useQuery(CURRENT_USER)
  const user = data && data.user || null
  const today = new Date();
  const stringToday = today.toLocaleString({ timeZone: 'Asia/Tokyo' }).split(' ')[0]

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lang, setLang] = useState("JP")
  const [checked, setChecked] = useState(false)

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
    const raw = JSON.stringify({ sign: generatedImage, email: user.email, date: stringToday });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("/signImage/createFile", requestOptions)
    .then(result => {
      console.log(result)
      setLoading(false)
      Router.push('/dashbord')
      lang==="JP" ? alert('署名が完了しました。ご協力ありがとうございます。'):alert('Thank you for your cooperation!!')
    }).catch(error => {
      console.log('error', error)
      alert(error)
      setLoading(false)
    });

  //-----------------------------------------------
  }
  const isValidOperation = () => {
    if( checked===false || !started || loading ){
      return false
    } else { return true }
  }

  if(querying){ return '読み込み中'}

  return(
    <div>
      <Navbar color="light" light className="mb-3">
        <NavbarBrand  href="/dashbord" className="mr-auto">{user.name}</NavbarBrand>
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

      <div ref={ref}>
        <Container>

          <h3 className="mt-4 border-bottom">{lang==="JP" ? "コロナウイルス感染防止対策協力同意書":"Terms and conditions for Coronavirus Prevention"}</h3>
          <p>{lang==="JP" ? "ご滞在いただくにあたり、以下の事項につきまして徹底いただきますようお願い申し上げます。":"We ask you to thoroughly adhere to the following items when you stay."}</p>
          <ul>
            {(lang==="JP") && user.covidJP.map((notice, index)=><li key={index}>{notice}</li>)}
            {(lang==="ENG") && user.covidENG.map((notice, index)=><li key={index}>{notice}</li>)}
          </ul>
          <p>{lang==="JP" ? "皆様が快適にご滞在できますようご協力をお願い致します。":"We ask for your cooperation so that everyone is able to enjoy a comfortable stay."}</p>
          <p className="mt-3">{lang==="JP" ? "このフォームに記入頂いた個人情報については、不正アクセスや漏洩が発生しないよう厳重に管理いたします。なお、万が一施設内で感染者が発生した場合には、このフォームに記入した個人情報を所定機関（保健所等）に提出することとします。":"Personal information entered in this form will be strictly managed to prevent unauthorized access and leakage. In the unlikely event that an infected person occurs in the facility, the personal information entered in this form will be submitted to the public health center."}</p>

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
      </Container>
    </div>

    <Container>
      <Button className="m-1 p-3" onClick={clear}>{lang==="JP" ? " 書き直し ":" clear "}</Button>
      <Button className="m-1 p-3" onClick={save} color="primary" disabled={!isValidOperation()}>{lang==="JP" ? " 署名完了 ":" done signing "}</Button>
      { loading && (
        <div className="mb-3">
          <Spinner size="sm" color="primary"  className="mt-3"/>
          <span>送信中...</span>
        </div>
      )}
      <div style={{height:50}}></div>
    </Container>

  </div>
  )
}

export default withApollo(withAuth(agreeCovidPolicy))