module.exports = {
	'url': {
		'baseUrl': 'https://localhost/image/'
	},
	"fileUrl":{
		"baseUrl": 'https://localhost/file/'
	},
	'cronInterval': '*/15 * * * *',
	'API_Disable_Time':300000,
	'zoneType':{
		'TRILATERATION_ZONE_TYPE':1,
		'LOGICAL_ZONE_TYPE':2,
		'INDEPENDENT_ZONE_TYPE':3,
		'MEAN_RSSI_ZONE_TYPE':4
	},
	'table':{
		'defaultTables': ['company_detail','rule','privilegeUser', 'userInfo', 'plant_type_list', 'software']
	},

	'tableSchema':{
		'company_detail':'create table company_detail (id INT(32) NOT NULL AUTO_INCREMENT, name VARCHAR(128), address VARCHAR(128), website VARCHAR(128), contactPerson INT(32), logo VARCHAR(128), PRIMARY KEY (id), UNIQUE(name))',
		'rule':'create table rule (id INT(32) NOT NULL AUTO_INCREMENT, type INT(8), name VARCHAR(64), opretor VARCHAR(64) DEFAULT NULL , violationMsg VARCHAR(124) DEFAULT NULL, nonViolationMessage VARCHAR(124) DEFAULT NULL, isarrgument INT(8) DEFAULT NULL, ruleDesc varchar(128) DEFAULT NULL, arrgumentColumn varchar(128) DEFAULT NULL, PRIMARY KEY (id))',
		'privilegeUser':'create table privilegeUser (id INT(32) NOT NULL AUTO_INCREMENT, fullName VARCHAR(128), userType INT(8), email VARCHAR(64), password VARCHAR(128), lastLogInTime INT(64), PRIMARY KEY (id), UNIQUE(email),failCount INT(64) DEFAULT 0,isBlock INT(64) DEFAULT 0,lastFailTime VARCHAR(128) DEFAULT NULL,apiEnableTime VARCHAR(128) DEFAULT NULL)',
		'userInfo':'create table userInfo (id INT(32) NOT NULL AUTO_INCREMENT, fullName VARCHAR(128), userType INT(8), email VARCHAR(64), contactNo bigint(16), password VARCHAR(128), address VARCHAR(256), lastLogInTime INT(64), profilPhoto VARCHAR(128), fcmtokenKey VARCHAR(64), creatorId INT(32), companyId INT(32), PRIMARY KEY (id), UNIQUE(email),failCount INT(64) DEFAULT 0,isBlock INT(64) DEFAULT 0,lastFailTime VARCHAR(128) DEFAULT NULL,apiEnableTime VARCHAR(128) DEFAULT NULL)',
		'plant_type_list':'create table plant_type_list (id INT(32) NOT NULL AUTO_INCREMENT, name VARCHAR(128) , PRIMARY KEY (id))',
		/*Dynamic Table*/
		'software': 'create table software (id INT(32) NOT NULL AUTO_INCREMENT, type int(8), version VARCHAR(128), description VARCHAR(128), filename VARCHAR(128), size bigint(16), crc varchar(128), uploadedOn varchar(128), PRIMARY KEY (id), UNIQUE(filename))',
		 
		/*Dynamic Table*/ 	
		//'userInfo':'(id INT(32) NOT NULL AUTO_INCREMENT, fullName VARCHAR(128), userType INT(8), email VARCHAR(64), contactNo bigint(16), password VARCHAR(128), address VARCHAR(256), lastLogInTime INT(64), profilPhoto VARCHAR(128), fcmtokenKey VARCHAR(64), creatorId INT(32), PRIMARY KEY (id), UNIQUE(email))',
		'asset_detail':'(id INT(32) NOT NULL AUTO_INCREMENT, type INT(32), subType INT(32), name VARCHAR(128), uniqueId VARCHAR(64) NOT NULL, createDate bigint(16) DEFAULT NULL, asset_rule_id INT(32), creatorId INT(32), attribute_value json DEFAULT NULL, asset_image VARCHAR(64), allowedTime bigint(16) DEFAULT NULL, PRIMARY KEY (id), UNIQUE(uniqueId))',
		'device_detail':'(id INT(32) NOT NULL AUTO_INCREMENT, deviceType INT(8), name VARCHAR(128), serial VARCHAR(64), isBuzz INT(8) DEFAULT NULL, assetId INT(32), nodeId INT(32), createDate bigint(16) DEFAULT NULL, gwSerial VARCHAR(64), batteryStatus int(8) DEFAULT 1, nodeStatus int(8), creatorId INT(32), genericId VARCHAR(64), pubAddress VARCHAR(64), subAddress VARCHAR(64), healthAddress VARCHAR(64), network_key VARCHAR(64), networkId VARCHAR(64), nodeType INT(8), zoneId INT(32), x_axis INT(32), y_axis INT(32), z_axis INT(32), nodeStatusTime bigint(16) DEFAULT NULL, batteryStatusTime bigint(16) DEFAULT NULL, zoneType int(8), status int(8) default 1, deviceKey VARCHAR(64), provisioningState int(8), resetReason int(8), currentVersion varchar(64), softwareId int(32), PRIMARY KEY (id), UNIQUE(serial))',
		'zone_detail':'(id INT(32) NOT NULL AUTO_INCREMENT, type INT(8), isCritical INT(8), led INT(32) DEFAULT NULL, name VARCHAR(64),maxUsers int(8) DEFAULT NULL, minUsers int(8) DEFAULT NULL, zone_image VARCHAR(64), floorId INT(32), plantId INT(32),zone_crood json DEFAULT NULL, zone_width INT(32) DEFAULT NULL, zone_height INT(32) DEFAULT NULL, zone_rule_id INT(32), uniqueId VARCHAR(64) DEFAULT NULL, allowed_time bigint(16) DEFAULT NULL, networkId VARCHAR(64) DEFAULT NULL,PRIMARY KEY (id))',
		'floor_plan':'(id INT(32) NOT NULL AUTO_INCREMENT, name VARCHAR(64), floorNo INT(128), floor_image VARCHAR(64), object VARCHAR(64), entity VARCHAR(64), creatorId INT(32), plantId INT(32), PRIMARY KEY (id))',
		'node_neighbour_detail':'(id INT(32) NOT NULL AUTO_INCREMENT, nodeId INT(32), neighbourNodeId INT(32), neighbourRssi INT(32), zoneId INT(32), gatewayId INT(32), zoneType int(8), nodeType int(8), PRIMARY KEY (id))',
		'map_user_floor':'(id INT(32) NOT NULL AUTO_INCREMENT, userId INT(32), floorId INT(32), PRIMARY KEY (id))',
		'map_testBeacon_receiver':'(id INT(32) NOT NULL AUTO_INCREMENT, testBeaconId INT(32), nodeId INT(32), gatewayId INT(32), PRIMARY KEY (id))',
		'asset_zone_mapping':'(id INT(32) NOT NULL AUTO_INCREMENT, assetId INT(32), zoneId INT(32), PRIMARY KEY (id))',
		'policy_list':'(id INT(32) NOT NULL AUTO_INCREMENT, rule_id INT(32), identifier varchar(128), type int(8),PRIMARY KEY (id))',
		'asset_attributes_key':'(id INT(32) NOT NULL AUTO_INCREMENT, attribute_key json DEFAULT NULL, PRIMARY KEY (id))',
		'asset_attribute_value':'(id INT(32) NOT NULL AUTO_INCREMENT, keyId INT(32), value json DEFAULT NULL, PRIMARY KEY (id))',
		'asset_type_list':'(id INT(32) NOT NULL AUTO_INCREMENT, assetTypeName VARCHAR(128), attributes_id INT(32), icon VARCHAR(128),uniqueId varchar(50) unique Default null, PRIMARY KEY (id))',
		'bus_detail':'(id INT(32) NOT NULL AUTO_INCREMENT, busNo VARCHAR(64), uniqueId VARCHAR(64), venderName VARCHAR(64), gatewayId INT(32), PRIMARY KEY (id), UNIQUE(uniqueId), UNIQUE(busNo), UNIQUE(gatewayId))',
		'food_cart_detail':'(id INT(32) NOT NULL AUTO_INCREMENT, foodCartNo VARCHAR(64), uniqueId VARCHAR(64), venderName VARCHAR(64), gatewayId INT(32), PRIMARY KEY (id), UNIQUE(uniqueId), UNIQUE(foodCartNo), UNIQUE(gatewayId))',
		'asset_subType_detail':'(id INT(32) NOT NULL AUTO_INCREMENT, name VARCHAR(64), assetTypeId VARCHAR(64), uniqueId varchar(50) unique Default null, PRIMARY KEY (id))',
		'map_controlroomgw_zone': '(id INT(32) NOT NULL AUTO_INCREMENT, controllroomId int(32) DEFAULT NULL, zoneId int(32) DEFAULT NULL, PRIMARY KEY (id))',
		'kpi_detail': '(id INT(32) NOT NULL AUTO_INCREMENT, kpiId VARCHAR(64), kpiName VARCHAR(64), type int(8), query JSON DEFAULT NULL, PRIMARY KEY (id), UNIQUE(kpiId))',
		'prov_scan': '(id INT(32) NOT NULL AUTO_INCREMENT, type int(8), deviceSerial VARCHAR(64), isScanning INT(8), PRIMARY KEY (id))',
		'plant_detail': '(id INT(32) NOT NULL AUTO_INCREMENT, name VARCHAR(128), plantType int(8), address VARCHAR(128), latitude double(11,8), longitude double(11,8),  PRIMARY KEY (id), UNIQUE(name))'
	}
};
