import { FC, memo } from "react";
import { Marker } from "react-map-gl";
import { Tracker } from "types";

interface PinsProps {
  trackers: Tracker[];
  onClick: (report: Tracker) => void;
}

const PIN_SIZE = 36;

const Pins: FC<PinsProps> = ({ trackers, onClick }) => (
  <>
    {trackers.map((report) => (
      <Marker
        key={report.id}
        longitude={report.location.longitude}
        latitude={report.location.latitude}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={PIN_SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: "pointer",
            fill: "#d00",
            stroke: "none",
            transform: `translate(${-PIN_SIZE / 2}px,${-PIN_SIZE}px)`,
          }}
          onClick={() => onClick(report)}
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      </Marker>
    ))}
  </>
);

export default memo(Pins);
