import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                marketplace: 'src/marketplace.html',
                nftPage: 'src/nft-page.html',
                ranking: 'src/ranking.html',
                authorPage: 'src/author-page.html',
                connectWallet: 'src/connect-wallet.html',
                createAccount: 'src/create-account.html',
            },
        },
    }
});
