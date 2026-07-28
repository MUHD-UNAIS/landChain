const express = require("express");
const cors = require("cors");

const Blockchain = require("./blockchain");

const app = express();

app.use(cors());
app.use(express.json());

const landBlockchain = new Blockchain();

app.get("/api/blockchain", (req, res) => {
    res.json({
        chain: landBlockchain.chain,
        isValid: landBlockchain.isChainValid()
    });
});

app.post("/api/register-land", (req, res) => {

    const {
        landId,
        ownerName,
        surveyNumber,
        location,
        area
    } = req.body;


    // Check whether land already exists
    const landExists = landBlockchain.chain.some(
        (block) =>
            block.data.landId === landId &&
            block.data.transactionType === "LAND_REGISTRATION"
    );


    if (landExists) {
        return res.status(400).json({
            message: "Land is already registered"
        });
    }


    const landData = {
        transactionType: "LAND_REGISTRATION",
        landId,
        ownerName,
        surveyNumber,
        location,
        area
    };


    landBlockchain.addBlock(landData);


    res.json({
        message: "Land registered successfully",
        block: landBlockchain.getLatestBlock()
    });

});
app.post("/api/transfer-land", (req, res) => {
    const {
        landId,
        previousOwner,
        newOwner
    } = req.body;

    if (
        !landId ||
        !previousOwner ||
        !newOwner
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const transferData = {
        transactionType: "OWNERSHIP_TRANSFER",
        landId,
        previousOwner,
        newOwner
    };

    landBlockchain.addBlock(transferData);

    res.json({
        message: "Ownership transferred successfully",
        block: landBlockchain.getLatestBlock()
    });
});

app.get("/api/validate", (req, res) => {
    res.json({
        valid: landBlockchain.isChainValid()
    });
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});