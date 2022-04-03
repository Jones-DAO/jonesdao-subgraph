# jonesdao-subgraph

Indexes data related to JonesDAO on Arbitrum. jonesdao.io.
Subgraphs listen to new blocks on the blockchain and exposes them thru a web2-friendly interface via a GraphQL API.
This subgraph is hosted on the hosted service. You can play around with it yourself in the playground here: https://thegraph.com/hosted-service/subgraph/olofens/jonesdao?selected=playground

# Table of contents

1. [Heartbeat](#heartbeat)
2. [Querying](#querying)
3. [jAssets](#jassets)
4. [SSOVC Deposits](#ssovcdeposits)
5. [SSOVC Purchases](#ssovcpurchases)
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

## SSOVC Deposits <a name="ssovcdeposits"></a>

The subgraph maintains a state of Jones DAO's SSOV deposits. All data given in the response is denominated in the underlying asset, for example ETH, DPX or gOHM. The data exposed from the SSOV Deposits state is very useful -- it gives you:

- The strikes for the epoch
- Total deposits at each strike, as well as the sum
- Jones DAO's deposits at each strike, as well as the sum of these
- The ownership ratio of each strike, as well as the total ownership ratio of the entire SSOV
- The total current premiums at each strike
- The user's current gained premiums at each strike
- Current asset price (using Dopex oracle)
- Total farming rewards (as in: When you write a call in the DPX SSOVC the deposited DPX is deposited into the Dopex DPX farm)
- User's share of the farming rewards
- Rewards: different from farming, the rewards are incentives given to depositors from Dopex. `(summedUserDepositRewards)`

Example response for asset = ETH:

```
{
    "id": "2022-04-03T10ETH",
    "timestamp": "1648980067",
    "epoch": "3",
    "asset": "ETH",
    "user": "0xd126f379d998b8c32ccdc55c49260685867535f8",
    "strikes": [
        "3200",
        "3600",
        "4000",
        "4500"
    ],
    "userDeposits": [
        "0",
        "40",
        "0",
        "1250"
    ],
    "summedTotalDeposits": "8881.6312062208406309",
    "summedUserDeposits": "1290",
    "ownership": [
        "0",
        "0.1371828884779346653415264215670972",
        "0",
        "0.1588704842244110957759574736045049"
    ],
    "totalPremiums": [
        "3.568092539427174554",
        "11.080435095815437452",
        "9.932784373268520854",
        "49.626973255036678553"
    ],
    "userPremiums": [
        "0",
        "1.520046092036242464005776724130396",
        "0",
        "7.88426127161957600767444574085834"
    ],
    "assetPrice": "3498.79963989",
    "totalDeposits": [
        "34.59",
        "291.581555424340293",
        "687.4154001456143741",
        "7868.0442506508859638"
    ],
    "summedOwnership": "0.1452435898370180890830170433708272",
    "totalFarmRewards": "0",
    "userFarmRewards": "0",
    "summedUserDepositRewards": "14.731630771311090588372885479841",
    "pnlPercentage": "0.01871002956198985198453729298048817",
    "pnlUnderlying": "24.13593813496690906005310794482974"
},
```

## SSOVC Purchases <a name="ssovcpurchases"></a>

Similar to the SSOVC Deposits above, we also track Jones DAO's SSOVC Purchases. The SSOV Purchases state is simpler, but still provides important data. The SSOV Purchases state also runs on the heartbeat method, meaning that it will contain new data points at every heartbeat interval, despite the data itself most likely not changing during the epoch. Either way, querying the SSOV Purchases state data set provides you data points containing:

- Strikes
- Jones DAO's calls purchased at each strike
- The premiums paid at each strike for the calls purchased
- Asset price
- The purchase fees (not premiums) which go to Dopex
- The cost to settle
- PnL for the purchases

Example response for ETH:

```
{
    "id": "2022-04-03T10ETH",
    "timestamp": "1648980067",
    "epoch": "3",
    "asset": "ETH",
    "strikes": [
        "3200",
        "3600",
        "4000",
        "4500"
    ],
    "callsPurchased": [
        "34.5",
        "5.5",
        "40",
        "1250"
    ],
    "premiumsPaid": [
        "3.55838559664690199",
        "0.257858599440572983",
        "0.749329695704806125",
        "7.634156722748689087"
    ],
    "totalPremiumsPaid": "12.199730614540970185",
    "assetPrice": "3498.79963989",
    "feesPaid": [
        "0.0345",
        "0.0055",
        "0.04",
        "1.25"
    ],
    "totalFeesPaid": "1.33",
    "costToExercise": [
        "0.00345",
        "0.00055",
        "0.004",
        "0.125"
    ],
    "pnlUnderlying": "-8.981746996976907685",
    "pnlPercentage": "-0.66385261117644475926585847771541359"
}
```

Again, `premiumsPaid` values are denominated in the underlying asset, in this case `ETH`.

## SSOVP Deposits <a name="ssovpdeposits"></a>

The subgraph maintains a state of Jones DAO's SSOVP deposits. Data given is denomianted in 2CRV (as in USD), except for in the cases where it's obvious that the data is in either Underlying or CRV. Also note that the SSOVC epoch for an asset does not have to be the same as the SSOVP epoch for that asset.

- The strikes for the epoch
- Total deposits at each strike, as well as the sum
- Jones DAO's deposits at each strike, as well as the sum of these
- The ownership ratio of each strike, as well as the total ownership ratio of the entire SSOV
- The total current premiums
- The user's current gained premiums at each strike, as well as the sum of these
- Current asset price (using Dopex oracle)
- Various metric for tracking the CRV rewards. (Recall that Put deposits are done in 2CRV, and these are deposited into Curve gauges to earn trading fees and CRV rewards.)
- Positions value in underlying: The current asset value (eg in ETH for the ETH SSOVP) of your deposits given the current asset price

Example response for asset = ETH:

```
{
    "id": "2022-04-03T11ETH",
    "timestamp": "1648983901",
    "epoch": "1",
    "asset": "ETH",
    "strikes": [
        "3200",
        "2900",
        "2600",
        "2200"
    ],
    "assetPrice": "3485.11692756",
    "totalDeposits": [
        "14137.741",
        "68031.0456995259599995",
        "97290.1890953572562",
        "60242.3623377394095"
    ],
    "userDeposits": [
        "0",
        "0",
        "0",
        "0"
    ],
    "ownership": [
        "0",
        "0",
        "0",
        "0"
    ],
    "summedTotalDeposits": "239701.3381326226256995",
    "summedUserDeposits": "0",
    "summedOwnership": "0",
    "totalPremiums": "2318.777184784012078511",
    "userPremiums": [
        "0",
        "0",
        "0",
        "0"
    ],
    "summedUserPremiums": "0",
    "crvRewards": "0",
    "crvRewardsInUSD": "0",
    "crvRewardsInUnderlying": "0",
    "positionsValueInUnderlying": "0"
},
```

## SSOVP Purchases <a name="ssovppurchases"></a>

Provides data on the put purchases Jones DAO has made via the Dopex SSOVP for the given asset. Recall that puts are purchased in stablecoins (2CRV). All values below, except for `putsPurchased` and `positionsValueInUnderlying` are denominated in 2CRV. These two others are denominated in the underlying asset, eg ETH.

- Strikes
- Jones DAO's puts purchased at each strike
- The premiums paid at each strike for the puts purchased
- Asset price
- The purchase fees (not premiums) which go to Dopex
- The cost to settle
- Positions value in underlying asset (not PnL, just the value)

Example response for ETH (without data, sadly):

```
{
    "id": "2022-04-03T11ETH",
    "timestamp": "1648983901",
    "epoch": "1",
    "asset": "ETH",
    "strikes": [
        "3200",
        "2900",
        "2600",
        "2200"
    ],
    "putsPurchased": [
        "0",
        "0",
        "0",
        "0"
    ],
    "premiumsPaid": [
        "0",
        "0",
        "0",
        "0"
    ],
    "totalPremiumsPaid": "0",
    "assetPrice": "3485.11692756",
    "feesPaid": [],
    "totalFeesPaid": "0",
    "costToExercise": [],
    "positionsValueInUnderlying": "0"
},
```

## PnL

The PnL metric combines the SSOV Deposit states and the SSOV Purchases states and provides you with a breakdown of the current Jones Vault's PnL as of the latest heartbeat. Values in this response are either denominated in USD terms, underlying asset terms (eg ETH), or percentage terms. It should be evident what each value is denominated in.

Note on SSOVP PnL calculations: because SSOVP deposits and purchases are done in 2CRV (as in stablecoins), it is currently difficult to say exactly how many Asset was swapped to 2CRV and then deposited. Thus we just look at the value of the position. In order to keep the SSOVP metrics in the PnL calculations though, we can simply compare the epoch starting balance to the current balance + pnl/value of all SSOVC/SSOVP positions (and farming,rewards, etc). This is why SSOVP has `Value` and not `PnL` in the API.

When querying, you receive:

- Epoch starting assets: how many of the underlying asset we started the epoch with
- Unallocated assets: how many of the underlying asset are sitting idly
- Total assets deposited: Total amount of assets deposited into some SSOVC
- Total assets farming: Total amount of assets farming in some way (eg Dopex DPX farm)
- SSOVC Deposit PnL: your PnL on only the Call deposits
- SSOVC Purchase PnL: your PnL on only the Call purchases
- SSOVP Deposit Value: the value of your Put deposit positions
- SSOVP Purchase Value: the value of your Put purchase positions
- Farm PnL: your PnL (will reasonably only be profit) on your farming position
- PnL underlying: PnL denominated in terms of the underlying asset. Eg a value of 1 signifies a profit of 1 ETH if we're in the ETH vault.
- PnL percentage: PnL denominated in percentage terms. If the value is 0.01, PnL is +1%. If the value is -0.01, the PnL is -1%.
- Current assets with PnL: Epoch starting assets plus PnL underlying

Example response for DPX vault:

```
{
    "id": "1648983901DPX",
    "timestamp": "1648983901",
    "dateStr": "2022-04-03T11",
    "epoch": "3",
    "asset": "DPX",
    "epochStartingAssets": "1831.439106668567642144",
    "unallocatedAssets": "6.789744858289638053",
    "totalSSOVCAssetsDeposited": "0",
    "SSOVCDepositPnl": "0",
    "SSOVCPurchasePnl": "-2.515660854105765363",
    "SSOVPDepositsValue": "0",
    "SSOVPPurchasesValue": "0",
    "pnlPercentage": "0.0009155097462104288133826240886365671",
    "pnlUnderlying": "1.676700351745994826241872127853",
    "totalAssetsFarming": "1822",
    "farmPnl": "4.326062162023998917241872127853203",
    "currentAssetsWithPnl": "1833.115807020313636970241872127853"
}
```

## Local development <a name="localdevelopment"></a>

Use a secondary hosted service deployment script pointing at a new subgraph instance.

## Deployment

Standard The Graph deployment
