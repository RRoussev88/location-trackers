const messages = require("./location_trackers_pb");
const services = require("./location_trackers_grpc_pb");

const async = require("async");
const grpc = require("@grpc/grpc-js");

const client = new services.LocationTrackersClient(
  "0.0.0.0:9090",
  grpc.credentials.createInsecure()
);

/**
 * Run the listReports demo. Calls listReports on the server.
 * Prints each response as it comes in.
 * @param {function} callback Called when this demo is complete
 */
function runListReports(callback) {
  console.log("Looking for features");
  const request = new messages.ReportsRequest();
  const call = client.listReports(request);
  call.on("data", function (feature) {
    console.log(
      `Found feature called ${feature.getName()} at ${
        feature.getLocation().getLatitude()
      }, ${feature.getLocation().getLongitude()}`
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
