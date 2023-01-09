const xrpl = require("xrpl");
const config = require('config');
const xrplServer = config.get('XRPL_Server');
const xrp_account = config.get('Account');
const xrp_account_secret = config.get('Secret_Key');
const mint_base_uri = config.get('Mint.Base_URI');
const mint_number_of_items = config.get('Mint.Number_Of_Items');
const mint_start_index = config.get('Mint.Start_Index');
const mint_burnable = config.get('Mint.Burnable');
const mint_only_xrp = config.get('Mint.Only_XRP');
const mint_transferable = config.get('Mint.Transferable');
const flagTotal = (mint_burnable ? 1 : 0) + (mint_only_xrp ? 2 : 0) + (mint_transferable ? 8 : 0) 
const royalties = config.get('Mint.Royalties') * 1000;
const token_taxon = config.get('Mint.Token_Taxon');
const transaction_memo = config.get('Mint.Transaction_Memo');

function MintRequest(uri) {
    return {
        TransactionType: "NFTokenMint",
        Account: xrp_account,
        Flags: flagTotal,
        URI: xrpl.convertStringToHex(uri),
        NFTokenTaxon: token_taxon,
        TransferFee: royalties,
        Memos: [
          {
            Memo: {
              MemoData: xrpl.convertStringToHex(transaction_memo),
            },
          },
        ],
      };
  }

async function main() {
    const client = new xrpl.Client(xrplServer)
    await client.connect()
    const hot_wallet = xrpl.Wallet.fromSeed(xrp_account_secret);
    for(let i = mint_start_index; i <= mint_number_of_items; i++)
    {
        console.log('Currently Minting: '+ mint_base_uri + i.toString() + '.json')
        let mintPayload = MintRequest(mint_base_uri + i.toString() + '.json')

        const cst_prepared_offer = await client.autofill(mintPayload)
        const ts_signed_offer = hot_wallet.sign(cst_prepared_offer)
        const ts_result_offer = await client.submitAndWait(ts_signed_offer.tx_blob)
        if (ts_result_offer.result.meta.TransactionResult == "tesSUCCESS") {
          console.log('mint success ' + mint_base_uri + i.toString())
        }
    }

    await client.disconnect()
    console.log('Finished minting!')
    return;
  }

  main()