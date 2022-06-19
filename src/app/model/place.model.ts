export interface Place {
  id: number;
  label: string;
  location: string;
}

export interface OpeningHour {

  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  timeStart: string;
  timeEnd: string;

}

export interface PlaceWithOpeningHours extends Place {

  openingHours: OpeningHour[];

}
