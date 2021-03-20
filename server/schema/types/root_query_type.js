const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;
const UserType = require('./user_type')
const RoomType = require('./room_type')
const RoomModel = require('../../models/room')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: ()=>({
    user: {
      type: require('./user_type'),
      resolve(parentValue, args, req){
        return req.user;
      }
    },
    room: {
      type: require('./room_type'),
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }, req){
        return RoomModel.findById(id)
      }
    },
  })
});

module.exports = RootQueryType;
