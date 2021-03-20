import React, { useState } from 'react'
import { Navbar, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../apollo/query';

const CheckinHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lang, setLang] = useState("JP")

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return(
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
  )
}
export default CheckinHeader