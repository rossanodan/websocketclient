class WebSocketClient {
  wsClient: WebSocket;
  subscriptions: string[];

  constructor (url: string) {
    this.wsClient = new WebSocket(url);
    this.subscriptions = [];
  };

  getConnectionStatus = (): string => {
    const connectionStatus = this.wsClient.readyState;

    if (connectionStatus === 0) {
      return 'CONNECTING';
    }

    if (connectionStatus === 1) {
      return 'OPEN';
    }

    if (connectionStatus === 2) {
      return 'CLOSING';
    }

    return 'CLOSED';
  }

  closeConnection = (): void => {
    this.wsClient.close();
  }

  subscribe = (room: string): boolean => {
    if (!this.subscriptions.includes(room)) {
      this.subscriptions.push(room);

      return true;
    }

    return false;
  }

  getOpenSubscriptions = (): string[] => {
    return this.subscriptions;
  }
};

export {
  WebSocketClient
};
