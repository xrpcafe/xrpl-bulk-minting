# How to Use

## NFT Upload Guide

Here is how to prepare and upload an NFT collection to IPFS using https://nft.storage

## Preparation
Before you start, make sure you have the following:
* A folder with all the images/media of your NFT collection. Supported file formats include JPG, PNG, GIF, MP3, and MP4. If you are using GIF, MP3, or MP4, it is recommended to include image thumbnails in the metadata so marketplaces can best support the collection.
* A folder with all the metadata files. Each metadata file must be named according to the corresponding media file (e.g. 1.json for 1.png).

We recommend using one of these metadata standards:
* XLS-24: https://github.com/XRPLF/XRPL-Standards/discussions/69
* Opensea: https://docs.opensea.io/docs/metadata-standards

## Uploading Your Collection
Before you start, make a backup of your images and metadata folders. Then follow these steps:

1. Go to https://nft.storage and create an account.
2. In the API Keys section, click "New Key" and enter a name for your collection. Click "Create".
3. Click "Actions" and select "Copy" to copy the API key.
4. In the "Files" section, click "Upload directories easily with NFTUp".
5. Download and install NFTUp for your operating system (Windows or Mac).
6. Open NFTUp and drag and drop the images folder into the upload window. Do not select individual files or subfolders - make sure you are uploading the entire folder.
7. Paste the API key into the designated field and click "Continue".
8. Once the upload is complete, copy the CID (Content ID).
9. Add the CID to all the metadata files.
10. Test the IPFS links to make sure everything is working, you can test here: https://nftstorage.link
11. Drag and drop the updated metadata folder into the NFTUp upload window.
12. Once the metadata upload is complete, copy the IPFS URL.

## To mint your NFTs, you will need the following:
* The metadata IPFS URL you copied.
* The Issuer wallet address you want to use for royalties (and secret) (make sure the wallet is on the XUMM app).
* The number of NFTs in your collection (e.g. 100, 1000, 10000).
* The percentage of royalties you want to collect for each sale (suggested ranges: 10k NFTs 2%-8%; below 1k up to 10%; below 100 up to 20%).
* Note: If you are bulk minting a large number of NFTs, make sure you have enough XRP in your issuing/royalties wallet to cover the required reserves. For example, if you are minting 10k NFTs, have at least 550 XRP in the wallet.

# Minting

### Requirements

+ [NodeJs](https://nodejs.org/en/)
+ [Git](https://git-scm.com/downloads)

## Getting Started

### Open a command prompt or Powershell prompt and issue the following commands

```
git clone https://github.com/xrpcafe/xrpl-bulk-minting
```

### in the ./config directory edit the default.json file with the information about your mint.
```
{
    "XRPL_Server": "wss://s.altnet.rippletest.net:51233/",
    "Account" : "rUfQJWAfzMHgtjUrYYEzKTyzZHALhEF1Av",
    "Secret_Key" : "",
    "Mint":
    {
        "Base_URI": "ipfs://bafybeifwagnkgmgqnss6uotfrs3qbjdr7weznxds3q7pqorz3k4wrr3cnq/",
        "Start_Index": 1,
        "Number_Of_Items": 100,
        "Royalties": 5,
        "Token_Taxon": 0,
        "Burnable": false,
        "Only_XRP": false,
        "Transferable": true,
        "Transaction_Memo": "Minted by X"
    }
  }
  ```
1. XRPL_Server: the wss server of the public XRPL endpoint. Testnet: wss://s.altnet.rippletest.net:51233/  Main Net: wss://s1.ripple.com/    wss://xrplcluster.com/
 - Public Main Net servers: [Servers](https://xrpl.org/public-servers.html)
2. Account: Your xrp account address. [XRPL Faucet](https://xrpl.org/xrp-testnet-faucet.html)
3. Secret_Key: the family seed for your xrp address. If you activated from XUMM you'll need to convert your secret numbers to a Family seed [https://github.com/WietseWind/secret-numbers-to-family-seed](https://github.com/WietseWind/secret-numbers-to-family-seed)
 ```diff
- KEEP THIS SAFE, DO NOT SHARE!!!
```
4. Base_URI: the base url of the location you uploaded your metadata to in IPFS/Arweave or a centralized API.
5. Start_Index: The number of your first .json file in the IPFS folder you uploaded to.
6. Number_Of_Items: total number of items you uploaded. If Start_Index = 1 and Number_Of_Items = 100, then the app will iterate by making NFTs from 1.json up to 100.json
7. Royalties: % of royalties to set each NFT at. ie 5 = 5%
8. Token_Taxon: the taxon to use to mint this batch of NFTS. Must be an integer.
9. Burnable: can this NFT be burnt by it's creator. Default is false.
10. Only_XRP: should this NFT only be transferable/tradeable with XRP only. Default is false.
11. Transferable: is this NFT transferable. Default is true. 
```diff 
- This value must be set to true if you want this NFT to be tradeable on any marketplace 
```
12. Transaction_Memo: customizable text to add to the memo field of the transaction.

### Install
``` npm install ``` 

### Run mint
``` node mint.js ``` 


