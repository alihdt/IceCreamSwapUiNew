const PANICE_EXTENDED = 'https://tokens.icecreamswap.com/pancakeswap-extended.json'
const COINGECKO = 'https://tokens.icecreamswap.com/coingecko.json'
const CMC = 'https://tokens.icecreamswap.com/cmc.json'

// List of official tokens list
export const OFFICIAL_LISTS = [PANICE_EXTENDED]

export const UNSUPPORTED_LIST_URLS: string[] = []
export const WARNING_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  PANICE_EXTENDED,
  CMC,
  COINGECKO,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
  ...WARNING_LIST_URLS,
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
