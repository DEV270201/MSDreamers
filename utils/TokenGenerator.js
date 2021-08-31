const crypto = require("crypto");

const TokenGenerator = () => {
    let token = crypto.randomBytes(64).toString("hex");

    let hashToken = crypto.createHash("SHA256").update(token).digest("hex");

    return {hashToken,token};
}

module.exports = TokenGenerator;