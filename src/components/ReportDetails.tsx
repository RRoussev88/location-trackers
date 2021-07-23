import { FC } from "react";
import { Report } from "types";

interface ReportDetailsProps {
  report: Report;
}

const ReportDetails: FC<ReportDetailsProps> = ({ report }) => (
  <div className="report-details__content">
    <div className="report-details__image">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="100"
        viewBox="0 0 20 20"
        fill="currentColor"
        style={{ display: "block", transform: "scale(-1,1)" }}
      >
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
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
        <p>Speed:</p>
        <p>Longitude:</p>
        <p>Latitude:</p>
        <p>Altitude:</p>
      </div>
      <div className="report-details__data__column report-details__column__values">
        <p>{report.speed} Km/h</p>
        <p>{report.location.lng}</p>
        <p>{report.location.lat}</p>
        <p>{report.altitude} m</p>
      </div>
    </div>
  </div>
);

export default ReportDetails;
