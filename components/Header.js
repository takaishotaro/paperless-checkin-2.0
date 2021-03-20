import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../apollo/query';

const Header = (props) => {
  //const {data, loading} = useQuery(CURRENT_USER)
  //const user = data && data.user || null

  const user = props.user || null

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return(
      <Navbar color="light" light className="mb-3">
        <NavbarBrand href="/dashbord" className="mr-auto">{user ? user.name:'Paperless-Checkin'}</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {!user && (
                <NavItem>
                  <NavLink href="/signup">signup</NavLink>
                </NavItem>
              )
            }
            {!user && (
                <NavItem>
                  <NavLink href="/login">login</NavLink>
                </NavItem>
              )
            }
            { user && (
              <NavItem>
                <NavLink href="/agreeCovidPolicy">コロナ同意書サイン</NavLink>
              </NavItem>
            )}
            { user && (
              <NavItem>
                <NavLink href="/addCovidPolicy">コロナ同意書文言を編集</NavLink>
              </NavItem>
            )}
            { user && (
              <NavItem>
                <NavLink href="/userEdit">店舗情報を編集</NavLink>
              </NavItem>
            )}
            { user && (
              <NavItem>
                <NavLink href="/addRoom">部屋を追加</NavLink>
              </NavItem>
            )}
            { user && (
              <NavItem>
                <NavLink href="/roomEdit">部屋を編集</NavLink>
              </NavItem>
            )}
            { user && (
              <NavItem>
                <NavLink href="/addNotices">Noticesを編集</NavLink>
              </NavItem>
            )}
            { user && (
              <NavItem>
                <NavLink href="/logout">ログアウト</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
  )
}

export default Header