import { ethers } from "./ethers.js";

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/yourapi"); //add your api

let address;
let privateKey;

const createnew= document.getElementById("createnew")
const updatebal = document.getElementById("updatebal")
const importwal = document.getElementById("importwal")
//const withdrawbutton = document.getElementById("withdrawbutton")

createnew.onclick = createNewWallet;
updatebal.onclick = updateBalance ;
importwal.onclick = importWallet;

function createNewWallet() {
  const newWallet = ethers.Wallet.createRandom();
  address = newWallet.address;
  privateKey = newWallet.privateKey;
  saveWallet();
  updateKeys();
}

//window.addEventListener('load',  updateKeys, false);

function updateKeys() {
  const addr = document.getElementById('addr');
  const private_key = document.getElementById('private');
  addr.innerHTML = address;
  private_key.innerHTML = privateKey;
}

async function updateBalance() {
  const wei = await provider.getBalance(address);
  const balance = ethers.utils.formatEther(wei);
  const balanceDiv = document.getElementById('balance');
  balanceDiv.innerHTML = balance;
}

 function saveWallet() {
   Cookies.set('address', address);
   Cookies.set('privateKey', privateKey);
 }

function loadWallet() {
  address = Cookies.get('address');
  privateKey = Cookies.get('privateKey');
}

function importWallet() {
  const privateKeyImport = document.getElementById('privateKeyImport').value;
  const importedWallet = new ethers.Wallet(privateKeyImport, provider);
  address = importedWallet.address;
  privateKey = importedWallet.privateKey;
  saveWallet();
  updateKeys();
  updateBalance();
}

createNewWallet();
console.log(address);

 if (Cookies.get('address') === undefined) {
   console.log('Wallet not found. Creating.');
   createNewWallet();
   updateBalance();
 } else {
   console.log('Loading existing wallet.');
   console.log(Cookies.get('address'));
   loadWallet();
   console.log(address);
   updateKeys();
   updateBalance();
 }