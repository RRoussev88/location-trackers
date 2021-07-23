import "App.css";
import Map from "components/Map";
import { FC } from "react";


const App: FC = () => (
  <div className="App">
    <header className="App-header">Location Trackers</header>
    <Map />
  </div>
);

export default App;
