import { ERC20Token } from './entities/token'

export enum ChainId {
  BITGERT = 32520,
  DOGE = 2000,
  DOKEN = 61916,
  FUSE = 122,
  XDC = 50,
  BSC = 56,
  CORE = 1116,
}

export const FACTORY_ADDRESS = '0x9E6d21E759A7A288b80eef94E4737D313D31c13f'
export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.BITGERT]: FACTORY_ADDRESS,
  [ChainId.DOGE]: FACTORY_ADDRESS,
  [ChainId.DOKEN]: FACTORY_ADDRESS,
  [ChainId.FUSE]: FACTORY_ADDRESS,
  [ChainId.XDC]: FACTORY_ADDRESS,
  [ChainId.BSC]: '',
  [ChainId.CORE]: FACTORY_ADDRESS,
}

export const INIT_CODE_HASH = '0x58c1b429d0ffdb4407396ae8118c58fed54898473076d0394163ea2198f7c4a3'
export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.BITGERT]: INIT_CODE_HASH,
  [ChainId.DOGE]: INIT_CODE_HASH,
  [ChainId.DOKEN]: INIT_CODE_HASH,
  [ChainId.FUSE]: INIT_CODE_HASH,
  [ChainId.XDC]: INIT_CODE_HASH,
  [ChainId.BSC]: '',
  [ChainId.CORE]: INIT_CODE_HASH,
}

export const WETH9 = {
  [ChainId.BITGERT]: new ERC20Token(
    ChainId.BITGERT,
    '0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710',
    18,
    'WBRISE',
    'Wrapped Brise'
  ),
  [ChainId.DOGE]: new ERC20Token(
    ChainId.DOGE,
    '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101',
    18,
    'WDOGE',
    'Wrapped Doge'
  ),
  [ChainId.DOKEN]: new ERC20Token(
    ChainId.DOKEN,
    '0x27b45bCC26e01Ed50B4080A405D1c492FEe89d63',
    18,
    'WDKN',
    'Wrapped DoKEN'
  ),
  [ChainId.FUSE]: new ERC20Token(
    ChainId.FUSE,
    '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
    18,
    'WFUSE',
    'Wrapped Fuse'
  ),
  [ChainId.XDC]: new ERC20Token(
      ChainId.XDC,
      '0x951857744785E80e2De051c32EE7b25f9c458C42',
      18,
      'WXDC',
      'Wrapped XDC'
  ),
  [ChainId.BSC]: new ERC20Token(
      ChainId.BSC,
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      18,
      'WBNB',
      'Wrapped BNB'
  ),
  [ChainId.CORE]: new ERC20Token(
      ChainId.CORE,
      '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f',
      18,
      'WCORE',
      'Wrapped CORE'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.BITGERT]: WETH9[ChainId.BITGERT],
  [ChainId.DOGE]: WETH9[ChainId.DOGE],
  [ChainId.DOKEN]: WETH9[ChainId.DOKEN],
  [ChainId.FUSE]: WETH9[ChainId.FUSE],
  [ChainId.XDC]: WETH9[ChainId.XDC],
  [ChainId.BSC]: WETH9[ChainId.BSC],
  [ChainId.CORE]: WETH9[ChainId.CORE],
}

export const WBNB = {
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.BITGERT]: { name: 'Brise', symbol: 'BRISE', decimals: 18 },
  [ChainId.DOGE]: { name: 'Doge', symbol: 'DOGE', decimals: 18 },
  [ChainId.DOKEN]: { name: 'DoKEN', symbol: 'DKN', decimals: 18 },
  [ChainId.FUSE]: { name: 'Fuse', symbol: 'FUSE', decimals: 18 },
  [ChainId.XDC]: { name: 'XDC', symbol: 'XDC', decimals: 18 },
  [ChainId.BSC]: { name: 'Binance Coin', symbol: 'BNB', decimals: 18 },
  [ChainId.CORE]: { name: 'CORE', symbol: 'CORE', decimals: 18 },
}
