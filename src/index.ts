type Props = {
  url: string;
  room: string;
};

class WebSocketClient {
  wsClient: WebSocket;
  subscriptions: string[];

  /**
   * 
   * @param {string} url the URL of the WebSocket Server
   * @param {string} room the room to subscribe to 
   */
  constructor ({ url, room }: Props) {
    this.wsClient = new WebSocket(url);
    this.subscriptions = [];
    this.subscriptions.push(room);
  };

  /**
   * @returns {number} The status of the connection, CONNECTING | OPEN | CLOSING | CLOSED
   */
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

  /**
   * This method closes the connection to the WebSocket Server
   */
  closeConnection = (): void => {
    this.wsClient.close();
  }

  /**
   * @param {string} room the room to subscribe to
   * @returns {string[]} the list of open subscriptions
   */
  subscribe = (room: string): string[] => {
    if (!this.subscriptions.includes(room)) {
      this.subscriptions.push(room);

      return this.subscriptions;
    }

    return this.subscriptions;
  }

  /**
   * @returns {string[]} the list of open subscriptions
   */
  getOpenSubscriptions = (): string[] => {
    return this.subscriptions;
  }

  /**
   * @param {string} room the room to unsubscribe from
   * @returns {string[]} the list of open subscriptions
   */
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
