// mock server settings
export const ENV = "PROD";
// export const ENV = "DEV";
// export const PAGE_LIMIT = 10;
// const localhost = "192.168.43.127"; //raymond
// const localhost = "10.247.37.103"; //david wrc
// const localhost = "192.168.43.79"; //david hotspot
// const localhost = "10.10.236.209"; //dustin
const localhost = "10.247.36.143"; //dustin
export const MOCK_TELLER_API_URL = "http://"+localhost+":3000/teller/"; //local IP
export const MOCK_MAIN_API_URL = "http://"+localhost+":3000/main/"; //local IP

// export const PROD_TELLER_API_URL = "http://192.168.0.104:9005/api/bds/teller/"; //POC QMS
// export const PROD_MAIN_API_URL = "http://192.168.0.104:9004/api/bds/main/"; //POC QMS

export const PROD_TELLER_API_URL = "http://10.10.230.125/api/bds/teller/"; //Production Product
export const PROD_MAIN_API_URL = "http://10.10.230.125/api/bds/main/"; //Production User
export const PROD_TRANSACTION_API_URL = "http://10.10.230.125/api/bds/transaction/";
export const PROD_MOCK_API_URL = "http://10.10.230.125/api/bds/mock/";

// Notes:
// teller = function that can be executed by teller
// main = function related to form