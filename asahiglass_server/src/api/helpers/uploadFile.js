var multer = require('multer');
var fs = require('fs');


exports.uploadFile = function(req, res, type, folderName) {
	var uploadedFile;
	return new Promise(function(resolve, reject) {
		var upload = multer({storage: multer.diskStorage({
			destination: function (req, file, cb) {
				// checking and creating uploads folder where files will be uploaded
				if(type == "image") {
					var dirPath = `./uploads/${req.headers.companyid}/${folderName}/`;
				}
				else if(type == "csv") {
					var dirPath = "./uploads/csv/";
				}
				else if(type == "software"){
					var dirPath = `./software/${folderName}/`;
				}
				if (!fs.existsSync(dirPath)) {
					var dir = fs.mkdirSync(dirPath);
				}
				cb(null, dirPath);
			},
			filename: function (req, file, cb) {
				// file will be accessible in `file` variable
				var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
				if(ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".csv" && ext !== ".bin") {
					return res.json({success:false, message:"Only images or csv are allowed"});
				}
				var fileName;
				
				if(type == "software"){
					fileName = req.query.name
				}else{
					fileName = req.query.name + ext;
				}
					
				if(type == "image") {

					uploadedFile = fileName;
				}
				else if(type == "csv") {
					uploadedFile = `${process.env.PWD}/uploads/csv/${fileName}`;
				}
				else if(type == "software"){
					uploadedFile = fileName;
				}
				cb(null, fileName);
			}
		})
	}).single("file");

		upload(req, res, function (err) {
			console.log("Res data: ", req.file);
			var file = req.file;
			var fileSize = file.size;
			if (err) {
				reject(err);
			}
			else {
				if(!req.file) {
					return res.json({success: false, message: "No file selected"});
				}
				else {
					if(type == "software"){
						var resData = {
							"name":uploadedFile,
							"size":fileSize
						}
						resolve(resData);
					}
					resolve(uploadedFile);
				}
			}
		});
	});
};