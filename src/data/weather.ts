// WEATHER – turns what the weather service answers into words, an icon and today's pick.
// Only the ids of the products are here: names, taglines and links come from the product
// folders (HomeConditions.astro passes them in), so nothing is typed twice.

export type WeatherIcon = "sun" | "moon" | "cloud-sun" | "cloud-moon" | "cloud" | "fog" | "rain" | "snow" | "storm";

// The service answers with a number, the WMO weather code (0 = clear sky, 61 = rain …).
// wet = rain, snow or a storm: then the shell is the pick, whatever the temperature.
export function describeWeather(code: number, isDay: boolean): { words: string; icon: WeatherIcon; wet: boolean } {
  if (code === 0) return { words: "Clear", icon: isDay ? "sun" : "moon", wet: false };
  if (code === 1) return { words: "Mostly clear", icon: isDay ? "cloud-sun" : "cloud-moon", wet: false };
  if (code === 2) return { words: "Partly cloudy", icon: isDay ? "cloud-sun" : "cloud-moon", wet: false };
  if (code === 3) return { words: "Overcast", icon: "cloud", wet: false };
  if (code === 45 || code === 48) return { words: "Fog", icon: "fog", wet: false };
  if (code >= 51 && code <= 57) return { words: "Drizzle", icon: "rain", wet: true };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { words: "Rain", icon: "rain", wet: true };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { words: "Snow", icon: "snow", wet: true };
  if (code >= 95) return { words: "Thunderstorm", icon: "storm", wet: true };
  return { words: "Changing", icon: "cloud", wet: false }; // a code the list doesn't know
}

// Which pieces fit the weather (decided 1 Nov). Each one gets its own row in Today's pick,
// the main piece first. Only two questions decide: is it wet, and how cold is it? Sun or
// clouds change the words and the icon, not the clothes.
export function pickFor(temperature: number, wet: boolean) {
  if (temperature < 5) {
    return wet ? ["all-weather-shell", "field-hoodie", "ridge-beanie"] : ["field-hoodie", "ridge-beanie", "pass-gaiter"];
  }
  if (temperature <= 15) {
    return wet ? ["all-weather-shell", "traverse-half-zip", "pass-gaiter"] : ["traverse-half-zip", "core-tee", "pass-gaiter"];
  }
  return wet ? ["all-weather-shell", "core-tee"] : ["core-tee", "traverse-half-zip"];
}
