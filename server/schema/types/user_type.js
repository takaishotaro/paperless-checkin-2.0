const mongoose = require('mongoose')
const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID, GraphQLList
} = graphql
const RoomType = require('./room_type')
const RoomModel = require('../../models/room')

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        name:{ type: GraphQLString },
        subEntrancePIN: { type: GraphQLString },
        openAt: { type: GraphQLString },
        closeAt: { type: GraphQLString },
        rooms: {
          type: new GraphQLList(RoomType),
          resolve(parent, args){
            return RoomModel.find({ branchId: parent.id }).sort("roomNum")
          }
        },
        noticesJP: { type: new GraphQLList(GraphQLString) },
        noticesENG: { type: new GraphQLList(GraphQLString) },
        covidJP: { type: new GraphQLList(GraphQLString) },
        covidENG: { type: new GraphQLList(GraphQLString) }
    }
})

module.exports = UserType