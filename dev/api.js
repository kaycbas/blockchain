const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const uuid = require('uuid/v1');
const Blockchain = require('./blockchain')

const nodeAddress = uuid().split('-').join('');
const bitcoin = new Blockchain()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// get entire blockchain
app.get('/blockchain', function (req, res) {
    res.send(bitcoin)
})

// create a new transaction
app.post('/transaction', function (req, res) {
    const { amount, sender, recipient } = req.body;
    const blockIdx = bitcoin.createNewTransaction(amount, sender, recipient);
    res.json({ note: `Transaction will be added in block ${blockIdx}.` });
})

// mine a block
app.get('/mine', function (req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const prevBlockHash = lastBlock.hash;
    const currBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock.index + 1
    }
    const nonce = bitcoin.proofOfWork(prevBlockHash, currBlockData);
    const newBlockHash = bitcoin.hashBlock(prevBlockHash, currBlockData, nonce);

    bitcoin.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce, prevBlockHash, newBlockHash);

    res.json({
        note: "New block mined successfully",
        block: newBlock
    })
})

app.listen(3000, function () {
    console.log('Listening on port 3000...');
})