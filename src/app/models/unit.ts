export enum Unit {
  G_CEL = "G_CEL",
  G_FAH = "G_FAH"
}

export const UnitType2LabelMapping: Record<Unit, string> = {
  [Unit.G_CEL]: "ºC",
  [Unit.G_FAH]: "ºF"
};
