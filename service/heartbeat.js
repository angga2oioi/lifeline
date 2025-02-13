//@ts-check

const axios = require("axios");
const { generateInstanceId } = require("./instance");
const { num2Int } = require("./helper");

async function sendHeartbeat({
    baseUrl,
    projectId,
    serviceId,
    instanceFilePath,
}) {
    const instanceId = await generateInstanceId(instanceFilePath);

    try {
        let timestamp = new Date().toISOString()
        await axios.post(baseUrl, {
            projectId,
            serviceId,
            instanceId,
            timestamp,
        });
        console.log("[Heartbeat] sent at", timestamp);
    } catch (err) {
        console.error("[Heartbeat] Failed to send:", err.message);
    }
}

function startHeartbeat(params) {
    sendHeartbeat(params);
    setInterval(() => {
        sendHeartbeat(params)
    }, num2Int(params?.interval) || 5000);
}

module.exports = { startHeartbeat };
