const express = require('express');
const employeeRoutes = require('./emp.route');
const deviceRoutes = require('./device.route');
const authRoutes = require('./auth.route');
const zoneROutes = require('./zone.route');
const notificationRoutes = require('./notifiction.route');
const reportingRoutes =require('./reporting.route');
const areaRoutes = require('./area.route');
const testbeaconRoutes = require('./testBeacon.route');
const companyRoutes = require('./company.route');
const privilegeUserRoutes = require('./privilegeUser.route');
const busRoutes = require('./bus.route');
const foodCartRoutes = require('./foodCart.route');
const assetTypeRoutes = require('./assetType.route');
const provisionRoutes = require('./provision.route');
const ruleRoutes = require('./rule.route');
const kpiRoutes = require('./kpi.route');
const controlroomRoute = require('./controlroom.route');
const networkRoutes = require('./network.route');
const plantRoutes = require('./plant.route');
const plantTypeRoutes = require('./plantType.route');
const otaRoutes = require('./ota.route');
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/employee', employeeRoutes);
router.use('/auth', authRoutes);
router.use('/device', deviceRoutes);
router.use('/zone', zoneROutes);
router.use('/notification', notificationRoutes);
router.use('/reporting', reportingRoutes);
router.use('/floor', areaRoutes);
router.use('/testbeacon', testbeaconRoutes);
router.use('/company', companyRoutes);
router.use('/privilegeUser', privilegeUserRoutes);
router.use('/bus', busRoutes);
router.use('/foodCart', foodCartRoutes);
router.use('/assetType', assetTypeRoutes);
router.use('/provision', provisionRoutes);
router.use('/rules', ruleRoutes);
router.use('/kpis', kpiRoutes);
router.use('/controlroom', controlroomRoute);
router.use('/networks', networkRoutes);
router.use('/plants', plantRoutes);
router.use('/planttypes', plantTypeRoutes);
router.use('/ota', otaRoutes);
module.exports = router;
