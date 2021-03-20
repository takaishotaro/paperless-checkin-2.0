const mongoose = require('mongoose')
const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt, GraphQLBoolean
} = graphql

const UserModel = require('../../models/user')

const SignType = new GraphQLObjectType({
    name: 'SignType',
    fields: () => ( {
        id: { type: GraphQLID },
        branch: {
          type: require('./user_type'),
          resolve(parent, args){
            return UserModel.findById(parent.branchId)
          }
        },
        image: { type: GraphQLString }
    })
})

module.exports = SignType