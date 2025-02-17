//@ts-check

const {
    startHeartbeat
} = require("./../service/heartbeat")

const {
    sendEvent
} = require("./../service/api")


const useLifeline = (params) => {
    return {
        startHeartbeat: () => {
            return startHeartbeat(params)
        },
        sendEvent: (payload) => {
            return sendEvent(params, payload)
        }
    }

}

module.exports = useLifeline