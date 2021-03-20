import { gql } from '@apollo/client'

export const ADD_PRIVATE_ROOM = gql`
  mutation ($floor:Int, $roomNum:String,
    $wifiID:String, $wifiPASS:String,$isPrivate:Boolean
    ){
      addRoom(
        data:{
          floor:$floor, roomNum:$roomNum, wifiID:$wifiID,
          wifiPASS:$wifiPASS, isPrivate:$isPrivate
        }
      ){
        id
      }
  }
`
export const ADD_DORMITORY_ROOM = gql`
  mutation ($floor:Int, $roomNum:String,
    $wifiID:String, $wifiPASS:String,$isPrivate:Boolean,
    $safeBoxNum:String, $roomPIN:String
    ){
      addRoom(
        data:{
          floor:$floor, roomNum:$roomNum, wifiID:$wifiID,
          wifiPASS:$wifiPASS, isPrivate:$isPrivate,
          safeBoxNum:$safeBoxNum, roomPIN:$roomPIN
        }
      ){
        id
      }
  }
`

export const LOGIN = gql`
  mutation ($email:String, $password:String){
    login(email:$email password:$password){
      id
      email
    }
  }
`

export const SIGNUP = gql`
  mutation(
    $email:String,$password:String
    $subEntrancePIN:String,$openAt:String
    $closeAt:String, $name:String
  ){
    signup(
      email:$email, password:$password
      subEntrancePIN:$subEntrancePIN,openAt:$openAt,
      closeAt:$closeAt, name:$name
    ){
      id
      email
    }
  }
`
export const LOGOUT = gql`
  mutation {
    logout{
      id
      email
    }
  }
`

export const UPDATE_NOTICES_JP = gql`
  mutation($noticesJP:[String]){
  editUser(
    noticesJP:$noticesJP
  ){
    id
  }
}
`
export const UPDATE_NOTICES_ENG = gql`
  mutation($noticesENG:[String]){
  editUser(
    noticesENG:$noticesENG
  ){
    id
  }
}
`
export const UPDATE_COVID_JP = gql`
  mutation($covidJP:[String]){
  editUser(
    covidJP:$covidJP
  ){
    id
  }
}
`
export const UPDATE_COVID_ENG = gql`
  mutation($covidENG:[String]){
  editUser(
    covidENG:$covidENG
  ){
    id
  }
}
`
export const UPDATE_ROOM = gql`
  mutation($roomId:String, $data:RoomInputType){
    editRoom(roomId:$roomId, data:$data){
      roomNum
      wifiID
      wifiPASS
      safeBoxNum
      id
    }
  }
`
export const UPDATE_USER = gql`
mutation($name:String, $email:String,
  $subEntrancePIN:String,$openAt:String,$closeAt:String,
){
  editUser(
    name:$name, email:$email,subEntrancePIN:$subEntrancePIN,
    openAt:$openAt, closeAt:$closeAt
  ){
    id
    name
    email
    subEntrancePIN
    openAt
    closeAt
  }
}
`