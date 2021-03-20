const mongoose = require('mongoose')
const graphql = require('graphql')
const {
    GraphQLObjectType, GraphQLBoolean,
    GraphQLString, GraphQLList, GraphQLInt
} = graphql
const AuthService = require('../services/auth')

const UserType = require('./types/user_type')
const RoomType = require('./types/room_type')
const RoomInputType = require('./types/room_input_type')

const RoomModel = require('../models/room')

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        signup:{
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                name:{ type: GraphQLString },
                subEntrancePIN: { type: GraphQLString },
                openAt: { type: GraphQLString },
                closeAt: { type: GraphQLString },
            },
            resolve(parentValue, args, req) {
                return AuthService.signup({ ...args, req })
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req){
                const { user } = req
                req.logout()
                return user
            }
        },
        editUser: {
            type: UserType,
            args: {
                name:{ type: GraphQLString },
                password: { type: GraphQLString },
                email: { type: GraphQLString },
                subEntrancePIN: { type: GraphQLString },
                openAt: { type: GraphQLString },
                closeAt: { type: GraphQLString },
                noticesJP: { type: new GraphQLList(GraphQLString) },
                noticesENG: { type: new GraphQLList(GraphQLString) },
                covidJP: { type: new GraphQLList(GraphQLString) },
                covidENG: { type: new GraphQLList(GraphQLString) }
            },
            async resolve(parent, args, req){
                const updates = Object.keys(args)
                updates.forEach((update)=>req.user[update]=args[update])
                await req.user.save()
                return req.user
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req ){
                return AuthService.login({ email, password, req })
            }
        },
        addRoom: {
            type: RoomType,
            args: { data: { type: RoomInputType } },
            async resolve(parentValue, { data }, req ){
                const room = new RoomModel({ branchId: req.user.id, ...data })
                await room.save()
                return room
            }
        },
        editRoom: {
            type: RoomType,
            args: {
                roomId: { type: GraphQLString },
                data: { type: RoomInputType }
            },
            async resolve(parentValue, { roomId, data }, req ){
                const updates = Object.keys(data)
                const room = await RoomModel.findById(roomId)
                updates.forEach((update)=>room[update]=data[update])
                await room.save()
                return room
            }
        }
    }
})

module.exports = mutation