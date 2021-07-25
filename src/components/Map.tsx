import Pins from "components/Pins";
import ReportDetails from "components/ReportDetails";
import { FC, useEffect, useState } from "react";
import ReactMapGL, { NavigationControl, Popup } from "react-map-gl";
import { Report } from "types";

const Map: FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      location: { lat: 49.611667, lng: 6.131944 },
      altitude: 300,
      name: "Test 1",
      speed: 50,
    },
  ]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 49.611667,
    longitude: 6.131944,
    zoom: 12,
    height: 400,
    width: 400,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setReports((prevReports) =>
        prevReports.map((report) => ({
          ...report,
          location: {
            lat: report.location.lat - report.speed / (3600 * 110.574),
            lng:
              report.location.lng +
              report.speed / (3600 * 111.32 * Math.cos(report.location.lat)),
          },
        }))
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="calc(100vh - 44px)"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN || ""}
      onViewportChange={(vPort: typeof viewport) => setViewport(vPort)}
    >
      <Pins reports={reports} onClick={setSelectedReport} />
      {selectedReport && (
        <Popup
          offsetTop={-34}
          offsetLeft={-3}
          anchor="bottom"
          longitude={selectedReport.location.lng}
          latitude={selectedReport.location.lat}
          closeOnClick={false}
          onClose={setSelectedReport}
        >
          <ReportDetails report={selectedReport} />
        </Popup>
      )}
      <NavigationControl onViewportChange={setViewport} />
    </ReactMapGL>
  );
};

export default Map;
