import { ethers } from "ethers";


console.log("windoss",window);  


let windowObject= window;
if(windowObject.ethereum){
    const contractAddress="0x3CdA05752ed8f6bbCb827fdE2F1e5Cf16CAe7DE9"
    // const contractAddress = "0x06E45B393120011778Fc29518c4d829AA4EcEE47";
    const contractAbi= [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "time",
                    "type": "uint256"
                }
            ],
            "name": "CustomMint",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_tileOwner",
                    "type": "address"
                }
            ],
            "name": "getTileInfo",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_x",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_y",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_zoom",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_longitude",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_latitude",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "uri",
                    "type": "string"
                }
            ],
            "name": "safeMint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    // const contractAbi =[
    //     {
    //         "inputs": [],
    //         "stateMutability": "nonpayable",
    //         "type": "constructor"
    //     },
    //     {
    //         "anonymous": false,
    //         "inputs": [
    //             {
    //                 "indexed": true,
    //                 "internalType": "address",
    //                 "name": "owner",
    //                 "type": "address"
    //             },
    //             {
    //                 "indexed": true,
    //                 "internalType": "address",
    //                 "name": "approved",
    //                 "type": "address"
    //             },
    //             {
    //                 "indexed": true,
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "name": "Approval",
    //         "type": "event"
    //     },
    //     {
    //         "anonymous": false,
    //         "inputs": [
    //             {
    //                 "indexed": true,
    //                 "internalType": "address",
    //                 "name": "owner",
    //                 "type": "address"
    //             },
    //             {
    //                 "indexed": true,
    //                 "internalType": "address",
    //                 "name": "operator",
    //                 "type": "address"
    //             },
    //             {
    //                 "indexed": false,
    //                 "internalType": "bool",
    //                 "name": "approved",
    //                 "type": "bool"
    //             }
    //         ],
    //         "name": "ApprovalForAll",
    //         "type": "event"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "to",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "name": "approve",
    //         "outputs": [],
    //         "stateMutability": "nonpayable",
    //         "type": "function"
    //     },
    //     {
    //         "anonymous": false,
    //         "inputs": [
    //             {
    //                 "indexed": true,
    //                 "internalType": "address",
    //                 "name": "buyer",
    //                 "type": "address"
    //             },
    //             {
    //                 "indexed": false,
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             },
    //             {
    //                 "indexed": false,
    //                 "internalType": "uint256",
    //                 "name": "time",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "name": "CustomMint",
    //         "type": "event"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "string",
    //                 "name": "_x",
    //                 "type": "string"
    //             },
    //             {
    //                 "internalType": "string",
    //                 "name": "_y",
    //                 "type": "string"
    //             },
    //             {
    //                 "internalType": "string",
    //                 "name": "_zoom",
    //                 "type": "string"
    //             },
    //             {
    //                 "internalType": "string",
    //                 "name": "_longitude",
    //                 "type": "string"
    //             },
    //             {
    //                 "internalType": "string",
    //                 "name": "_latitude",
    //                 "type": "string"
    //             },
    //             {
    //                 "internalType": "string",
    //                 "name": "uri",
    //                 "type": "string"
    //             }
    //         ],
    //         "name": "safeMint",
    //         "outputs": [],
    //         "stateMutability": "payable",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "from",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "address",
    //                 "name": "to",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "name": "safeTransferFrom",
    //         "outputs": [],
    //         "stateMutability": "nonpayable",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "from",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "address",
    //                 "name": "to",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             },
    //             {
    //                 "internalType": "bytes",
    //                 "name": "_data",
    //                 "type": "bytes"
    //             }
    //         ],
    //         "name": "safeTransferFrom",
    //         "outputs": [],
    //         "stateMutability": "nonpayable",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "operator",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "bool",
    //                 "name": "approved",
    //                 "type": "bool"
    //             }
    //         ],
    //         "name": "setApprovalForAll",
    //         "outputs": [],
    //         "stateMutability": "nonpayable",
    //         "type": "function"
    //     },
    //     {
    //         "anonymous": false,
    //         "inputs": [
    //             {
    //                 "indexed": true,
    //                 "internalType": "address",
    //                 "name": "from",
    //                 "type": "address"
    //             },
    //             {
    //                 "indexed": true,
    //                 "internalType": "address",
    //                 "name": "to",
    //                 "type": "address"
    //             },
    //             {
    //                 "indexed": true,
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "name": "Transfer",
    //         "type": "event"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "from",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "address",
    //                 "name": "to",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "name": "transferFrom",
    //         "outputs": [],
    //         "stateMutability": "nonpayable",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "owner",
    //                 "type": "address"
    //             }
    //         ],
    //         "name": "balanceOf",
    //         "outputs": [
    //             {
    //                 "internalType": "uint256",
    //                 "name": "",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "stateMutability": "view",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "name": "getApproved",
    //         "outputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "",
    //                 "type": "address"
    //             }
    //         ],
    //         "stateMutability": "view",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "_tileOwner",
    //                 "type": "address"
    //             }
    //         ],
    //         "name": "getTileInfo",
    //         "outputs": [
    //             {
    //                 "internalType": "string",
    //                 "name": "",
    //                 "type": "string"
    //             },
    //             {
    //                 "internalType": "string",
    //                 "name": "",
    //                 "type": "string"
    //             },
    //             {
    //                 "internalType": "string",
    //                 "name": "",
    //                 "type": "string"
    //             },
    //             {
    //                 "internalType": "uint256",
    //                 "name": "",
    //                 "type": "uint256"
    //             },
    //             {
    //                 "internalType": "address",
    //                 "name": "",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "bool",
    //                 "name": "",
    //                 "type": "bool"
    //             }
    //         ],
    //         "stateMutability": "view",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "owner",
    //                 "type": "address"
    //             },
    //             {
    //                 "internalType": "address",
    //                 "name": "operator",
    //                 "type": "address"
    //             }
    //         ],
    //         "name": "isApprovedForAll",
    //         "outputs": [
    //             {
    //                 "internalType": "bool",
    //                 "name": "",
    //                 "type": "bool"
    //             }
    //         ],
    //         "stateMutability": "view",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [],
    //         "name": "name",
    //         "outputs": [
    //             {
    //                 "internalType": "string",
    //                 "name": "",
    //                 "type": "string"
    //             }
    //         ],
    //         "stateMutability": "view",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "name": "ownerOf",
    //         "outputs": [
    //             {
    //                 "internalType": "address",
    //                 "name": "",
    //                 "type": "address"
    //             }
    //         ],
    //         "stateMutability": "view",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "bytes4",
    //                 "name": "interfaceId",
    //                 "type": "bytes4"
    //             }
    //         ],
    //         "name": "supportsInterface",
    //         "outputs": [
    //             {
    //                 "internalType": "bool",
    //                 "name": "",
    //                 "type": "bool"
    //             }
    //         ],
    //         "stateMutability": "view",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [],
    //         "name": "symbol",
    //         "outputs": [
    //             {
    //                 "internalType": "string",
    //                 "name": "",
    //                 "type": "string"
    //             }
    //         ],
    //         "stateMutability": "view",
    //         "type": "function"
    //     },
    //     {
    //         "inputs": [
    //             {
    //                 "internalType": "uint256",
    //                 "name": "tokenId",
    //                 "type": "uint256"
    //             }
    //         ],
    //         "name": "tokenURI",
    //         "outputs": [
    //             {
    //                 "internalType": "string",
    //                 "name": "",
    //                 "type": "string"
    //             }
    //         ],
    //         "stateMutability": "view",
    //         "type": "function"
    //     }
    // ];
    const provider = new ethers.providers.Web3Provider(windowObject.ethereum);
    const signer = provider.getSigner();
    var web = new ethers.Contract(contractAddress, contractAbi, signer);   
}

export default web;