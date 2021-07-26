// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var location_trackers_pb = require('./location_trackers_pb.js');

function serialize_locationtrackers_Report(arg) {
  if (!(arg instanceof location_trackers_pb.Report)) {
    throw new Error('Expected argument of type locationtrackers.Report');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_locationtrackers_Report(buffer_arg) {
  return location_trackers_pb.Report.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_locationtrackers_ReportsRequest(arg) {
  if (!(arg instanceof location_trackers_pb.ReportsRequest)) {
    throw new Error('Expected argument of type locationtrackers.ReportsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_locationtrackers_ReportsRequest(buffer_arg) {
  return location_trackers_pb.ReportsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var LocationTrackersService = exports.LocationTrackersService = {
  // A server-to-client streaming RPC.
//
// Obtains all the Reports available. Results are
// streamed rather than returned at once (e.g. in a response message with a
// repeated field), because there may be a huge number of features.
listReports: {
    path: '/locationtrackers.LocationTrackers/ListReports',
    requestStream: false,
    responseStream: true,
    requestType: location_trackers_pb.ReportsRequest,
    responseType: location_trackers_pb.Report,
    requestSerialize: serialize_locationtrackers_ReportsRequest,
    requestDeserialize: deserialize_locationtrackers_ReportsRequest,
    responseSerialize: serialize_locationtrackers_Report,
    responseDeserialize: deserialize_locationtrackers_Report,
  },
};

exports.LocationTrackersClient = grpc.makeGenericClientConstructor(LocationTrackersService);
