import { useEffect, useState } from "react";
import axios from "axios";

function BlockchainExplorer() {
    const [blockchain, setBlockchain] = useState([]);

    useEffect(() => {
        fetchBlockchain();
    }, []);

    const fetchBlockchain = async () => {
        const response = await axios.get(
            "http://localhost:5000/api/blockchain"
        );

        setBlockchain(response.data.chain);
    };

    return (
        <div>
            <h1>Blockchain Explorer</h1>

            {blockchain.map((block) => (
                <div key={block.index}>
                    <h2>Block #{block.index}</h2>

                    <p>
                        Hash: {block.hash}
                    </p>

                    <p>
                        Previous Hash: {block.previousHash}
                    </p>

                    <pre>
                        {JSON.stringify(
                            block.data,
                            null,
                            2
                        )}
                    </pre>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default BlockchainExplorer;