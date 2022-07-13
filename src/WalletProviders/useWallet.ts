import {
  PendingTransaction,
  SubmitTransactionRequest,
  TransactionPayload
} from 'aptos/dist/api/data-contracts';
import { createContext, useContext } from 'react';
import {
  AccountKeys,
  PublicKey,
  WalletAdapter,
  WalletName,
  WalletReadyState
} from '../WalletAdatpers/BaseAdapter';

export interface Wallet {
  adapter: WalletAdapter;
  readyState: WalletReadyState;
}

export interface WalletContextState {
  autoConnect: boolean;
  wallets: Wallet[];
  wallet: Wallet | null;
  account: AccountKeys | null;
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;
  select(walletName: WalletName): void;
  connect(walletName: string): Promise<void>;
  disconnect(): Promise<void>;
  signAndSubmitTransaction(
    transaction: TransactionPayload
    // connection: Connection,
    // options?: SendTransactionOptions
  ): Promise<PendingTransaction>;

  signTransaction(transaction: TransactionPayload): Promise<SubmitTransactionRequest>;
  // signAllTransactions: SignerWalletAdapterProps['signAllTransactions'] | undefined;
  // signMessage: MessageSignerWalletAdapterProps['signMessage'] | undefined;
}

const DEFAULT_CONTEXT = {
  autoConnect: false,
  connecting: false,
  connected: false,
  disconnecting: false
} as WalletContextState;

export const WalletContext = createContext<WalletContextState>(
  DEFAULT_CONTEXT as WalletContextState
);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
