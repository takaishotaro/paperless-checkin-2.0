const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  branchId: {
    type: String,
    required: true
  },
  floor:{
    type: Number,
    required: true
  },
  wifiID: {
    type: String,
    required: true
  },
  wifiPASS: {
    type: String,
    required: true
  },
  roomNum: {
    type: String,
    required: true
  },
  isPrivate: {
    type: Boolean,
    required: true
  },
  roomPIN: {
    type: String,
    required: false
  },
  safeBoxNum:{
    type: String,
    required: false
  }
});

module.exports=mongoose.model('room', RoomSchema);