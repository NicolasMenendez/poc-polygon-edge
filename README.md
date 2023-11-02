# poc-polygon-edge

## Quickstart

Installation:

```
npm install
```

Compile:

```
npx hardhat compile
```

## Config env

Add a .env file , example file .env.defaults.

## Steps to reproduce issue:

Issue: Transfer of native currency to a proxy using .transfer() fail.

1. Deploy contracts (TEST1 as proxy) to a polygon-edge blockchain

```
npx hardhat --network latestnet deploy-poc
```

2. call function withdrawFromTest2usingTransfer() to reproduce issue

```
npx hardhat --network latestnet withdraw-proxy-transfer --test1 <test1Address> --test2 <test2Address> --amount 1
```
