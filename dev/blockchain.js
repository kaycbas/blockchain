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

    chainIsValid(blockchain) {
        let validChain = true;

        for (let i = 1; i < blockchain.length; i++) {
            const currBlock = blockchain[i];
            const prevBlock = blockchain[i - 1];
            const blockHash = this.hashBlock(prevBlock.hash, { transactions:  currBlock.transactions, index: currBlock.index }, currBlock.nonce)
            if (blockHash.substr(0, 4) !== '0000') validChain = false;
            if (currBlock.prevBlockHash !== prevBlock.hash) validChain = false;
        }

        const genesisBlock = blockchain[0];
        const correctNonce = genesisBlock.nonce === 100;
        const correctPrevBlockHash = genesisBlock.prevBlockHash === '0';
        const correctHash = genesisBlock.hash === '0';
        const correctTransactions = genesisBlock.transactions.length === 0;
        if (!correctNonce || !correctPrevBlockHash || !correctHash || !correctTransactions) validChain = false;

        return validChain;
    }

    getBlock(blockHash) {
        let correctBlock = null;
        for (const block of this.chain) {
            if (block.hash === blockHash) correctBlock = block;
        }
        return correctBlock;
    }

    getTransaction(transactionId) {
        let correctTransaction = null;
        let correctBlock = null;

        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.transactionId === transactionId) {
                    correctTransaction = transaction;
                    correctBlock = block;
                }
            }
        }

        return { 
            transaction: correctTransaction,
            block: correctBlock
        };
    }

    getAddressData(address) {
        const addressTransactions = [];
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.sender === address || transaction.recipient === address) {
                    addressTransactions.push(transaction);
                }       
            }
        }
        
        let balance = 0;
        for (const transaction of addressTransactions) {
            if (transaction.recipient === address) balance += transaction.amount;
            else if (transaction.sender === address) balance -= transaction.amount;
        }

        return {
            addressTransactions: addressTransactions,
            addressBalance: balance
        }
    }
}

module.exports = Blockchain;