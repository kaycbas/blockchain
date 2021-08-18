const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

// bitcoin.creatteNewBlock(652754, '8TY76G5Y7VU45VB', 'C98VB7N67V8CVBN');

// bitcoin.createNewTransaction(100, 'ALEX9S0AF870DSA', 'JENNK3L25L2K3JH5');
// bitcoin.createNewTransaction(99, 'TORI9S0AF870DSA', 'NICKK3L25L2K3JH5');

// bitcoin.creatteNewBlock(534334, '6JK5L6G5Y7VU45VB', '5N4MB7N67V8CVBN');

// --

// const prevBlockHash = '4GH5KJ32LH234J12LKJ';
// const currBlockData = [{
//         amount: 10,
//         sender: 'H54JK32L243JKLJJ',
//         recipient: '6VBMN345234M5NB'
//     },
//     {
//         amount: 20,
//         sender: 'j45k32K32L243JKLJJ',
//         recipient: '5kl43MN345234M5NB'
//     },
//     {
//         amount: 30,
//         sender: 'BNM5JK32L243JKLJJ',
//         recipient: '6BN5MN345234M5NB'
//     },
// ];
// const nonce = 4322;
// hash = bitcoin.hashBlock(prevBlockHash, currBlockData, nonce);

// const nonce = bitcoin.proofOfWork(prevBlockHash, currBlockData);
// const hash = bitcoin.hashBlock(prevBlockHash, currBlockData, nonce);

// console.log(bitcoin);

const btc1 = {
    "chain": [{
            "index": 1,
            "timestamp": 1629252620477,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "prevBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1629252682487,
            "transactions": [],
            "nonce": 192133,
            "hash": "000073e7d35d35be0861f043cae54db47715fe0d145fd49bd5964140949f2a31",
            "prevBlockHash": "0"
        },
        {
            "index": 3,
            "timestamp": 1629252683349,
            "transactions": [{
                "amount": 12.5,
                "sender": "00",
                "recipient": "706f16d0ffc911eb9cf94fdae8f9efd3",
                "transactionId": "95678170ffc911eb9cf94fdae8f9efd3"
            }],
            "nonce": 9831,
            "hash": "00008e43ca658df8784825a05fe3b3587339e35c8b42d3a7e103becce357e52f",
            "prevBlockHash": "000073e7d35d35be0861f043cae54db47715fe0d145fd49bd5964140949f2a31"
        },
        {
            "index": 4,
            "timestamp": 1629252684251,
            "transactions": [{
                "amount": 12.5,
                "sender": "00",
                "recipient": "706f16d0ffc911eb9cf94fdae8f9efd3",
                "transactionId": "95e8e670ffc911eb9cf94fdae8f9efd3"
            }],
            "nonce": 19971,
            "hash": "000077811b6a07fe1a9993b3c9f6949c060ba229cdd05c612f3d42e0467ec361",
            "prevBlockHash": "00008e43ca658df8784825a05fe3b3587339e35c8b42d3a7e103becce357e52f"
        },
        {
            "index": 5,
            "timestamp": 1629252685073,
            "transactions": [{
                "amount": 12.5,
                "sender": "00",
                "recipient": "706f16d0ffc911eb9cf94fdae8f9efd3",
                "transactionId": "967288d0ffc911eb9cf94fdae8f9efd3"
            }],
            "nonce": 7444,
            "hash": "00009f34cf731580fbf7d748d04204603aecdc2912844a18cb2a9a6a0784260c",
            "prevBlockHash": "000077811b6a07fe1a9993b3c9f6949c060ba229cdd05c612f3d42e0467ec361"
        }
    ],
    "pendingTransactions": [{
        "amount": 12.5,
        "sender": "00",
        "recipient": "706f16d0ffc911eb9cf94fdae8f9efd3",
        "transactionId": "96eff630ffc911eb9cf94fdae8f9efd3"
    }],
    "currNodeUrl": "http://localhost:3001",
    "networkNodes": []
}

console.log(bitcoin.chainIsValid(btc1.chain));