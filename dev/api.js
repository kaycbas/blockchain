const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')

const bitcoin = new Blockchain()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/blockchain', function (req, res) {
    res.send(bitcoin)
})

app.post('/transaction', function (req, res) {
    const { amount, sender, recipient } = req.body;
    const blockIdx = bitcoin.createNewTransaction(amount, sender, recipient);
    res.json({ note: `Transaction will be added in block ${blockIdx}.` });
})

app.get('/mine', function (req, res) {

})

app.listen(3000, function () {
    console.log('Listening on port 3000...');
})