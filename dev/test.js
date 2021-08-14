const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.creatteNewBlock(652754, '8TY76G5Y7VU45VB', 'C98VB7N67V8CVBN');

bitcoin.createNewTransaction(100, 'ALEX9S0AF870DSA', 'JENNK3L25L2K3JH5');
bitcoin.createNewTransaction(99, 'TORI9S0AF870DSA', 'NICKK3L25L2K3JH5');

bitcoin.creatteNewBlock(534334, '6JK5L6G5Y7VU45VB', '5N4MB7N67V8CVBN');

console.log(bitcoin.chain[1].transactions);