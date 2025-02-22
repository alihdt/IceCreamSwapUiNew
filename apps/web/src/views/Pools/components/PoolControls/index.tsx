import { useWeb3React } from '@pancakeswap/wagmi'
import { Pool } from '@pancakeswap/uikit'
import { useUserPoolStakedOnly, useUserPoolsViewMode } from 'state/user/hooks'
import { useInitialBlock } from 'state/block/hooks'
import { BITGERT_BLOCK_TIME } from 'config'
import { Token } from '@pancakeswap/sdk'

const POOL_START_BLOCK_THRESHOLD = (60 / BITGERT_BLOCK_TIME) * 10

export default function PoolControlsContainer(props) {
  const [stakedOnly, setStakedOnly] = useUserPoolStakedOnly()
  const [viewMode, setViewMode] = useUserPoolsViewMode()
  const { account } = useWeb3React()
  const initialBlock = useInitialBlock()
  const threshHold = initialBlock > 0 ? initialBlock + POOL_START_BLOCK_THRESHOLD : 0

  return (
    <Pool.PoolControls<Token>
      {...props}
      stakedOnly={stakedOnly}
      setStakedOnly={setStakedOnly}
      viewMode={viewMode}
      setViewMode={setViewMode}
      account={account}
      threshHold={threshHold}
    />
  )
}
