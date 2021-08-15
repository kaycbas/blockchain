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
    const newTransaction = req.body;
    const blockIdx = bitcoin.addTransactionToPendingTransactions(newTransaction);
    res.json({
        note: `Transaction will be added in block ${blockIdx}.`
    });
})

// create and broadcast a new transaction
app.post('/transaction/broadcast', function (req, res) {
    const {
        amount,
        sender,
        recipient
    } = req.body;
    const newTransaction = bitcoin.createNewTransaction(amount, sender, recipient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);

    const reqPromises = [];
    for (const networkNodeUrl of bitcoin.networkNodes) {
        const reqOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        };

        const reqPromise = rp(reqOptions);
        reqPromises.push(reqPromise);
    }

    Promise.all(reqPromises).then(data => {
        res.json({
            note: 'Successfully created and broadcast transaction.'
        })
    })
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

    // bitcoin.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce, prevBlockHash, newBlockHash);

    const reqPromises = [];
    for (const networkNodeUrl of bitcoin.networkNodes) {
        const reqOptions = {
            uri: networkNodeUrl + '/receive-new-block',
            method: 'POST',
            body: { newBlock: newBlock },
            json: true
        };

        const reqPromise = rp(reqOptions);
        reqPromises.push(reqPromise);
    }

    Promise.all(reqPromises).then(data => {
        const reqOptions = {
            uri: bitcoin.currNodeUrl + '/transaction/broadcast',
            method: 'POST',
            body: {
                amount: 12.5,
                sender: '00',
                recipient: nodeAddress
            },
            json: true
        };

        return rp(reqOptions);
    }).then(data => {
        res.json({
            note: 'New block mined and broadcast successfully',
            block: newBlock
        })
    })
})

app.post('/receive-new-block', function (req, res) {
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.prevBlockHash;
    const correctIdx = lastBlock.index + 1 === newBlock.index;

    if (correctHash && correctIdx) {
        bitcoin.chain.push(newBlock);
        bitcoin.pendingTransactions = [];
        res.json({
            note: 'New block received and accepted.',
            newBlock: newBlock
        })    
    } else {
        res.json({
            note: 'New block rejected.',
            newBlock: newBlock
        })
    }
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
        res.json({
            note: 'New node registered with network successfully.'
        });
    })
})

// register a node with the network
app.post('/register-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = !bitcoin.networkNodes.includes(newNodeUrl);
    const notCurrNode = bitcoin.currNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrNode) {
        bitcoin.networkNodes.push(newNodeUrl);
    }
    res.json({
        note: 'New node registered successfully.'
    });
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

    res.json({
        note: 'Successfully bulk registered nodes.'
    })
})


app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
})