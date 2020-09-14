function RfidDao (mongoose) {
	this.getModel = function () {
		var model = undefined;

		try {
			if (mongoose.model('rfid')) {
				model = mongoose.model('rfid');
			}
		} catch (e) {
			if (e.name === 'MissingSchemaError') {
				var schema = mongoose.Schema({
					uuId: { type: String, required: true},
					gatewayId: { type: String, required: true},
					type: { type: Number},
					assetId: { type: String, default: 'NULL'},
					assetName: { type: String, default: 'NULL'},
					name: { type: String, default: 'NULL'},
					venderName: { type: String, default: 'NULL'},
					timeStamp: { type: String}
				});
				model = mongoose.model('rfid', schema);
			}
		}
		return model;
	};
}

module.exports =  RfidDao;
