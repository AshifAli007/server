const jwt = require('jsonwebtoken');

module.exports = function checkToken(req, res, next) {
	var token = req.headers['token'];
	console.log("New token " + token); 
	if(token) {
		jwt.verify(token, 'my_secret_key',(err,decode)=>{
			console.log("JWT err: " + err);
			console.log("JWT decode: " + JSON.stringify(decode));
			if(err) {
				res.json({"status":500,
					"message":"INVALID TOKEN",
					"error":err.message
				});
			} else {
				next();
			}
		});
	} else {
		res.json({"status":500,
			"message":"NO TOKEN PROVIDED",
			"error":"token must be provide in header for endpoint access"
		});
	}
};


  