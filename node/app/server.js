// BEGIN Database client & stuff
const client = require('mongodb').MongoClient

const MONGO_URL = process.env.MONGO_URL
console.log('MONGO_URL : ', MONGO_URL)
const connection = client.connect(MONGO_URL)
  .then(db => (console.log(`Got DB`), db))
  .catch(console.error)

const listUsers = filters => connection
  .then(db =>
    db.collection('usersTest')
      .find(filters)
      .toArray())
  .catch(console.error)

const addUser = user => connection
  .then(db =>
    db.collection('usersTest')
      .insert(user))
  .catch(console.error)
// END Database client & stuff

// BEGIN REST API stuff
const app = require('express')()
const bodyParser = require('body-parser').json()
app.use(bodyParser)

app.get('/users', (req, res) => {
  listUsers()
    .then(users => res.json(users))
    .catch(x => {
      console.error(x)
      res.status(400).end('Bad Request')
    })
})

app.post('/users', (req, res) => {
  const user = req.body

  addUser(user)
    .then(res.json(user))
    .catch(res.status(400).end('Bad Request'))
})

app.listen(8080, () => { console.log('Working on 8080') })
// END REST API stuff
