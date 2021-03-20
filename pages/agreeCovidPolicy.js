import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { CURRENT_USER } from '../apollo/query'
import withApollo from "../hoc/withApollo";
import withAuth from "../hoc/withAuth";
import { Navbar, NavbarBrand, Dropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Container, Col,
  FormGroup, Label, Input, Row
} from 'reactstrap';
import Sign from '../components/sign'

const welcome = () => {
  const { loading: querying, data } = useQuery(CURRENT_USER)
  const user = data && data.user || null

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lang, setLang] = useState("JP")
  const [checked, setChecked] = useState(false)
  const [name, setName] = useState('')

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const checkBoxChange = () => setChecked(!checked)
  console.log(checked)

  if(querying){ return '読み込み中'}

  return(
    <div>
      <Navbar color="light" light className="mb-3">
        <NavbarBrand className="mr-auto">And Hostel</NavbarBrand>
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
        <h3 className="mt-4 border-bottom">{lang==="JP" ? "コロナウイルス感染防止対策協力同意書":"Terms and conditions for Coronavirus Prevention"}</h3>
        <p>{lang==="JP" ? "ご滞在いただくにあたり、以下の事項につきまして徹底いただきますようお願い申し上げます。":"We ask you to thoroughly adhere to the following items when you stay."}</p>
        <ul>
          {(lang==="JP") && user.covidJP.map((notice, index)=><li key={index}>{notice}</li>)}
          {(lang==="ENG") && user.covidENG.map((notice, index)=><li key={index}>{notice}</li>)}
        </ul>
        <p>{lang==="JP" ? "皆様が快適にご滞在できますようご協力をお願い致します。":"We ask for your cooperation so that everyone is able to enjoy a comfortable stay."}</p>
        <p className="mt-3">{lang==="JP" ? "このフォームに記入頂いた個人情報については、不正アクセスや漏洩が発生しないよう厳重に管理いたします。なお、万が一施設内で感染者が発生した場合には、このフォームに記入した個人情報を所定機関（保健所等）に提出することとします。":"Personal information entered in this form will be strictly managed to prevent unauthorized access and leakage. In the unlikely event that an infected person occurs in the facility, the personal information entered in this form will be submitted to the public health center."}</p>
        <FormGroup check className="mb-2">
          <Label check>
            <Input type="checkbox" checked={checked} onChange={checkBoxChange}/>{' '}
            {lang==="JP" ? "同意する":"Agree"}
          </Label>
        </FormGroup>
        <Row>
          <Col md={6} lg={6} sm={6} >
            <FormGroup>
              <Label>{lang==="JP" ? "ご氏名":"name"}</Label>
              <Input
                type="text" value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <p className="mt-2">{lang==="JP" ? "灰色の欄に署名をお願いします。":"Please sign here."}</p>
        <Sign lang={lang} name={name} checked={checked} email={user.email}/>
      </Container>

    </div>
  )
}

export default withApollo(withAuth(welcome))