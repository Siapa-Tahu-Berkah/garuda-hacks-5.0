const midtransClient = require("midtrans-client");

const CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

export const midtransCore = new midtransClient.CoreApi({
  isProduction: false,
  clientKey: CLIENT_KEY,
  serverKey: SERVER_KEY,
});

export const midtransSnap = new midtransClient.Snap({
  isProduction: false,
  clientKey: CLIENT_KEY,
  serverKey: SERVER_KEY,
});
