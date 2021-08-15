const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')
const rp = require('request-promise');
const {
    v1: uuid
} = require('uuid');

const app = express()
const port = process.argv[2];

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
    const {
        amount,
        sender,
        recipient
    } = req.body;
    const blockIdx = bitcoin.createNewTransaction(amount, sender, recipient);
    res.json({
        note: `Transaction will be added in block ${blockIdx}.`
    });
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

// register a node and broadcast it to the network
app.post('/register-and-broadcast-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if (!bitcoin.networkNodes.includes(newNodeUrl)) {
        bitcoin.networkNodes.push(newNodeUrl);
    }

    const regNodePromises = [];
    for (const networkNodeUrl of bitcoin.networkNodes) {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: {
                newNodeUrl: newNodeUrl
            },
            json: true
        };

        const reqPromise = rp(requestOptions);
        regNodePromises.push(reqPromise);
    }

    Promise.all(regNodePromises).then(data => {
        const bulkRegOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: {
                allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currNodeUrl]
            },
            json: true
        }

        return rp(bulkRegOptions);
    }).then(data => {
        res.json({ note: 'New node registered with network successfully.' });
    })
})

// register a node with the network
app.post('/register-node', function (req, res) {
    const newNodeUrl = req.body.networkNodeUrl;
    const nodeNotAlreadyPresent = !bitcoin.networkNodes.includes(newNodeUrl);
    const notCurrNode = bitcoin.currNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrNode) {
        bitcoin.networkNodes.push(newNodeUrl);
    }
    res.json({ note: 'New node registered successfully.' });
})

// register nodes in bulk
app.post('/register-nodes-bulk', function (req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;
    for (const networkNodeUrl of allNetworkNodes) {
        const nodeNotAlreadyPresent = !bitcoin.networkNodes.includes(networkNodeUrl);
        const notCurrNode = bitcoin.currNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrNode) {
            bitcoin.networkNodes.push(networkNodeUrl);
        }
    }

    res.json({ note: 'Successfully bulk registered nodes.'})
})


app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
})