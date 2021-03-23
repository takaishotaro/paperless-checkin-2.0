import React,{useRef,useState} from 'react'
import Router from 'next/router'
import SignatureCanvas from 'react-signature-canvas'
import { Button, Spinner } from 'reactstrap'

const sign =(props)=>{
  let sigPad = useRef({})
  let data =''

  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)

  const clear = () => {
    setStarted(false)
    sigPad.current.clear()
  }
  const save = () => {
    data=sigPad.current.toDataURL('image/png')
    setLoading(true)

//api--------------------------------------------
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({sign:data, email:props.email, name: props.name});

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
        props.lang==="JP" ? alert('署名が完了しました。ご協力ありがとうございます。'):alert('Thank you for your cooperation!!')
      }).catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  //-----------------------------------------------
  }

  const isValidOperation = () => {
    if(props.name === "" || props.checked===false || !started){
      return false
    } else { return true }
  }

  return(
    <div>
      <SignatureCanvas backgroundColor="#ededed" ref={sigPad}
        canvasProps={{width: 900, height: 200, className: 'sigCanvas'}}
        onBegin={()=>setStarted(true)}
      />
      <Button className="m-1 p-3" onClick={clear}>{props.lang==="JP" ? " 書き直し ":" clear "}</Button>
      <Button className="m-1 p-3" onClick={save} color="primary" disabled={!isValidOperation()}>{props.lang==="JP" ? " 署名完了 ":" done signing "}</Button>
      { loading && (
        <div className="mb-3">
          <Spinner size="sm" color="primary"  className="mt-3"/>
          <span>送信中...</span>
        </div>
      )}
      <div style={{height:50}}></div>
    </div>
  )
}
export default sign