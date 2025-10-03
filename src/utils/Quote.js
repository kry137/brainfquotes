export default async function getQuote() {
    // return await getFromQuotableIo();
    return await getFromPremKR();
}

/**
 * https://api.quotable.io/random
 */
async function getFromQuotableIo() {
    try {
        const fetchData = await fetch('https://api.quotable.io/random');
        const json = await fetchData.json();
        return `${json.content} - ${json.author}`;
    } catch(e) {
        return 'Hello World!';
    }
}

/**
 * https://raw.githubusercontent.com/prem-k-r/multilingual-quotes-api/refs/heads/main/data/en.json
 */
async function getFromPremKR() {
    try {
        const fetchData = await fetch(import.meta.env.BASE_URL + "/PremKR.json");
        const json = await fetchData.json();

        const selected = Math.floor(Math.random() * json.length);
        const data = json[selected];
        
        return `${data.quote} - ${data.author}`;
    } catch(e) {
        return 'Hello World!';
    }
}