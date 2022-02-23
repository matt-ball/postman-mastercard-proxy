const express = require('express')
const clientEncryption = require('mastercard-client-encryption')
const config = require('./config')
const app = express()
app.use(express.json())

app.post('/', (req, res) => {
  const reqBody = req.body
  const resource = req.header('Resource')
  const fle = new clientEncryption.FieldLevelEncryption(config)
  const encryptedRequestPayload = fle.encrypt(resource, null, reqBody)

  res.send(encryptedRequestPayload.body)
})

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port
  console.log(`App listening on port ${port}`)
})
