type Props = {
  url: string;
  room: string;
};

class WebSocketClient {
  wsClient: WebSocket;
  subscriptions: string[];

  constructor ({ url, room }: Props) {
    this.wsClient = new WebSocket(url);
    this.subscriptions = [];
    this.subscriptions.push(room);
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

  subscribe = (room: string): string[] => {
    if (!this.subscriptions.includes(room)) {
      this.subscriptions.push(room);

      return this.subscriptions;
    }

    return this.subscriptions;
  }

  getOpenSubscriptions = (): string[] => {
    return this.subscriptions;
  }

  unsubscribe = (room: string): string[] => {
    this.subscriptions = this.subscriptions.filter(subscription => subscription !== room);

    if (this.subscriptions.length === 0) {
      this.closeConnection();
    }

    return this.subscriptions;
  }
};

export {
  WebSocketClient
};
