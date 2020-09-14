/**
 * Created by Vijay.
 */
//var mongoose = require('mongoose');
function NotificationDao (mongoose) {
	this.getModel = function () {
		var model = undefined;

		try {
			if (mongoose.model('notification')) {
				model = mongoose.model('notification');
			}
		} catch (e) {
			if (e.name === 'MissingSchemaError') {
				var schema = mongoose.Schema({
					zoneId: { type: String, required: true},
					zoneName:{ type: String, default:'NULL'},
					floorId:{type: Number, required: false},
					plantId:{type: Number, required: false},
					type: { type: Number, default:0},
					gatewayId: { type: String, default: 'NULL'},
					nodeId: { type: String, default: 'NULL'},
					beaconId: { type: String, default: 'NULL'},
					isEntry: { type: Boolean, default: false},
					empId: { type: String, default: 'NULL'},
					companyId:	{type: Number, required: true},
					assetTypeId:{ type: String, default: 'NULL'},
					assetTypeName:{ type: String, default: 'NULL'},
					assetSubTypeId: { type: String, default: 'NULL'},
					assetSubTypeName:{ type: String, default: 'NULL'},
					empName: { type: String, default: 'NULL'},
					isAllowed: { type: Number },
					isMax: { type: Number },
					isMin: { type: Number },
					isMissing: { type: Number, default: 0 },
					isMaxTime: { type: Number },
					time: { type: String, default: '0'},
					exitTime: { type: String, default: '0'},
					entryTime: { type: String, default: '0'},
					message: { type: String, default: 'NULL'},
					ruleType:{type: Number},
					timeStamp: { type: Date, default: Date.now }
				}, {versionKey: false});
				model = mongoose.model('notification', schema);
			}
		}
		return model;
	}

}
module.exports =  NotificationDao;
