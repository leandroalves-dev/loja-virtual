// src/context/NOME_DO_CONTEXTO.tsx
import React, { createContext, useContext, useState } from "react";

// 1. Tipo do que será armazenado no context
type Item = {
    id: number;
};

type NomeContextoType = {
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (id: number) => void;
    hasItem: (id: number) => boolean;
};

// 2. Criação do contexto
const NomeContexto = createContext<NomeContextoType | undefined>(undefined);

// 3. Criação do provider
export const NomeProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (item: Item) => {
        setItems(prev => [...prev, item]);
    };

    const removeItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const hasItem = (id: number) => {
        return items.some(item => item.id === id);
    };

    return (
        <NomeContexto.Provider value={{ items, addItem, removeItem, hasItem }}>
        {children}
        </NomeContexto.Provider>
    );
};

// 4. Hook personalizado para usar o contexto
export const useNome = () => {
  const context = useContext(NomeContexto);
  if (!context) {
    throw new Error("useNome precisa estar dentro de <NomeProvider>");
  }
  return context;
};
