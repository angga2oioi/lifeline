//@ts-check

const {
    startHeartbeat
} = require("./../service/heartbeat")

const useLifeline = (params) => {
    return {
        startHeartbeat: () => {
            return startHeartbeat(params)
        }
    }

}

module.exports = useLifeline