import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { bscRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'
import uniq from 'lodash/uniq'
import fromPairs from 'lodash/fromPairs'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol !== 'BNB')
const bnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsConfig.filter((pool) => pool.sousId !== 0)

export const fetchPoolsAllowance = async (account, chainId) => {
  const calls = nonBnbPools.filter((poolConfig) => chainId in poolConfig.contractAddress).map((pool) => ({
    address: pool.stakingToken.address,
    name: 'allowance',
    params: [account, getAddress(pool.contractAddress, chainId)],
  }))

  const allowances = await multicall(erc20ABI, calls, chainId)
  return fromPairs(nonBnbPools.filter((poolConfig) => chainId in poolConfig.contractAddress).map((pool, index) => [pool.sousId, new BigNumber(allowances[index]).toJSON()]))
}

export const fetchUserBalances = async (account, chainId) => {
  // Non BNB pools
  const tokens = uniq(nonBnbPools.filter((poolConfig) => chainId in poolConfig.contractAddress).map((pool) => pool.stakingToken.address))
  const calls = tokens.map((token) => ({
    address: token,
    name: 'balanceOf',
    params: [account],
  }))
  const [tokenBalancesRaw, bnbBalance] = await Promise.all([
    multicall(erc20ABI, calls, chainId),
    bscRpcProvider.getBalance(account),
  ])
  const tokenBalances = fromPairs(tokens.map((token, index) => [token, tokenBalancesRaw[index]]))

  const poolTokenBalances = fromPairs(
    nonBnbPools.filter((poolConfig) => chainId in poolConfig.contractAddress)
      .map((pool) => {
        if (!tokenBalances[pool.stakingToken.address]) return null
        return [pool.sousId, new BigNumber(tokenBalances[pool.stakingToken.address]).toJSON()]
      })
      .filter(Boolean),
  )

  // BNB pools
  const bnbBalanceJson = new BigNumber(bnbBalance.toString()).toJSON()
  const bnbBalances = fromPairs(bnbPools.filter((poolConfig) => chainId in poolConfig.contractAddress).map((pool) => [pool.sousId, bnbBalanceJson]))

  return { ...poolTokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account, chainId) => {
  const calls = nonMasterPools.filter((poolConfig) => chainId in poolConfig.contractAddress).map((p) => ({
    address: getAddress(p.contractAddress, chainId),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls, chainId)
  return fromPairs(
    nonMasterPools.filter((poolConfig) => chainId in poolConfig.contractAddress).map((pool, index) => [pool.sousId, new BigNumber(userInfo[index].amount._hex).toJSON()]),
  )
}

export const fetchUserPendingRewards = async (account, chainId) => {
  const calls = nonMasterPools.filter((poolConfig) => chainId in poolConfig.contractAddress).map((p) => ({
    address: getAddress(p.contractAddress, chainId),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls, chainId)
  return fromPairs(nonMasterPools.filter((poolConfig) => chainId in poolConfig.contractAddress).map((pool, index) => [pool.sousId, new BigNumber(res[index]).toJSON()]))
}
