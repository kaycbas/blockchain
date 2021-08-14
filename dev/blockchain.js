class Blockchain {
    constructor() {
        this.chain = [];
        this.newTransactions = [];
    }

    creatteNewBlock(nonce, prevBlockHash, hash) {
        const newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.newTransactions,
            nonce: nonce,
            hash: hash,
            prevBlockHash: prevBlockHash
        };

        this.newTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }
    
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
}

module.exports = Blockchain;