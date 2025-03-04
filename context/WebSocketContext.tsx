import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

// Definindo os tipos para o WebSocket
interface WebSocketContextType {
  socket: WebSocket | null;
  sendMessage: (message: object) => void;
}

// Valor padrão do contexto
const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Estabelece a conexão WebSocket
    const ws = new WebSocket("ws://192.168.18.216:8080"); // Substitua pelo seu WebSocket server URL

    ws.onopen = () => console.log("Conexão WebSocket aberta!");
    ws.onclose = () => console.log("Conexão WebSocket fechada!");
    ws.onerror = (error) => console.error("Erro no WebSocket:", error);

    // Salva o WebSocket em `ref` e estado
    socketRef.current = ws;
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message: object) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket não está aberto.");
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket deve ser usado dentro de um WebSocketProvider");
  }

  return context;
};
