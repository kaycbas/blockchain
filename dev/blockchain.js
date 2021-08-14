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
            
        }
    }
    
}