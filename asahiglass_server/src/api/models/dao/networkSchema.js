/**
 * Created by Alim.
 */
//var mongoose = require('mongoose');
function NotificationDao (mongoose) {
	this.getModel = function () {
		var model = undefined;

		try {
			if (mongoose.model('network')) {
				model = mongoose.model('network');
			}
		} catch (e) {
			if (e.name === 'MissingSchemaError') {
				var schema = mongoose.Schema({
					networkName:{ type: String, required: true},
					meshUuid: { type: String, required: true},
					companyId:	{type: Number, required: true},
					creatorId:	{type: Number, required: true},
					gatewaySubAddress:{ type: String, unique : true, default: 'NULL'},
					gatewayPubAddress:{ type: String, unique : true, default: 'NULL'},
					gatewayHealthAddress:{ type: String, unique : true, default: 'NULL'},
					netKeys:{ type : Array , "default" : [] },
					appKeys:{ type : Array , "default" : [] },
					provisioners:{ type : Array , "default" : [] },
					createdAt: { type: Date, default: Date.now },
					isActive: { type: Boolean, default: true}
				},{ versionKey: false });
				model = mongoose.model('network', schema);
			}
		}
		return model;
	};

}
module.exports =  NotificationDao;
