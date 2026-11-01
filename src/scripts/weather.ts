// TALKING TO THE WEATHER SERVICE (Open-Meteo: no key, free for non-commercial sites like this
// portfolio – a real shop would need its paid plan). FieldConditions.tsx uses these
// two functions: Regensburg when the section comes near the screen, the visitor's own
// position only after a click on "Use my location".

export type Coordinates = { latitude: number; longitude: number };

export const regensburg: Coordinates = { latitude: 49.02, longitude: 12.1 };

export type Weather = {
  temperature: number;
  feelsLike: number;
  wind: number; // km/h
  code: number; // the WMO weather code, see src/data/weather.ts
  isDay: boolean;
};

// fetch = ask a web address for something and wait for the answer. It comes as JSON,
// a text format that turns into a normal object with response.json().
// AbortSignal.timeout = give up after 8 seconds, so "loading" can never last forever.
export async function fetchWeather({ latitude, longitude }: Coordinates): Promise<Weather> {
  const query = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day",
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${query}`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Weather service answered ${response.status}`);

  const { current } = await response.json();
  return {
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    wind: current.wind_speed_10m,
    code: current.weather_code,
    isDay: current.is_day === 1,
  };
}

// Rounded to one decimal = about 11 km. Enough for the weather, and the exact position
// never leaves the browser (privacy by design).
function roughly(degrees: number) {
  return Math.round(degrees * 10) / 10;
}

// Asks the browser for the position; only now it shows its permission question.
// The browser answers later, so this is wrapped in a Promise = "an answer that will come":
// resolve = here it is, reject = no (declined, not available, took too long).
export function getLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("No location in this browser"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ latitude: roughly(coords.latitude), longitude: roughly(coords.longitude) }),
      reject,
      { timeout: 10000, maximumAge: 600000 }, // a position up to 10 minutes old is fine
    );
  });
}
