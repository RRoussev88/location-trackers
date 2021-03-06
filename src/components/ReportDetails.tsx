import { FC } from "react";
import { Tracker } from "types";
import truckImg from "assets/tow-truck.png";

interface ReportDetailsProps {
  report: Tracker;
}

const ReportDetails: FC<ReportDetailsProps> = ({ report }) => (
  <div className="report-details__content">
    <div className="report-details__image">
      <img width={100} height={70} src={truckImg} alt="tow truck" />
    </div>
    <h4 className="report-details__name">{report.name}</h4>
    <p
      className={`report-details__badge ${
        report.speed
          ? "report-details__badge__moving"
          : "report-details__badge__parked"
      }`}
    >
      {report.speed ? "Moving" : "Parked"}
    </p>
    <div className="report-details__data">
      <div className="report-details__data__column report-details__column__labels">
        <p>Current Speed:</p>
        <p>Longitude:</p>
        <p>Latitude:</p>
        <p>Altitude:</p>
      </div>
      <div className="report-details__data__column report-details__column__values">
        <p>{report.speed} Km/h</p>
        <p>
          {report.location.longitude.toFixed(6)}{" "}
          {report.location.longitude >= 0 ? "N" : "S"}
        </p>
        <p>
          {report.location.latitude.toFixed(6)}{" "}
          {report.location.latitude >= 0 ? "E" : "W"}
        </p>
        <p>{report.altitude} m</p>
      </div>
    </div>
  </div>
);

export default ReportDetails;
