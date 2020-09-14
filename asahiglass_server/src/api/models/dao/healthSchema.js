function NotificationDao (mongoose) {
	this.getModel = function () {
		var model = undefined;

		try {
			if (mongoose.model('health')) {
				model = mongoose.model('health');
			}
		} catch (e) {
			if (e.name === 'MissingSchemaError') {
				var schema = mongoose.Schema({
					serial: { type: String, default: 'NULL'},
					deviceType: { type: Number, required: true},
					zoneId: { type: String, default: 'NULL'},
					nodeId: { type: String, default: 'NULL'},
					companyId:	{type: Number, required: true},
					time: { type: String, default: '0'},
					message: { type: String, default: 'NULL'},
					zoneName:{ type: String, default:'NULL'},
					gwSerial: { type: String, default: 'NULL'},
					nodeStatus:{ type: Number },
					nodeStatusTime:{ type: String, default: '0'}
				});
				model = mongoose.model('health', schema);
			}
		}
		return model;
	}

}
module.exports =  NotificationDao;
