//@ts-check
const axios = require("axios")
const { generateInstanceId } = require("./instance");
const { stringifyObjectValues, num2Int } = require("./helper");
const crypto = require("crypto")

const getAxios = (params) => {

    return axios.create({
        baseURL: params.baseUrl,
    });
}

const generateHeader = ({ projectId, secretKey }, query = {}, body = {}) => {
    const timestamp = new Date().getTime();

    let params = JSON.stringify({
        ...stringifyObjectValues(query),
        ...body,
    });

    const Hash = params + num2Int(timestamp);
    const signature = crypto
        .createHmac(`SHA256`, secretKey)
        .update(Hash)
        .digest("hex")
        .toUpperCase();

    return {
        projectId,
        timestamp,
        signature
    }
}

const sendHeartbeat = async (params) => {
    let {
        secretKey,
        projectId,
        serviceId,
        instanceId,
        instanceFilePath,
        options
    } = params;

    if (!instanceId) {
        instanceId = await generateInstanceId(instanceFilePath);
    }

    try {

        let timestamp = new Date().getTime();
        let payload = {
            instanceId,
            serviceId,
            timestamp,
        }

        let headers = generateHeader({ projectId, secretKey }, {}, payload)
        await getAxios(params).post(`/v1/heartbeats`, payload,
            {
                headers
            }
        );

        if (options?.successLog === true) {
            console.log("[Heartbeat] sent at", timestamp);
        }

    } catch (err) {
        if (options?.errorLog === true) {
            console.error("[Heartbeat] Failed to send:", err.message);
        }

    }

    return null
}

const sendEvent = async (params, { title, message }) => {
    let {
        secretKey,
        projectId,
        serviceId,
        instanceId,
        instanceFilePath,
        options
    } = params;

    if (!instanceId) {
        instanceId = await generateInstanceId(instanceFilePath);
    }

    try {
        let timestamp = new Date().getTime();
        let payload = {
            instanceId,
            serviceId,
            title,
            message,
            timestamp,
        }
        
        let headers = generateHeader({ projectId, secretKey }, {}, payload)
        await getAxios(params).post(`/v1/events`, payload, {
            headers
        });

        if (options?.successLog === true) {
            console.log("[Event] sent at", timestamp);
        }

    } catch (err) {
        if (options?.errorLog === true) {
            console.error("[Event] Failed to send:", err.message);
        }

    }
}

module.exports = {
    sendHeartbeat,
    sendEvent
}