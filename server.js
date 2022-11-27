const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Webpage Created')
})

app.listen(port, () => {
  console.log(`Ready To host at : ${port}`)
})