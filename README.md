# Blockchain + Network Nodes
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

## Running the Network
1. Run `npm install`

3. In separate tabs, run `npm run node_1`, `npm run node_2`, ..., and `npm run node_5` to start five network nodes. These nodes will start on `localhost:3001` through `localhost:3005`

5. To connect all the nodes together, hit one of the nodes with the following request, substituting the body out with the address of each other node.

    #### POST /register-and-broadcast-node

    Example: POST http://localhost:3001/register-and-broadcast-node

    Request body:
        [
            {
               "newNodeUrl": "http://localhost:3002"
            }
        ]

4. To create and broadcast a transaction to the network, you can hit the following endpoint (the sender and recipient addresses in this case are made up):

    #### POST /transaction/broadcast

    Example: POST http://localhost:3001/transaction/broadcast

    Request body:
        [
            {
               "amount": 500,
                "sender": "DN6M539UJN4K5B5JK4L",
                "recipient": "DN6M539U4JN4K5B5JK4L"
            }
        ]

5. To view the blockchain, hit the following endpoint on any node in the network:

    #### GET /blockchain

    Example: GET http://localhost:3001/blockchain

8. To mine a new block, hit the following endpoint on any node in the network: `http://localhost:3001/mine`

    #### GET /mine

    Example: GET http://localhost:3001/mine

10. To explore the existing blockchain using the blockexplorer GUI, hit the following endpoint from the browser:

    #### GET /block-explorer

    Example: GET http://localhost:3001/mine
