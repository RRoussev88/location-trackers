/**
 * @fileoverview gRPC-Web generated client stub for locationtrackers
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.locationtrackers = require('./location_trackers_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.locationtrackers.LocationTrackersClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.locationtrackers.LocationTrackersPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.locationtrackers.ReportsRequest,
 *   !proto.locationtrackers.Report>}
 */
const methodDescriptor_LocationTrackers_ListReports = new grpc.web.MethodDescriptor(
  '/locationtrackers.LocationTrackers/ListReports',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.locationtrackers.ReportsRequest,
  proto.locationtrackers.Report,
  /**
   * @param {!proto.locationtrackers.ReportsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.locationtrackers.Report.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.locationtrackers.ReportsRequest,
 *   !proto.locationtrackers.Report>}
 */
const methodInfo_LocationTrackers_ListReports = new grpc.web.AbstractClientBase.MethodInfo(
  proto.locationtrackers.Report,
  /**
   * @param {!proto.locationtrackers.ReportsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.locationtrackers.Report.deserializeBinary
);


/**
 * @param {!proto.locationtrackers.ReportsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.locationtrackers.Report>}
 *     The XHR Node Readable Stream
 */
proto.locationtrackers.LocationTrackersClient.prototype.listReports =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/locationtrackers.LocationTrackers/ListReports',
      request,
      metadata || {},
      methodDescriptor_LocationTrackers_ListReports);
};


/**
 * @param {!proto.locationtrackers.ReportsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.locationtrackers.Report>}
 *     The XHR Node Readable Stream
 */
proto.locationtrackers.LocationTrackersPromiseClient.prototype.listReports =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/locationtrackers.LocationTrackers/ListReports',
      request,
      metadata || {},
      methodDescriptor_LocationTrackers_ListReports);
};


module.exports = proto.locationtrackers;

