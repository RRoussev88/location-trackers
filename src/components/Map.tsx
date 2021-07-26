import Pins from "components/Pins";
import ReportDetails from "components/ReportDetails";
import { FC, useEffect, useState } from "react";
import ReactMapGL, { NavigationControl, Popup } from "react-map-gl";
import { Tracker, LatLng } from "types";
import { LocationTrackersClient } from "location_trackers_grpc_web_pb";

const protoTypes = require("../location_trackers_pb");

/**
 * Client for interacting with the gRPC server.
 */
const client = new LocationTrackersClient("http://localhost:8080", null, null);

const Map: FC = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [selectedTracker, setSelectedTracker] = useState<Tracker | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 49.611667,
    longitude: 6.131944,
    zoom: 8,
    height: 400,
    width: 400,
  });

  /**
   * On first render call server for reports stream.
   */
  useEffect(() => {
    const trackersData: Tracker[] = [];

    const request = new protoTypes.ReportsRequest();
    const reportsStream = client.listReports(request, {});

    reportsStream.on("data", (response: typeof protoTypes.Report) => {
      const location: LatLng = {
        latitude: response.getLocation().getLatitude(),
        longitude: response.getLocation().getLongitude(),
      };
      const tracker: Tracker = {
        id: response.getId(),
        name: response.getName(),
        altitude: response.getAltitude(),
        speed: response.getSpeed(),
        location,
      };
      
      // Put all incoming tracker objects for "memoization"
      trackersData.push(tracker);
    });

    reportsStream.on(
      "status",
      (status: { code: number; details: string; metadata: Object }) => {
        if (status.code === 0) {
          // Once stream status is success - display received data at once.
          setTrackers(trackersData);
        }
      }
    );

    reportsStream.on("error", (error: any) => {
      console.error("Stream error: ", error);
    });

    reportsStream.on("end", () => {
      console.log("Stream ended.");
    });

    return () => {
      reportsStream.cancel();
    };
  }, []);

  const handlePinClose = () => {
    setSelectedTracker(null);
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="calc(100vh - 44px)"
      mapStyle="mapbox://styles/mapbox/streets-v11?optimize=true"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN || ""}
      onViewportChange={setViewport}
    >
      <Pins trackers={trackers} onClick={setSelectedTracker} />
      {selectedTracker && (
        <Popup
          offsetTop={-34}
          offsetLeft={-3}
          anchor="bottom"
          longitude={selectedTracker.location.longitude}
          latitude={selectedTracker.location.latitude}
          closeOnClick={false}
          onClose={handlePinClose}
        >
          <ReportDetails report={selectedTracker} />
        </Popup>
      )}
      <NavigationControl onViewportChange={setViewport} />
    </ReactMapGL>
  );
};

export default Map;
