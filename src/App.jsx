// Copy this ENTIRE file as src/App.jsx

import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Zap, Loader2, Check, AlertCircle, ExternalLink, Wallet, X, RefreshCw, Shield, Lock } from 'lucide-react';

const CHAINS = [
  { id: 1, name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', chainId: 1, rpc: 'https://eth.llamarpc.com', explorer: 'https://etherscan.io' },
  { id: 137, name: 'Polygon', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png', chainId: 137, rpc: 'https://polygon.llamarpc.com', explorer: 'https://polygonscan.com' },
  { id: 56, name: 'BSC', logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png', chainId: 56, rpc: 'https://bsc-dataseed.binance.org', explorer: 'https://bscscan.com' },
  { id: 42161, name: 'Arbitrum', logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png', chainId: 42161, rpc: 'https://arb1.arbitrum.io/rpc', explorer: 'https://arbiscan.io' },
  { id: 10, name: 'Optimism', logo: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png', chainId: 10, rpc: 'https://mainnet.optimism.io', explorer: 'https://optimistic.etherscan.io' },
  { id: 43114, name: 'Avalanche', logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png', chainId: 43114, rpc: 'https://api.avax.network/ext/bc/C/rpc', explorer: 'https://snowtrace.io' },
  { id: 8453, name: 'Base', logo: 'https://avatars.githubusercontent.com/u/108554348?s=280&v=4', chainId: 8453, rpc: 'https://mainnet.base.org', explorer: 'https://basescan.org' },
  { id: 324, name: 'zkSync', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/24091.png', chainId: 324, rpc: 'https://mainnet.era.zksync.io', explorer: 'https://explorer.zksync.io' },
  { id: 250, name: 'Fantom', logo: 'https://cryptologos.cc/logos/fantom-ftm-logo.png', chainId: 250, rpc: 'https://rpc.ftm.tools', explorer: 'https://ftmscan.com' },
  { id: 100, name: 'Gnosis', logo: 'https://cryptologos.cc/logos/gnosis-gno-gno-logo.png', chainId: 100, rpc: 'https://rpc.gnosischain.com', explorer: 'https://gnosisscan.io' },
  { id: 42220, name: 'Celo', logo: 'https://cryptologos.cc/logos/celo-celo-logo.png', chainId: 42220, rpc: 'https://forno.celo.org', explorer: 'https://celoscan.io' },
  { id: 1284, name: 'Moonbeam', logo: 'https://cryptologos.cc/logos/moonbeam-glmr-logo.png', chainId: 1284, rpc: 'https://rpc.api.moonbeam.network', explorer: 'https://moonscan.io' },
  { id: 25, name: 'Cronos', logo: 'https://cryptologos.cc/logos/cronos-cro-logo.png', chainId: 25, rpc: 'https://evm.cronos.org', explorer: 'https://cronoscan.com' },
  { id: 59144, name: 'Linea', logo: 'https://assets.coingecko.com/coins/images/30456/standard/linea.jpeg', chainId: 59144, rpc: 'https://rpc.linea.build', explorer: 'https://lineascan.build' },
  { id: 5000, name: 'Mantle', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/27075.png', chainId: 5000, rpc: 'https://rpc.mantle.xyz', explorer: 'https://explorer.mantle.xyz' },
  { id: 534352, name: 'Scroll', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/26998.png', chainId: 534352, rpc: 'https://rpc.scroll.io', explorer: 'https://scrollscan.com' },
  { id: 169, name: 'Manta', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/13631.png', chainId: 169, rpc: 'https://pacific-rpc.manta.network/http', explorer: 'https://pacific-explorer.manta.network' },
  { id: 1101, name: 'Polygon zkEVM', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png', chainId: 1101, rpc: 'https://zkevm-rpc.com', explorer: 'https://zkevm.polygonscan.com' },
  { id: 288, name: 'Boba', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png', chainId: 288, rpc: 'https://mainnet.boba.network', explorer: 'https://bobascan.com' },
  { id: 1313161554, name: 'Aurora', logo: 'https://cryptologos.cc/logos/aurora-near-aurora-logo.png', chainId: 1313161554, rpc: 'https://mainnet.aurora.dev', explorer: 'https://aurorascan.dev' },
];

const TOKENS = {
  USDC: { symbol: 'USDC', name: 'USD Coin', logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png', decimals: 6, addresses: {
    1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    137: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    42161: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    10: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    43114: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  }},
  USDT: { symbol: 'USDT', name: 'Tether USD', logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png', decimals: 6, addresses: {
    1: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    137: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    56: '0x55d398326f99059fF775485246999027B3197955',
    42161: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    43114: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
  }},
  ETH: { symbol: 'ETH', name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', decimals: 18, addresses: {
    1: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    42161: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    10: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    8453: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  }},
  DAI: { symbol: 'DAI', name: 'Dai Stablecoin', logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png', decimals: 18, addresses: {
    1: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    137: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    42161: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    10: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  }},
};

const WALLET_PROVIDERS = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊' },
  { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
  { id: 'coinbase', name: 'Coinbase', icon: '🔵' },
  { id: 'trust', name: 'Trust', icon: '⭐' },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈' },
  { id: 'safe', name: 'Safe', icon: '🔐' },
  { id: 'phantom', name: 'Phantom', icon: '👻' },
  { id: 'rabby', name: 'Rabby', icon: '🐰' },
];

class SecurityManager {
  constructor() {
    this.transactionCache = new Map();
    this.lastTransactionTime = 0;
    this.failedAttempts = 0;
    this.MAX_FAILED_ATTEMPTS = 3;
    this.RATE_LIMIT_MS = 5000;
  }

  isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  validateTransaction(txData) {
    if (!txData || typeof txData !== 'object') {
      throw new Error('Invalid transaction data');
    }
    if (!this.isValidAddress(txData.to)) {
      throw new Error('Invalid recipient address');
    }
    if (!this.isValidAddress(txData.from)) {
      throw new Error('Invalid sender address');
    }
    if (txData.value && typeof txData.value === 'string') {
      const value = parseInt(txData.value, 16);
      if (isNaN(value) || value < 0) {
        throw new Error('Invalid transaction value');
      }
    }
    return true;
  }

  checkRateLimit() {
    const now = Date.now();
    if (now - this.lastTransactionTime < this.RATE_LIMIT_MS) {
      throw new Error('Please wait before submitting another transaction');
    }
    this.lastTransactionTime = now;
  }

  detectCollision(txHash) {
    if (this.transactionCache.has(txHash)) {
      throw new Error('Duplicate transaction detected');
    }
    this.transactionCache.set(txHash, Date.now());
    const oneHourAgo = Date.now() - 3600000;
    for (const [hash, time] of this.transactionCache.entries()) {
      if (time < oneHourAgo) {
        this.transactionCache.delete(hash);
      }
    }
  }

  validateAmount(amount, decimals) {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0 || num > 1e15) {
      throw new Error('Invalid amount');
    }
    const maxSafeValue = Number.MAX_SAFE_INTEGER / Math.pow(10, decimals);
    if (num > maxSafeValue) {
      throw new Error('Amount exceeds safe limits');
    }
    return true;
  }

  sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/[^\w\s.-]/gi, '').trim();
  }

  async validateContract(address, rpc) {
    try {
      const response = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getCode',
          params: [address, 'latest'],
          id: 1
        })
      });
      const data = await response.json();
      if (data.result === '0x' || data.result === '0x0') {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  recordFailedAttempt() {
    this.failedAttempts++;
    if (this.failedAttempts >= this.MAX_FAILED_ATTEMPTS) {
      throw new Error('Too many failed attempts. Please refresh and try again.');
    }
  }

  resetFailedAttempts() {
    this.failedAttempts = 0;
  }
}

class UniversalWalletManager {
  constructor(securityManager) {
    this.provider = null;
    this.address = null;
    this.walletType = null;
    this.wcProvider = null;
    this.security = securityManager;
  }

  detectWallets() {
    const available = [];
    if (typeof window !== 'undefined') {
      if (window.ethereum?.isMetaMask) available.push('metamask');
      if (window.ethereum?.isCoinbaseWallet || window.coinbaseWalletExtension) available.push('coinbase');
      if (window.ethereum?.isTrust) available.push('trust');
      if (window.ethereum?.isRainbow) available.push('rainbow');
      if (window.ethereum?.isRabby) available.push('rabby');
      if (window.phantom?.ethereum) available.push('phantom');
      if (window.ethereum?.isSafe) available.push('safe');
      if (window.ethereum && available.length === 0) available.push('metamask');
      available.push('walletconnect');
    }
    return available;
  }

  async connectWalletConnect() {
    try {
      if (!window.WalletConnectProvider) {
        await this.loadWalletConnectSDK();
      }
      const WalletConnectProvider = window.WalletConnectProvider.default;
      this.wcProvider = new WalletConnectProvider({
        rpc: {
          1: 'https://eth.llamarpc.com',
          137: 'https://polygon.llamarpc.com',
          56: 'https://bsc-dataseed.binance.org',
          42161: 'https://arb1.arbitrum.io/rpc',
          10: 'https://mainnet.optimism.io',
          43114: 'https://api.avax.network/ext/bc/C/rpc',
        },
        qrcodeModalOptions: {
          mobileLinks: ['rainbow', 'metamask', 'trust', 'argent', 'imtoken', 'pillar'],
        },
      });
      await this.wcProvider.enable();
      const accounts = this.wcProvider.accounts;
      if (!this.security.isValidAddress(accounts[0])) {
        throw new Error('Invalid wallet address');
      }
      this.provider = this.wcProvider;
      this.address = accounts[0];
      this.walletType = 'walletconnect';
      return this.address;
    } catch (error) {
      throw new Error('Failed to connect via WalletConnect');
    }
  }

  async loadWalletConnectSDK() {
    return new Promise((resolve, reject) => {
      if (window.WalletConnectProvider) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@walletconnect/web3-provider@1.8.0/dist/umd/index.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async connectInjected(walletId) {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('No wallet detected');
    }
    try {
      let targetProvider = window.ethereum;
      if (walletId === 'coinbase' && window.coinbaseWalletExtension) {
        targetProvider = window.coinbaseWalletExtension;
      } else if (walletId === 'phantom' && window.phantom?.ethereum) {
        targetProvider = window.phantom.ethereum;
      }
      const accounts = await targetProvider.request({ method: 'eth_requestAccounts' });
      if (!this.security.isValidAddress(accounts[0])) {
        throw new Error('Invalid wallet address');
      }
      this.provider = targetProvider;
      this.address = accounts[0];
      this.walletType = walletId;
      this.provider.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          this.disconnect();
        } else {
          this.address = accounts[0];
        }
      });
      return this.address;
    } catch (error) {
      throw new Error('Connection rejected');
    }
  }

  async connect(walletId) {
    if (walletId === 'walletconnect') {
      return await this.connectWalletConnect();
    } else {
      return await this.connectInjected(walletId);
    }
  }

  async switchChain(chainId) {
    const chainIdHex = '0x' + chainId.toString(16);
    try {
      if (this.walletType === 'walletconnect') return;
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (error) {
      if (error.code === 4902) {
        const chain = CHAINS.find(c => c.chainId === chainId);
        await this.addChain(chain);
      } else {
        throw error;
      }
    }
  }

  async addChain(chain) {
    await this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x' + chain.chainId.toString(16),
        chainName: chain.name,
        rpcUrls: [chain.rpc],
        blockExplorerUrls: [chain.explorer],
      }],
    });
  }

  async getBalance(tokenAddress, chainRpc) {
    if (!this.address) return '0';
    try {
      if (tokenAddress === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        const response = await fetch(chainRpc, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [this.address, 'latest'],
            id: 1
          })
        });
        const data = await response.json();
        return (parseInt(data.result, 16) / 1e18).toFixed(4);
      } else {
        const balanceOfData = '0x70a08231000000000000000000000000' + this.address.slice(2);
        const response = await fetch(chainRpc, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [{ to: tokenAddress, data: balanceOfData }, 'latest'],
            id: 1
          })
        });
        const data = await response.json();
        return (parseInt(data.result, 16) / 1e6).toFixed(2);
      }
    } catch (error) {
      return '0';
    }
  }

  async sendTransaction(txData) {
    if (!this.provider) throw new Error('Wallet not connected');
    this.security.validateTransaction(txData);
    this.security.checkRateLimit();
    try {
      if (this.walletType === 'walletconnect') {
        const txHash = await this.wcProvider.request({
          method: 'eth_sendTransaction',
          params: [txData],
        });
        return txHash;
      } else {
        const txHash = await this.provider.request({
          method: 'eth_sendTransaction',
          params: [txData],
        });
        return txHash;
      }
    } catch (error) {
      this.security.recordFailedAttempt();
      throw error;
    }
  }

  disconnect() {
    if (this.walletType === 'walletconnect' && this.wcProvider) {
      this.wcProvider.disconnect();
    }
    this.address = null;
    this.provider = null;
    this.walletType = null;
    this.wcProvider = null;
  }
}

class BridgeAggregatorService {
  async getLiFiQuote(fromChain, toChain, fromToken, toToken, amount, userAddress) {
    try {
      const url = `https://li.quest/v1/quote?fromChain=${fromChain}&toChain=${toChain}&fromToken=${fromToken}&toToken=${toToken}&fromAmount=${amount}&fromAddress=${userAddress}&slippage=0.03`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.estimate) {
        return {
          aggregator: 'LiFi',
          estimatedGas: data.estimate.gasCosts?.[0]?.amountUSD || '0',
          toAmount: data.estimate.toAmount || '0',
          route: data.includedSteps?.map(s => s.tool).join(' → ') || [],
          executionTime: data.estimate.executionDuration || 60,
          transactionRequest: data.transactionRequest,
          success: true,
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async getSocketQuote(fromChain, toChain, fromToken, toToken, amount, userAddress) {
    try {
      const url = `https://api.socket.tech/v2/quote?fromChainId=${fromChain}&fromTokenAddress=${fromToken}&toChainId=${toChain}&toTokenAddress=${toToken}&fromAmount=${amount}&userAddress=${userAddress}&uniqueRoutesPerBridge=true&sort=output&singleTxOnly=true`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.result?.routes?.length > 0) {
        const bestRoute = data.result.routes[0];
        return {
          aggregator: 'Socket',
          estimatedGas: bestRoute.totalGasFeesInUsd || '0',
          toAmount: bestRoute.toAmount || '0',
          route: bestRoute.usedBridgeNames?.join(' → ') || '',
          executionTime: bestRoute.serviceTime || 60,
          routeId: bestRoute.routeId,
          success: true,
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async getSquidQuote(fromChain, toChain, fromToken, toToken, amount, userAddress) {
    try {
      const response = await fetch('https://api.0xsquid.com/v1/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromChain: fromChain.toString(),
          toChain: toChain.toString(),
          fromToken: fromToken,
          toToken: toToken,
          fromAmount: amount,
          fromAddress: userAddress,
          toAddress: userAddress,
          slippage: 3,
          enableForecall: false,
        })
      });
      const data = await response.json();
      if (data.route) {
        return {
          aggregator: 'Squid',
          estimatedGas: data.route.estimate?.gasCosts?.amount || '0',
          toAmount: data.route.estimate?.toAmount || '0',
          route: 'Axelar',
          executionTime: data.route.estimate?.estimatedRouteDuration || 120,
          transactionRequest: data.route.transactionRequest,
          success: true,
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async getAcrossQuote(fromChain, toChain, fromToken, toToken, amount) {
    try {
      const response = await fetch(`https://across.to/api/suggested-fees?inputToken=${fromToken}&outputToken=${toToken}&originChainId=${fromChain}&destinationChainId=${toChain}&amount=${amount}`);
      const data = await response.json();
      if (data.relayFeePct) {
        const fee = (parseFloat(amount) * parseFloat(data.relayFeePct)) / 1e18;
        const outputAmount = parseFloat(amount) - fee;
        return {
          aggregator: 'Across',
          estimatedGas: (fee / 1e6).toFixed(4),
          toAmount: outputAmount.toString(),
          route: 'Across',
          executionTime: 180,
          success: true,
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async getAllQuotes(fromChain, toChain, fromToken, toToken, amount, userAddress) {
    const quotes = await Promise.allSettled([
      this.getLiFiQuote(fromChain.chainId, toChain.chainId, fromToken, toToken, amount, userAddress),
      this.getSocketQuote(fromChain.chainId, toChain.chainId, fromToken, toToken, amount, userAddress),
      this.getSquidQuote(fromChain.chainId, toChain.chainId, fromToken, toToken, amount, userAddress),
      this.getAcrossQuote(fromChain.chainId, toChain.chainId, fromToken, toToken, amount),
    ]);
    return quotes
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value)
      .sort((a, b) => parseFloat(a.estimatedGas) - parseFloat(b.estimatedGas));
  }

  async getSocketTransaction(routeId, userAddress) {
    try {
      const response = await fetch('https://api.socket.tech/v2/build-tx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ route: routeId, userAddress })
      });
      const data = await response.json();
      return data.result;
    } catch (e) {
      throw new Error('Failed to build transaction');
    }
  }
}

const App = () => {
  const [security] = useState(new SecurityManager());
  const [wallet] = useState(new UniversalWalletManager(security));
  const [service] = useState(new BridgeAggregatorService());
  const [walletAddress, setWalletAddress] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [fromChain, setFromChain] = useState(CHAINS[0]);
  const [toChain, setToChain] = useState(CHAINS[1]);
  const [fromToken, setFromToken] = useState('USDC');
  const [toToken, setToToken] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('0');
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [showChainSelector, setShowChainSelector] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const detected = wallet.detectWallets();
    setAvailableWallets(detected);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      loadBalance();
    }
  }, [walletAddress, fromChain, fromToken]);

  const loadBalance = async () => {
    const tokenAddr = TOKENS[fromToken]?.addresses[fromChain.chainId];
    if (tokenAddr) {
      const bal = await wallet.getBalance(tokenAddr, fromChain.rpc);
      setBalance(bal);
    }
  };

  const connectWalletProvider = async (walletId) => {
    try {
      setError(null);
      const address = await wallet.connect(walletId);
      setWalletAddress(address);
      setConnectedWallet(walletId);
      setShowWalletModal(false);
      security.resetFailedAttempts();
    } catch (err) {
      setError(err.message);
    }
  };

  const disconnectWallet = () => {
    wallet.disconnect();
    setWalletAddress(null);
    setConnectedWallet(null);
    setBalance('0');
  };

  const findRoutes = async () => {
    if (!walletAddress) {
      setError('Connect wallet');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Enter valid amount');
      return;
    }

    try {
      const tokenDecimals = TOKENS[fromToken]?.decimals || 6;
      security.validateAmount(amount, tokenDecimals);
    } catch (err) {
      setError(err.message);
      return;
    }
    
    setLoading(true);
    setQuotes([]);
    setError(null);

    try {
      const fromTokenAddr = TOKENS[fromToken]?.addresses[fromChain.chainId];
      const toTokenAddr = TOKENS[toToken]?.addresses[toChain.chainId];
      
      if (!fromTokenAddr || !toTokenAddr) {
        setError('Token not supported');
        setLoading(false);
        return;
      }

      const decimals = TOKENS[fromToken]?.decimals || 6;
      const amountWei = (parseFloat(amount) * Math.pow(10, decimals)).toString();

      const allQuotes = await service.getAllQuotes(
        fromChain,
        toChain,
        fromTokenAddr,
        toTokenAddr,
        amountWei,
        walletAddress
      );

      setQuotes(allQuotes);
      
      if (allQuotes.length === 0) {
        setError('No routes found');
      }
    } catch (err) {
      setError('Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  };

  const executeSwap = async (quote) => {
    if (!walletAddress) {
      setError('Wallet not connected');
      return;
    }

    setExecuting(true);
    setError(null);
    setTxHash(null);

    try {
      await wallet.switchChain(fromChain.chainId);

      let txData;
      
      if (quote.aggregator === 'Socket' && quote.routeId) {
        const txInfo = await service.getSocketTransaction(quote.routeId, walletAddress);
        txData = {
          from: walletAddress,
          to: txInfo.txTarget,
          data: txInfo.txData,
          value: '0x' + parseInt(txInfo.value || '0').toString(16),
          gasLimit: '0x' + parseInt(txInfo.gasLimit || '500000').toString(16),
        };
      } else if (quote.transactionRequest) {
        txData = {
          from: walletAddress,
          to: quote.transactionRequest.to,
          data: quote.transactionRequest.data,
          value: quote.transactionRequest.value || '0x0',
          gasLimit: quote.transactionRequest.gasLimit || '0x7A120',
        };
      } else {
        throw new Error('Transaction data unavailable');
      }

      const hash = await wallet.sendTransaction(txData);
      setTxHash(hash);
      security.resetFailedAttempts();
      
      setTimeout(loadBalance, 3000);
    } catch (err) {
      setError(err.message || 'Transaction failed');
    } finally {
      setExecuting(false);
    }
  };

  const swapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const ChainSelector = ({ value, onChange, onClose }) => (
    <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-white/10 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50 backdrop-blur-xl">
      {CHAINS.map(chain => (
        <button
          key={chain.id}
          onClick={() => { onChange(chain); onClose(); }}
          className="w-full p-3 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
        >
          <img src={chain.logo} alt={chain.name} className="w-6 h-6 rounded-full" />
          <span className="font-medium text-white/90">{chain.name}</span>
          {chain.chainId === value.chainId && <Check className="ml-auto text-white" size={20} />}
        </button>
      ))}
    </div>
  );

  const WalletModal = () => (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Connect</h2>
          <button onClick={() => setShowWalletModal(false)} className="text-white/60 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-2">
          {WALLET_PROVIDERS.map(provider => {
            const isAvailable = availableWallets.includes(provider.id);
            return (
              <button
                key={provider.id}
                onClick={() => isAvailable && connectWalletProvider(provider.id)}
                disabled={!isAvailable && provider.id !== 'walletconnect'}
                className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${
                  isAvailable || provider.id === 'walletconnect'
                    ? 'border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 cursor-pointer'
                    : 'border-white/5 bg-white/5 opacity-30 cursor-not-allowed'
                }`}
              >
                <span className="text-2xl">{provider.icon}</span>
                <span className="font-medium text-white/90">{provider.name}</span>
                {(isAvailable || provider.id === 'walletconnect') && (
                  <div className="text-white/60 ml-auto">→</div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-3 bg-white/5 border border-white/10 rounded-lg flex gap-2">
          <Shield className="text-white/60 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-white/60">
            Secured connection with validation and rate limiting
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-lg mx-auto pt-20 px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">
            BRIDGE
          </h1>
          
          <div className="mt-8">
            {!walletAddress ? (
              <button
                onClick={() => setShowWalletModal(true)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-3 rounded-full transition-all backdrop-blur-sm flex items-center gap-2 mx-auto"
              >
                <Wallet size={18} />
                Connect
              </button>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
                  <span className="text-xl">{WALLET_PROVIDERS.find(w => w.id === connectedWallet)?.icon}</span>
                  <span className="text-white/90 font-mono text-sm">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 px-4 py-2 rounded-full transition-all backdrop-blur-sm"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-center gap-2 mb-6 text-white/40 text-xs">
            <Lock size={12} />
            <span>Secured & Validated</span>
          </div>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex gap-2">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
              <div className="text-sm text-red-200">{error}</div>
              <button onClick={() => setError(null)} className="ml-auto">
                <X className="text-red-400" size={18} />
              </button>
            </div>
          )}

          {txHash && (
            <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex gap-2">
              <Check className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
              <div className="text-sm text-green-200 flex-1">
                <a 
                  href={`${fromChain.explorer}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-green-100"
                >
                  View Transaction <ExternalLink size={12} />
                </a>
              </div>
              <button onClick={() => setTxHash(null)} className="ml-auto">
                <X className="text-green-400" size={18} />
              </button>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-white/40 uppercase tracking-wider">From</span>
                {walletAddress && (
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span>{balance}</span>
                    <button onClick={loadBalance} className="hover:text-white">
                      <RefreshCw size={12} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mb-3">
                <div className="relative flex-1">
                  <button
                    onClick={() => setShowChainSelector('from')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2 hover:border-white/30 transition-colors"
                  >
                    <img src={fromChain.logo} alt={fromChain.name} className="w-6 h-6 rounded-full" />
                    <span className="font-medium text-white/90 text-sm">{fromChain.name}</span>
                    <span className="text-white/40 ml-auto">▼</span>
                  </button>
                  {showChainSelector === 'from' && (
                    <ChainSelector value={fromChain} onChange={setFromChain} onClose={() => setShowChainSelector(null)} />
                  )}
                </div>
                
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 hover:border-white/30 transition-colors text-sm"
                >
                  {Object.keys(TOKENS).map(token => (
                    <option key={token} value={token} className="bg-black">{token}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-3xl font-bold text-white outline-none"
                />
                {walletAddress && parseFloat(balance) > 0 && (
                  <button
                    onClick={() => setAmount(balance)}
                    className="text-white/60 hover:text-white text-xs font-medium px-3 py-1 rounded-lg bg-white/5"
                  >
                    MAX
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={swapChains}
                className="bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-full transition-all backdrop-blur-sm"
              >
                <ArrowDownUp className="text-white" size={20} />
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-white/40 uppercase tracking-wider mb-3 block">To</span>
              <div className="flex gap-3 mb-3">
                <div className="relative flex-1">
                  <button
                    onClick={() => setShowChainSelector('to')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2 hover:border-white/30 transition-colors"
                  >
                    <img src={toChain.logo} alt={toChain.name} className="w-6 h-6 rounded-full" />
                    <span className="font-medium text-white/90 text-sm">{toChain.name}</span>
                    <span className="text-white/40 ml-auto">▼</span>
                  </button>
                  {showChainSelector === 'to' && (
                    <ChainSelector value={toChain} onChange={setToChain} onClose={() => setShowChainSelector(null)} />
                  )}
                </div>
                
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 hover:border-white/30 transition-colors text-sm"
                >
                  {Object.keys(TOKENS).map(token => (
                    <option key={token} value={token} className="bg-black">{token}</option>
                  ))}
                </select>
              </div>
              
              <div className="text-3xl font-bold text-white/50">
                {quotes.length > 0 ? `~${(parseFloat(quotes[0].toAmount) / Math.pow(10, TOKENS[toToken]?.decimals || 6)).toFixed(4)}` : '0.0'}
              </div>
            </div>

            <button
              onClick={findRoutes}
              disabled={loading || !walletAddress}
              className="w-full bg-white hover:bg-white/90 text-black font-medium py-4 rounded-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Searching...
                </>
              ) : (
                <>
                  <Zap size={18} />
                  {walletAddress ? 'Find Routes' : 'Connect Wallet'}
                </>
              )}
            </button>
          </div>

          {quotes.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">
                {quotes.length} Routes
              </h3>
              {quotes.map((quote, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-white text-sm">{quote.aggregator}</div>
                      <div className="text-xs text-white/40 mt-0.5">{quote.route}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium text-xs">
                        ${parseFloat(quote.estimatedGas).toFixed(4)}
                      </div>
                      <div className="text-xs text-white/40">gas</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3 text-xs bg-white/5 p-2 rounded-lg">
                    <div className="text-white/60">
                      {(parseFloat(quote.toAmount) / Math.pow(10, TOKENS[toToken]?.decimals || 6)).toFixed(4)} {toToken}
                    </div>
                    <div className="text-white/40">
                      ~{quote.executionTime}s
                    </div>
                  </div>

                  <button
                    onClick={() => executeSwap(quote)}
                    disabled={executing || !quote.transactionRequest && !quote.routeId}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {executing ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        Executing...
                      </>
                    ) : (
                      <>
                        {idx === 0 && '⚡ '}
                        Execute
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-white/30 text-xs">
          Multi-wallet • 20+ chains • Secured
        </div>
      </div>

      {showWalletModal && <WalletModal />}
    </div>
  );
};

export default App;
