# Blockchain + Network Nodes
## What it is
This is an implementation of a proof-of-work blockchain plus decentralized network nodes for maintaining the blockchain. This was built as part of the Udemy course Learn Blockchain By Building Your Own In JavaScript.

## Features
- A proof of work algorithm to secure the network.
- Hashing algorithms to secure the data within the blockchain.
- The ability to mine (create) new blocks that contain data.
- The ability to create transactions and store them in blocks.
- An API/server that will be used to interact with the blockchain from the internet.
- It will be hosted on a decentralized blockchain network.
- A consensus algorithms to verify that the network nodes have valid data and are synchronized.
- A broadcasting system to keep the data in the blockchain network synchronized.

## Getting Started
1. Run `npm install`
2. In separate tabs, run `npm run node_1`, `npm run node_2`, ..., and `npm run node_5` to start five network nodes. These nodes will start on `localhost:3001` through `localhost:3005`
3. To connect all the nodes together: from Postman, hit one of the nodes with the following request, substituting the body out with the address of each other node.
**POST** `localhost:3001/register-and-broadcast-node`
body: `{ "newNodeUrl": "http://localhost:3002" }`
4. To broadcast a transaction, hit one of the nodes with a request like:
**POST** `localhost:3001/transaction/broadcast`
body: `{
    "amount": 500,
    "sender": "DN6M539UJN4K5B5JK4L",
    "recipient": "DN6M539U4JN4K5B5JK4L"
}`
5. To view the blockchain, hit any of the nodes from the browser via `http://localhost:3001/blockchain`
6. To mine a new block, hit any of the nodes from the browser via `http://localhost:3001/mine`
7. To explore the existing blockchain via the blockexplorer, hit any of the nodes from the browser via `http://localhost:3001/block-explorer`
