// FIELD CONDITIONS – the part of the Home section that changes: the second React part of
// the site. One piece of state ("view") decides what shows: loading → done or error.
// Regensburg shows by default, so the section is never empty (decided 1 Nov); the visitor's
// own location only after a click.
// The map and the moving lines behind it are plain Astro and JavaScript (HomeConditions.astro).
import { useEffect, useRef, useState } from "react";
import { fetchWeather, getLocation, regensburg, type Coordinates, type Weather } from "../scripts/weather";
import { startSliding } from "../scripts/pick-slide";
import { describeWeather, pickFor, type WeatherIcon } from "../data/weather";
// ?raw = the SVG file as text, so the icons can take the text colour
import sunIcon from "../assets/icons/weather-sun.svg?raw";
import moonIcon from "../assets/icons/weather-moon.svg?raw";
import cloudIcon from "../assets/icons/weather-cloud.svg?raw";
import cloudSunIcon from "../assets/icons/weather-cloud-sun.svg?raw";
import cloudMoonIcon from "../assets/icons/weather-cloud-moon.svg?raw";
import fogIcon from "../assets/icons/weather-fog.svg?raw";
import rainIcon from "../assets/icons/weather-rain.svg?raw";
import snowIcon from "../assets/icons/weather-snow.svg?raw";
import stormIcon from "../assets/icons/weather-storm.svg?raw";

const icons: Record<WeatherIcon, string> = {
  sun: sunIcon,
  moon: moonIcon,
  cloud: cloudIcon,
  "cloud-sun": cloudSunIcon,
  "cloud-moon": cloudMoonIcon,
  fog: fogIcon,
  rain: rainIcon,
  snow: snowIcon,
  storm: stormIcon,
};

type Piece = { name: string; tagline: string; href: string };

type Place = "Regensburg" | "Your location";

// The "|" means: exactly one of these shapes. TypeScript then knows that only "done"
// has weather in it, so the code can't show weather that isn't there.
type View =
  | { status: "loading"; place: Place }
  | { status: "done"; place: Place; weather: Weather; declined: boolean }
  | { status: "error"; place: Place };

// One line under the readout. It keeps its place in every state, so nothing jumps.
function statusLine(view: View) {
  if (view.status === "loading") return "Getting today's conditions…";
  if (view.status === "error") return "The weather service didn't answer. Try again in a moment.";
  if (view.declined) return "Location not shared, so here is Regensburg.";
  return view.place === "Regensburg" ? "Show today's conditions for your location?" : "Today's conditions where you are.";
}

export default function FieldConditions({ pieces }: { pieces: Record<string, Piece> }) {
  const [view, setView] = useState<View>({ status: "loading", place: "Regensburg" });

  // useEffect with an empty list = run this once, right after the part appears on the page
  useEffect(() => {
    show(regensburg, "Regensburg");
  }, []);

  // useRef = a direct line to one element on the page: the list of pieces.
  // With [view]: this runs again whenever the weather changes, with the new pieces.
  const piecesList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (piecesList.current) return startSliding(piecesList.current);
  }, [view]);

  async function show(coordinates: Coordinates, place: Place, declined = false) {
    setView({ status: "loading", place });
    try {
      const weather = await fetchWeather(coordinates);
      setView({ status: "done", place, weather, declined });
    } catch {
      setView({ status: "error", place });
    }
  }

  async function showMyLocation() {
    setView({ status: "loading", place: "Your location" });
    try {
      const coordinates = await getLocation();
      show(coordinates, "Your location");
    } catch {
      show(regensburg, "Regensburg", true); // declined or not available
    }
  }

  // The button for what already shows is gray; the other one is the Wild Honey one
  const loading = view.status === "loading";
  const showingRegensburg = view.status === "done" && view.place === "Regensburg";
  const showingMine = view.status === "done" && view.place === "Your location";

  const weather = view.status === "done" ? view.weather : null;
  const described = weather && describeWeather(weather.code, weather.isDay);
  const pickedPieces = weather && described ? pickFor(weather.temperature, described.wet).map((id) => pieces[id]) : [];

  return (
    <div className="field">
      <div className="field-readout">
        <p className="field-place">{`${view.place} · Now`}</p>
        <p className="field-now">
          <span className="field-temperature">{weather ? `${Math.round(weather.temperature)}°` : "–"}</span>
          {described && <span className="field-icon" dangerouslySetInnerHTML={{ __html: icons[described.icon] }} />}
        </p>
        <p className="field-words">{described ? described.words : "–"}</p>
        <dl className="field-rows">
          <div className="field-row">
            <dt>Wind</dt>
            <dd>{weather ? `${Math.round(weather.wind)} km/h` : "–"}</dd>
          </div>
          <div className="field-row">
            <dt>Feels like</dt>
            <dd>{weather ? `${Math.round(weather.feelsLike)}°` : "–"}</dd>
          </div>
        </dl>
      </div>

      <div className="field-pick">
        <p className="label field-pick-label">Today's pick</p>
        {pickedPieces.length > 0 ? (
          <ul className="field-pick-list" role="list" ref={piecesList}>
            {pickedPieces.map((piece) => (
              <li key={piece.href} className="field-piece">
                <h3 className="field-pick-name">{piece.name}</h3>
                <p className="small field-pick-text">{piece.tagline}</p>
                <a href={piece.href} className="text-link field-pick-link">
                  See the piece<span className="visually-hidden">: {piece.name}</span> <span aria-hidden="true">›</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="small field-pick-text">Depends on your weather.</p>
        )}
      </div>

      <div className="field-ask">
        {/* role="status": screen readers read this line out when it changes */}
        <p role="status" className={view.status === "error" ? "field-status field-status-problem" : "field-status"}>
          {statusLine(view)}
        </p>
        <div className="field-buttons">
          <button type="button" className="button button-primary" disabled={loading || showingMine} onClick={showMyLocation}>
            Use my location
          </button>
          <button
            type="button"
            className={showingMine ? "button button-primary" : "button button-outline"}
            disabled={loading || showingRegensburg}
            onClick={() => show(regensburg, "Regensburg")}
          >
            Show Regensburg
          </button>
        </div>
        {/* The service's licence (CC BY 4.0) asks for this link next to its data */}
        <p className="small field-note">
          Sent only to the weather service. We don't store it. <a href="/privacy#weather">Privacy Policy</a> · <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </p>
      </div>
    </div>
  );
}
