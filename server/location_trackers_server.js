const fs = require("fs");
const parseArgs = require("minimist");
const path = require("path");
const _ = require("lodash");
const grpc = require("@grpc/grpc-js");

const messages = require("./location_trackers_pb");
const services = require("./location_trackers_grpc_pb");

const COORD_FACTOR = 1e7;

/**
 * List of feature objects that have been requested so far.
 */
let feature_list = [];

/**
 * listReports request handler. Responds with a stream of all features
 * @param {Writable} call Writable stream for responses with an additional
 *     request property for the request value.
 */
function listReports(call) {
  _.each(feature_list, function (feature) {
    const location = new messages.LatLng();
    location.setLatitude(feature.location.latitude / COORD_FACTOR);
    location.setLongitude(feature.location.longitude / COORD_FACTOR);

    const report = new messages.Report();
    report.setId(feature.id);
    report.setName(feature.name);
    report.setLocation(location);
    report.setSpeed(feature.speed);
    report.setAltitude(feature.altitude);

    call.write(report);
  });
  call.end();
}

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(services.LocationTrackersService, { listReports });
  return server;
}

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  const routeServer = getServer();
  routeServer.bindAsync(
    "0.0.0.0:9090",
    grpc.ServerCredentials.createInsecure(),
    () => {
      const argv = parseArgs(process.argv, { string: "db_path" });
      fs.readFile(path.resolve(argv.db_path), function (err, data) {
        if (err) throw err;
        feature_list = JSON.parse(data);
        routeServer.start();
      });
    }
  );
}

exports.getServer = getServer;
