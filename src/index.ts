class WebSocketClient {
  wsClient: WebSocket;

  constructor (url: string) {
    this.wsClient = new WebSocket(url);
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
};

export {
  WebSocketClient
};
