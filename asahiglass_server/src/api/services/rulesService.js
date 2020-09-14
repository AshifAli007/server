var RuleEngine = require('node-rules');
/* Sample Rule to block a transaction if its below 500 */
exports.maxCountNew = function(factData, maxCount){
	console.log("Fact Data: " + JSON.stringify(factData) + " ANd Max Cout: " + maxCount);
	return new Promise (function(resolve, reject){

		var rule = {
			"condition": function(R) {
				console.log(this);
				
				R.when(this.count > maxCount);
			},
			"consequence": function(R) {
				this.result = false;
				this.reason = "The transaction was blocked as it was less than 500";
				R.stop();
			}
		};
		/* Creating Rule Engine instance and registering rule */
		var R = new RuleEngine();
		R.register(rule);
		/* Fact with less than 500 as transaction, and this should be blocked */
		var fact = factData;
		R.execute(fact, function(data) {
			if (data.result) {
				console.log("Valid transaction");
			} else {
				//console.log("Blocked Reason:" + data.reason);
				resolve(data.reason)			
	
				
			}
		});

	});


}
