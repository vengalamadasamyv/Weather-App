import logo from './logo.svg';
import './App.css';
import WeatherCard from "./weathercard";
import vg from "./video/bg.mp4";

function App() {
  return(
    <div className="App">
      <video src={vg} muted loop autoPlay></video>
      <WeatherCard/>
    </div>
  );
}

export default App;
