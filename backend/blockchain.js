const crypto = require("crypto");

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash("sha256")
            .update(
                this.index +
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash +
                this.nonce
            )
            .digest("hex");
    }

    mineBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !==
            "0".repeat(difficulty)
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(
            0,
            Date.now(),
            {
                message: "Genesis Block"
            },
            "0"
        );
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const newBlock = new Block(
            this.chain.length,
            Date.now(),
            data,
            this.getLatestBlock().hash
        );

        newBlock.mineBlock(this.difficulty);

        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (
                currentBlock.hash !==
                currentBlock.calculateHash()
            ) {
                return false;
            }

            if (
                currentBlock.previousHash !==
                previousBlock.hash
            ) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;