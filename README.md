# jonesdao-subgraph

Indexes data related to JonesDAO on Arbitrum. jonesdao.io. 
Subgraphs listen to new blocks on the blockchain and exposes them thru a web2-friendly interface via a GraphQL API. 
This subgraph is hosted on the hosted service. You can play around with it yourself in the playground here: https://thegraph.com/hosted-service/subgraph/olofens/jonesdao?selected=playground

# Table of contents
1. [Heartbeat](#heartbeat)
2. [Querying](#querying)
3. [jAssets](#jassets)
4. [SSOV Deposits](#ssovdeposits)
5. [SSOV Purchases](#ssovpurchases)
6. [PnL](#pnl)
7. [Local development](#localdevelopment)
8. [Deployment](#deployment)

## Heartbeat
This subgraph runs on a heartbeat -- aiming to update itself every half hour or so. There _should_ be one datapoint per half hour. Because Arbitrum subgraphs can only listen to events, of which I have not been able to find any that emit every half hour exactly, I needed to go with a probabilistic approach and listen to events which occurr very frequently. The event chosen is Sushiswap's `Swap` event which is emitted on each swap. I listen to the USDC-WETH pool which is the most utilized, and then I programmatically ensure that I only have one datapoint per half hour. 

## Querying
When querying these datapoints, do not try to match IDs as the existance of a certain ID, eg `2022-03-19T03ETH` isn't guaranteed to be there (assuming the date is in the past of course). Instead, get the latest data point within a data set and look at the `timestamp` to determine if it is sufficiently recent for your use case. 

## jAssets
The subgraph indexes data for all jAssets, providing data for the asset price, jAsset price, and of course the ratio of jAsset:Asset. An example response for querying jETH metric for example provides a response like the following. See the playground (link above) for query examples.

```
{
  "id": "2022-03-19ETH",
  "asset": "ETH",
  "timestamp": "1647648881",
  "JAssetPrice": "2908.180398473893366209826393858993",
  "AssetPrice": "2949.7931",
  "JAssetToAssetRatio": "0.9858930100805691647355966741731796"
}
```
_Note that the above data point was copied when the subgraph was testing with daily data points._

## SSOV Deposits <a name="ssovdeposits"></a>
The subgraph maintains a state of Jones DAO's SSOV deposits. There will most likely be different entities to query depending on if you want the SSOV-C deposits or the SSOV-P deposits. This is TBD. All data given in the response is denominated in the underlying asset, for example ETH, DPX or gOHM. The data exposed from the SSOV Deposits state is very useful -- it gives you: 

- The strikes for the epoch
- Total deposits at each strike, as well as the sum
- Jones DAO's deposits at each strike, as well as the sum of these
- The ownership ratio of each strike, as well as the total ownership ratio of the entire SSOV
- The total current premiums at each strike
- The user's current premiums at each strike
- Current asset price (using Dopex oracle)
- Total farming rewards (as in: When you write a call in the DPX SSOVC the deposited DPX is deposited into the Dopex DPX farm)
- User's share of the farming rewards

Example response for asset = DPX: 
```
{
  "id": "2022-03-19DPX",
  "timestamp": "1647648881",
  "epoch": "2",
  "asset": "DPX",
  "user": "0xba3386d94fc593a1e9a5b57ff02524396080f7b4",
  "strikes": [
    "1500",
    "2250",
    "3000",
    "4444"
  ],
  "userDeposits": [
    "0",
    "330",
    "0",
    "0"
  ],
  "summedTotalDeposits": "58978.535938702383666099",
  "summedUserDeposits": "330",
  "ownership": [
    "0",
    "0.3756636459022066401203624653351797",
    "0",
    "0"
  ],
  "totalPremiums": [
    "78.233896088328241822",
    "15.160877091803657733",
    "6.644649284214627151",
    "0.016627696083862188"
  ],
  "userPremiums": [
    "0",
    "5.695390363382205670585166911413085",
    "0",
    "0"
  ],
  "assetPrice": "1139.14449621",
  "totalDeposits": [
    "771.80918538114837263",
    "878.44539550123550336",
    "731.28807842483164007",
    "56596.993279395168150039"
  ],
  "summedOwnership": "0.005595255879918346027057002901568825",
  "totalFarmRewards": "486.5602782836561321342928556234524",
  "userFarmRewards": "2.722429258001333701424348253564838"
}
```

## SSOV Purchases <a name="ssovpurchases"></a>
Similar to the SSOV Deposits above, we also track Jones DAO's SSOV Purchases. Currently we're only tracking SSOVC purchases, and in the future when SSOVP Purchases are introduced as well to the vaults they _might_ be given their own data set. TBD. The SSOV Purchases state is simpler, but still provides important data. The SSOV Purchases state also runs on the heartbeat method, meaning that it will contain new data points at every heartbeat interval, despite the data itself most likely not changing during the epoch. Either way, querying the SSOV Purchases state data set provides you data points containing: 

- Strikes
- Jones DAO's calls purchased at each strike
- The premiums paid at each strike for the calls purchased
- Asset price
- (To be implemented) The purchase fees (not premiums) which go to Dopex
- (To be implemented) The cost to settle

Example response for ETH: 
```
{
  "id": "2022-03-19ETH",
  "timestamp": "1647648881",
  "epoch": "2",
  "asset": "ETH",
  "strikes": [
    "2500",
    "3000",
    "3500",
    "4000"
  ],
  "callsPurchased": [
    "0",
    "270",
    "84",
    "1624"
  ],
  "premiumsPaid": [
    "0",
    "19.835986744471751082",
    "1.902463424436258903",
    "13.766010689096917412"
  ],
  "assetPrice": "2949.7931"
},
```
Again, `premiumsPaid` values are denominated in the underlying asset, in this case `ETH`.

## PnL
The PnL metric combines the SSOV Deposit states and the SSOV Purchases states and provides you with a breakdown of the current Jones Vault's PnL as of the latest heartbeat. Values in this response are either denominated in USD terms, underlying asset terms (eg ETH), or percentage terms. It should be evident what each value is denominated in. When querying, you receive: 

- Epoch starting assets: how many of the underlying asset we started the epoch with
- Unallocated assets: how many of the underlying asset are sitting idly
- Total assets deposited: Total amount of assets deposited into some SSOV
- Total assets farming: Total amount of assets farming in some way (eg Dopex DPX farm)
- Deposit PnL: your PnL on only the SSOV deposits
- Purchase PnL: your PnL on only the SSOV purchases
- Farm PnL: your PnL (will reasonably only be profit) on your farming position
- PnL underlying: PnL denominated in terms of the underlying asset. Eg a value of 1 signifies a profit of 1 ETH if we're in the ETH vault.
- PnL percentage: PnL denominated in percentage terms. If the value is 0.01, PnL is +1%. If the value is -0.01, the PnL is -1%.
- Current assets with PnL: Epoch starting assets plus PnL underlying

Example response for DPX vault:
```
 {
  "id": "1647648881DPX",
  "timestamp": "1647648881",
  "epoch": "2",
  "asset": "DPX",
  "epochStartingAssets": "2999.997412",
  "unallocatedAssets": "0.901442250581727174",
  "pnlPercentage": "-0.013149055451826569912576512491320442",
  "pnlUnderlying": "-39.447132325724200410566603725947",
  "totalAssetsDeposited": "330",
  "depositPnl": "8.417819621383539372009515164977923",
  "purchasePnl": "-71.256719749418272826",
  "totalAssetsFarming": "2596",
  "farmPnl": "25.23101780231053304342388110907484",
  "currentAssetsWithPnl": "2960.550279674275799589433396274053"
}
```

## Local development <a name="localdevelopment"></a>
TODO

## Deployment
TODO
