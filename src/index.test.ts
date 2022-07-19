import WS from "jest-websocket-mock";

import { WebSocketClient } from './index';

jest.setTimeout(10000);

const wait = async (seconds: number) => await new Promise((resolve) => setTimeout(resolve, seconds));

describe('WebSocketClient', () => {
  let wsServer: WS;

  beforeAll(() => {
    wsServer = new WS('ws://localhost:1234');
  });

  test('should exist', () => {
    expect(WebSocketClient).toBeDefined();
  });

  test('should establish a connection if a valid URL and room is provided', async () => {
    const wsClient = new WebSocketClient({
      url: 'ws://localhost:1234',
      room: 'testing123'
    });
    await wsServer.connected;

    expect(wsClient.getConnectionStatus()).toBe('OPEN');
  });

  test('should close connection', async () => {
    const wsClient = new WebSocketClient({
      url: 'ws://localhost:1234',
      room: 'testing123'
    });
    await wsServer.connected;

    await wait(2000);
    expect(wsClient.getConnectionStatus()).toBe('OPEN');

    wsClient.closeConnection();

    await wait(2000);
    expect(wsClient.getConnectionStatus()).toBe('CLOSED');
  });

  test('should allow to subscribe to a room', async () => {
    const wsClient = new WebSocketClient({
      url: 'ws://localhost:1234',
      room: 'testing123'
    });
    await wsServer.connected;

    const subscription = wsClient.subscribe('testing456');

    expect(subscription).toEqual(['testing123', 'testing456']);
  });

  test('should not allow to subscribe to the same room twice', async () => {
    const wsClient = new WebSocketClient({
      url: 'ws://localhost:1234',
      room: 'testing123'
    });
    await wsServer.connected;

    wsClient.subscribe('testing456');
    wsClient.subscribe('testing789');

    expect(wsClient.getOpenSubscriptions()).toEqual(['testing123', 'testing456', 'testing789']);
  });

  test('should allow to unsubscribe from a room', async () => {
    const wsClient = new WebSocketClient({
      url: 'ws://localhost:1234',
      room: 'testing123'
    });
    await wsServer.connected;

    wsClient.subscribe('testing456');

    expect(wsClient.getOpenSubscriptions()).toEqual(['testing123', 'testing456']);

    wsClient.unsubscribe('testing123');

    expect(wsClient.getOpenSubscriptions()).toEqual(['testing456']);
  });
});
