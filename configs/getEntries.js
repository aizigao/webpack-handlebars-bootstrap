const fs = require("fs");
const path = require("path");

// TODO: path modify
const controllerPath = path.join(__dirname, "../", "src/contronllers");

module.exports = () => {
	const controlllers = fs.readdirSync(controllerPath) || [];
	const entries = {};
	controlllers.forEach(ctrlPath => {
		const filenameWithoutExt = ctrlPath.replace(/\.(js|ts)$/, "");
		if (filenameWithoutExt) {
			entries[filenameWithoutExt] = path.join(controllerPath, ctrlPath);
		}
	});
	return entries;
};
