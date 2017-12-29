/**
 * Build the URI for data fetching
 * @param {string} currency 
 * @param {string} date 
 */
export function buildURI(currency = 'EURGBP', date='20150101') {
    return `https://raw.githubusercontent.com/FXclub/data/master/${currency}/${currency}_${date}.csv`;
}