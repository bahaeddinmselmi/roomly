import React, { createContext, useContext, useState, useEffect } from 'react';

interface TokenContextType {
  tokens: number;
  addTokens: (amount: number) => void;
  spendTokens: (amount: number) => boolean;
  hasEnoughTokens: (amount: number) => boolean;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState(25); // Starting with 25 tokens

  const addTokens = (amount: number) => {
    setTokens(prev => prev + amount);
  };

  const spendTokens = (amount: number) => {
    if (tokens >= amount) {
      setTokens(prev => prev - amount);
      return true;
    }
    return false;
  };

  const hasEnoughTokens = (amount: number) => {
    return tokens >= amount;
  };

  return (
    <TokenContext.Provider value={{ tokens, addTokens, spendTokens, hasEnoughTokens }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
}