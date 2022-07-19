# WebSocketClient

## Overview

This module exports a class `WebSocketClient` that allows front ent application to instantiate a WebSocket instance to establish a connection to a WebSocket server (wss).

This module has been built using TDD (Test Driven Development) to cover the most common use cases and to minimize defects and bugs.

## Tech stack

- TypeScript
- Jest
- BabelJS
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- TDD

## How to install

1. Clone this repository
2. Navigate to the root folder and run `npm install`

## How to run unit tests

From the root folder run `npm test`

## Next Steps

It would be appropriate refine the unit tests and implement util functions (to clean the codebase and make it more readable).

It would also make sense creating a GitHub Action Workflow for testing so that the module can be CD'd (continuous deployment) as it doesn't need much manual testing.