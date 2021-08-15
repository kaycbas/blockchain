const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

// bitcoin.creatteNewBlock(652754, '8TY76G5Y7VU45VB', 'C98VB7N67V8CVBN');

// bitcoin.createNewTransaction(100, 'ALEX9S0AF870DSA', 'JENNK3L25L2K3JH5');
// bitcoin.createNewTransaction(99, 'TORI9S0AF870DSA', 'NICKK3L25L2K3JH5');

// bitcoin.creatteNewBlock(534334, '6JK5L6G5Y7VU45VB', '5N4MB7N67V8CVBN');

// --

const prevBlockHash = '4GH5KJ32LH234J12LKJ';
const currBlockData = [
    {
        amount: 10,
        sender: 'H54JK32L243JKLJJ',
        recipient: '6VBMN345234M5NB'
    },
    {
        amount: 20,
        sender: 'j45k32K32L243JKLJJ',
        recipient: '5kl43MN345234M5NB'
    },
    {
        amount: 30,
        sender: 'BNM5JK32L243JKLJJ',
        recipient: '6BN5MN345234M5NB'
    },
];
// const nonce = 4322;
// hash = bitcoin.hashBlock(prevBlockHash, currBlockData, nonce);

const nonce = bitcoin.proofOfWork(prevBlockHash, currBlockData);
const hash = bitcoin.hashBlock(prevBlockHash, currBlockData, nonce);

console.log(hash);