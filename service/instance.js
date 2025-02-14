//@ts-check

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const DEFAULT_INSTANCE_FILE = "./instance_id"; // Persistent storage

async function generateInstanceId(file = "") {
    if (!file) {
        file = DEFAULT_INSTANCE_FILE
    }

    // 1️⃣ Check if instanceId is already stored
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, "utf8").trim();
    }

    const uniqueId = uuidv4();
    fs.writeFileSync(file, uniqueId);
    return uniqueId;

}

module.exports = { generateInstanceId };
