const rateLimiter = require("express-rate-limit");

exports.Limiter = function(limit, max){
    return rateLimiter({
        windowMs: limit,
        max: max,
        handler: function (req, res, /*next*/) {
            return res.status(429).json({
                message:"Too many requests from this IP, please try again later"
            });
      }
    })
}
