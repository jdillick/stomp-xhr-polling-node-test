global.TextEncodingPolyfill = require("text-encoding");
global.TextEncoder = TextEncodingPolyfill.TextEncoder;
global.TextDecoder = TextEncodingPolyfill.TextDecoder;
global.WebSocket = require("websocket").w3cwebsocket;

const SockJs = require("sockjs-client-node-xhr-polling");


class XHRHeaders {
  constructor(myHeaders = {}) {
    this.myHeaders = myHeaders;
  }

  setHeaders(newHeaders = {}) {
    this.myHeaders = newHeaders;
  }

  mergeWith(headers = {}) {
    return {
      ...headers,
      ...this.myHeaders,
    };
  }
}

global.getXHRHeaders = new XHRHeaders({
  Cookie: 'SESSION=9a3df518-a92b-4f08-a972-6f1dfbd7ebe6',
});

const ws = new SockJs("http://localhost:8081/api/v1/connect", null, {
  transports: ["xhr-polling"],
});


const StompJs = require('@stomp/stompjs/esm5');
const client = StompJs.Stomp.over(ws);

// client.heartbeat.outgoing = 10000; // client will send heartbeats every X milliseconds
// client.heartbeat.incoming = 10000; // client to receive heartbeats from server (0 = no heartbeat)
//
const onConnect = frame => {
    console.log('stomp: onConnect');
};

const onError = error => {
    console.log(error);
};

const onClose = message => {
    console.log(message);
}

client.connect({}, onConnect, onError, onClose);
