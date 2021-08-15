const sha256 = require('sha256');
const currNodeUrl = process.argv[3];
const {
    v1: uuid
} = require('uuid');

class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];

        this.currNodeUrl = currNodeUrl;
        this.networkNodes = [];

        this.createNewBlock(100, '0', '0');
    }

    createNewBlock(nonce, prevBlockHash, hash) {
        const newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce: nonce,
            hash: hash,
            prevBlockHash: prevBlockHash
        };

        this.pendingTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    createNewTransaction(amount, sender, recipient) {
        const newTransaction = {
            amount,
            sender,
            recipient,
            transactionId: uuid().split('-').join('')
        };
        
        return newTransaction;
    }
    
    addTransactionToPendingTransactions(transactionObj) {
        this.pendingTransactions.push(transactionObj);
        return this.getLastBlock()['index'] + 1;
    }

    hashBlock(prevBlockHash, currBlockData, nonce) {
        const dataAsStr = prevBlockHash + JSON.stringify(currBlockData) + nonce.toString();
        const hash = sha256(dataAsStr);
        return hash;
    }

    proofOfWork(prevBlockHash, currBlockData) {
        let nonce = 0;
        let hash = this.hashBlock(prevBlockHash, currBlockData, nonce);

        while (hash.substring(0, 4) !== '0000') {
            nonce++;
            hash = this.hashBlock(prevBlockHash, currBlockData, nonce);
        }

        return nonce;
    }
}

module.exports = Blockchain;