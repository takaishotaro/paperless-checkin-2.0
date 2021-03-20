import React, { useState, useEffect } from "react";
import { LOGOUT } from '../apollo/mutation'
import { useMutation } from "@apollo/client";
import Redirect from "../components/Redirect";
import withApollo from "../hoc/withApollo";

const logout = () => {
  const [ logout, { loading }] = useMutation(LOGOUT)

  useEffect(()=>{
    logout()
  },[])

  if(loading){ return "処理中..."}

  return <Redirect to="/login"></Redirect>
}

export default withApollo(logout)