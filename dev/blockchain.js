const sha256 = require('sha256');

class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
    }

    creatteNewBlock(nonce, prevBlockHash, hash) {
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
            recipient
        };

        this.pendingTransactions.push(newTransaction);

        // return the number of the block this transaction will be included in
        return this.getLastBlock()['index'] + 1;
    }

    hashBlock(prevBlockHash, currBlockData, nonce) {
        const dataAsStr = prevBlockHash + JSON.stringify(currBlockData) + nonce.toString();
        const hash = sha256(dataAsStr);
        return hash;
    }
}

module.exports = Blockchain;