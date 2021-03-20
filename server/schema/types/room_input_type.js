const graphql = require('graphql')
const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLInt, GraphQLBoolean
} = graphql

const RoomInputType = new GraphQLInputObjectType({
    name: 'RoomInputType',
    fields: () => ( {
      floor: { type: GraphQLInt },
      wifiID: { type: GraphQLString },
      wifiPASS: { type: GraphQLString },
      roomNum: { type: GraphQLString },
      isPrivate: { type: GraphQLBoolean },
      roomPIN: { type: GraphQLString },
      safeBoxNum:{ type: GraphQLString }
    })
})

module.exports = RoomInputType