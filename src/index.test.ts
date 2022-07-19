import WS from "jest-websocket-mock";

import { WebSocketClient } from './index';

jest.setTimeout(10000);

describe('WebSocketClient', () => {
  let wsServer: WS;

  beforeAll(() => {
    wsServer = new WS('ws://localhost:1234');
  });

  test('should exist', () => {
    expect(WebSocketClient).toBeDefined();
  });

  test('should establish a connection if a valid URL is provided', async () => {
    const wsClient = new WebSocketClient("ws://localhost:1234");
    await wsServer.connected;

    expect(wsClient.getConnectionStatus()).toBe('OPEN');
  });
});
