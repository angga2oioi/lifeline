//@ts-check

const axios = require("axios");
const { generateInstanceId } = require("./instance");
const { num2Int } = require("./helper");

async function sendHeartbeat({
    baseUrl,
    projectId,
    serviceId,
    instanceId,
    instanceFilePath,
    options
}) {

    if(!instanceId){
        instanceId = await generateInstanceId(instanceFilePath);
    }
    
    try {
        let timestamp = new Date().toISOString()
        await axios.post(baseUrl, {
            projectId,
            serviceId,
            instanceId,
            timestamp,
        });

        if(options?.successLog===true){
            console.log("[Heartbeat] sent at", timestamp);
        }
        
    } catch (err) {
        if(options?.errorLog===true){
            console.error("[Heartbeat] Failed to send:", err.message);
        }
        
    }
}

function startHeartbeat (params) {
    sendHeartbeat(params);
    setInterval(() => {
        sendHeartbeat(params)
    }, num2Int(params?.interval) || 5000);
}

module.exports = { startHeartbeat };
