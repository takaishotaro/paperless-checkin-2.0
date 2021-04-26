const express = require('express')
const next = require('next')
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose')
const {graphqlHTTP} = require('express-graphql');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const schema = require('./schema/schema');

app.prepare().then(() => {
  const server = express();

  const MONGO_URI = require('./config').DB_URI;

  mongoose.Promise = global.Promise;

  mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  mongoose.connection
      .once('open', () => console.log('Connected to MongoLab instance.'))
      .on('error', error => console.log('Error connecting to MongoLab:', error));

  server.use(session({
    name: 'user-session',
    secret: require('./config').SESSION_SECRET,
    cookie: { maxAge: 10 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: MONGO_URI,
      collection: 'userSessions'
    })
  }))

  server.use(passport.initialize());
  server.use(passport.session());

  server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))
  // =================================================
  server.use(bodyParser.urlencoded({ extended: true, limit:'10mb' }))
  server.use(bodyParser.json({extended: true, limit:'10mb'}))

  const router = require('./routes/file')

  server.use(router)
// =================================================

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
