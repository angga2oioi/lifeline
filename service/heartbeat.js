//@ts-check

const { num2Int } = require("./helper");
const { sendHeartbeat } = require("./api");

function startHeartbeat (params) {
    sendHeartbeat(params);
    setInterval(() => {
        sendHeartbeat(params)
    }, num2Int(params?.interval) || 5000);
}

module.exports = { startHeartbeat };
