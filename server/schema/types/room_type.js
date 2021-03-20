const mongoose = require('mongoose')
const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt, GraphQLBoolean
} = graphql

const UserModel = require('../../models/user')

const RoomType = new GraphQLObjectType({
    name: 'RoomType',
    fields: () => ( {
        id: { type: GraphQLID },
        floor: { type: GraphQLInt },
        wifiID: { type: GraphQLString },
        wifiPASS: { type: GraphQLString },
        roomNum: { type: GraphQLString },
        isPrivate: { type: GraphQLBoolean },
        roomPIN: { type: GraphQLString },
        safeBoxNum:{ type: GraphQLString },
        branch: {
          type: require('./user_type'),
          resolve(parent, args){
            return UserModel.findById(parent.branchId)
          }
        }
    })
})

module.exports = RoomType