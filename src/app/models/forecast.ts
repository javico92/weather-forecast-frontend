import {Unit} from "./unit";
import {Probability} from "./probability";

export interface Forecast {
  date: Date;
  temperatureAverage: number;
  temperatureUnit: Unit;
  rainProbabilitiy: Probability[];
}
