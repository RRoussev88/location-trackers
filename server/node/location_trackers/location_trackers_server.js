// var PROTO_PATH = __dirname + "/../../protos/location_trackers.proto";
// const GOOGLE_PROTOS_PATH = __dirname + "/protos.json";

var fs = require("fs");
var parseArgs = require("minimist");
var path = require("path");
var _ = require("lodash");
var grpc = require("@grpc/grpc-js");
// var protoLoader = require("@grpc/proto-loader");

// var packageDefinition = protoLoader.loadSync([GOOGLE_PROTOS_PATH, PROTO_PATH], {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });
// var locationtrackers = grpc.loadPackageDefinition(packageDefinition).locationtrackers;

var messages = require("./location_trackers_pb");
var services = require("./location_trackers_grpc_pb");

/**
 * List of feature objects that have been requested so far.
 */
var feature_list = [];

/**
 * listReports request handler. Responds with a stream of all features
 * @param {Writable} call Writable stream for responses with an additional
 *     request property for the request value.
 */
function listReports(call) {
  _.each(feature_list, function (feature) {
    const location = new messages.LatLng();
    location.setLatitude(feature.location.latitude);
    location.setLongitude(feature.location.longitude);

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
  var server = new grpc.Server();
  server.addService(services.LocationTrackersService, { listReports });
  return server;
}

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  var routeServer = getServer();
  routeServer.bindAsync(
    "localhost:9000",
    grpc.ServerCredentials.createInsecure(),
    () => {
      var argv = parseArgs(process.argv, { string: "db_path" });
      fs.readFile(path.resolve(argv.db_path), function (err, data) {
        if (err) throw err;
        feature_list = JSON.parse(data);
        routeServer.start();
      });
    }
  );
}

exports.getServer = getServer;
