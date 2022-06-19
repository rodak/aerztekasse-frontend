import {Component} from "@angular/core";
import {PlaceService} from "../../service/place.service";
import {ActivatedRoute} from "@angular/router";
import {OpeningHour, PlaceWithOpeningHours} from "../../model/place.model";

interface OpeningHourForDisplay {

  isClosed: Boolean
  startDay: string;
  endDay?: string;
  times: string[];

}

class OpeningHourDay {

  public times: string[] = [];

  constructor(public day: string) {
  }

  addTime(time: string) {
    this.times.push(time);
  }

  sortTimes() {
    this.times.sort();
  }

  isEqualTime(other: OpeningHourDay) {
    if (this.times.length !== other.times.length) {
      return false;
    }
    for (let i=0; i < this.times.length; i++) {
      const timeThis = this.times[i];
      const timeOther = other.times[i];
      if (timeThis !== timeOther) {
        return false;
      }
    }
    return true;
  }

}

@Component({
  selector: "place-page",
  templateUrl: "./place-page.component.html"
})
export class PlacePageComponent {

  private sub: any;
  place?: PlaceWithOpeningHours = undefined;
  private daySortOrder = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7
  }
  openingHoursForDisplay: OpeningHourForDisplay[] = [];

  constructor(private placeService: PlaceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.placeService.getPlace(params['id']).then(place => {
        this.processOpeningHours(place.openingHours);
        this.place = place;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private processOpeningHours(hours: OpeningHour[]) {
    hours = hours.slice().sort((a, b) => {
      return this.daySortOrder[a.day]- this.daySortOrder[b.day];
    });
    const dayToOpeningHours: any = {};
    for (const hour of hours) {
      let hours = dayToOpeningHours[hour.day];
      if (!hours) {
        hours = [];
        dayToOpeningHours[hour.day] = hours;
      }
      hours.push(hour);
    }
    const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    const openingDays: OpeningHourDay[] = [];
    for (const day of days) {
      const hours: OpeningHour[] | undefined = dayToOpeningHours[day];
      let openingDay: OpeningHourDay = new OpeningHourDay(day);
      if (hours) {
        for (const hour of hours) {
          openingDay.addTime(hour.timeStart + " - " + hour.timeEnd);
        }
      }
      openingDays.push(openingDay);
    }
    this.openingHoursForDisplay = [];
    let lastDisplay: OpeningHourForDisplay | null = null;
    let lastOpeningDay: OpeningHourDay | null = null;
    for (const openingDay of openingDays) {
      if (!lastOpeningDay) {
        lastOpeningDay = openingDay;
        lastDisplay = {
          isClosed: openingDay.times.length === 0,
          startDay: openingDay.day,
          times: openingDay.times
        }
        this.openingHoursForDisplay.push(lastDisplay);
        continue;
      }
      if (lastOpeningDay.isEqualTime(openingDay)) {
        // @ts-ignore
        lastDisplay.endDay = openingDay.day;
      } else {
        lastDisplay = {
          isClosed: openingDay.times.length === 0,
          startDay: openingDay.day,
          times: openingDay.times
        }
        this.openingHoursForDisplay.push(lastDisplay);
      }
      lastOpeningDay = openingDay;
    }
  }

}
