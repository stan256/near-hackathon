const nearAPI = window.nearApi;
const CONTRACT_NAME = 'dev-1649775182353-11225347449060';
const testnetNearConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: CONTRACT_NAME,
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org'
};

async function connect(nearConfig) {
    window.near = await nearAPI.connect({
        deps: {
            keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
        },
        ...nearConfig
    });

    window.walletConnection = new nearAPI.WalletConnection(window.near);
    window.contract = await new nearAPI.Contract(window.walletConnection.account(), nearConfig.contractName, {
        viewMethods: ['greet'],
        sender: window.walletConnection.getAccountId()
    });
}

window.nearInitPromise = connect(testnetNearConfig);

document.getElementById('greeter_btn').addEventListener('click', async () => {
    const text = document.getElementById("greeter").value;
    let response = await contract.greet({"name": text}).catch(console.error);
    document.getElementById("greeting").innerText = response;
})
