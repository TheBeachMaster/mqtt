var match, pl = /\+/g, search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query = window.location.search.substring(1),
    nodes = 4,
    params = {}; while (match = search.exec(query)) params[decode(match[1])] = decode(match[2]);
var l = location.pathname;
var x = l.substring(l.lastIndexOf("/") + 1);
var module = x.substring(0, x.lastIndexOf("."));
var clientId = undefined;
var ws = { send: function (payload, qos) {
        var message = new Paho.MQTT.Message(payload);
        message.destinationName = topic("events");
        message.qos = qos == 0 ? 0 : 2;
        mqtt.send(message); } };

var subscribeOptions = {
    qos: 2,  // QoS
    invocationContext: { foo: true },  // Passed to success / failure callback
    onSuccess: function (x) { console.log("N2O Subscribed"); },
    onFailure: function (m) { console.log("N2O Subscription failed: " + m.errorMessage); },
    timeout: 2 };

var options = {
    timeout: 2,
    userName: module,
    password: "password",
    onFailure: function (m) { console.log("N2O Connection failed: " + m.errorMessage); },
    onSuccess: function ()  { console.log("N2O Connected");
                            } };
function topic(prefix) { return prefix + "/" + rnd() + "/" + module + "/anon/" + clientId + "/" + token; }
function rnd() { return Math.floor((Math.random() * nodes)+1); }

  mqtt = new Paho.MQTT.Client(host, 8083, '');
  mqtt.onConnectionLost = function (o) { console.log("connection lost: " + o.errorMessage); };
  mqtt.onMessageArrived = function (m) {
        if (undefined == clientId && m.payloadBytes.length == 0)
        {
            words = m.destinationName.split("/");
            clientId = words[2];
            console.log(clientId + " init sent");
            token = '1';
            ws.send(enc(tuple(atom('init'),bin(token))));
        } else {
        var BERT = m.payloadBytes.buffer.slice(m.payloadBytes.byteOffset,
            m.payloadBytes.byteOffset + m.payloadBytes.length);
        try {
            erlang = dec(BERT);
            for (var i = 0; i < $bert.protos.length; i++) {
                p = $bert.protos[i]; if (p.on(erlang, p.do).status == "ok") return;
            }
        } catch (e) { console.log(e); }
        }
    };
  mqtt.connect(options);
