// var PROTO_PATH = __dirname + "/../../protos/location_trackers.proto";
// const GOOGLE_PROTOS_PATH = __dirname + "/protos.json";

var messages = require("./location_trackers_pb");
var services = require("./location_trackers_grpc_pb");

var async = require("async");
var grpc = require("@grpc/grpc-js");
// var protoLoader = require("@grpc/proto-loader");
// var packageDefinition = protoLoader.loadSync([GOOGLE_PROTOS_PATH, PROTO_PATH], {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });
// var locationtrackers =
//   grpc.loadPackageDefinition(packageDefinition).locationtrackers;

const client = new services.LocationTrackersClient(
  "localhost:9000",
  grpc.credentials.createInsecure()
);

var COORD_FACTOR = 1e7;

/**
 * Run the listReports demo. Calls listReports on the server.
 * Prints each response as it comes in.
 * @param {function} callback Called when this demo is complete
 */
function runListReports(callback) {
  console.log("Looking for features");
  const request = new messages.ReportsRequest();
  var call = client.listReports(request);
  call.on("data", function (feature) {
    console.log(
      `Found feature called ${feature.getName()} at ${
        feature.getLocation().getLatitude() / COORD_FACTOR
      }, ${feature.getLocation().getLongitude() / COORD_FACTOR}`
    );
  });
  call.on("end", callback);
}

function main() {
  async.series([runListReports]);
}

if (require.main === module) {
  main();
}

exports.runListFeatures = runListReports;
