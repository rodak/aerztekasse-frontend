import {Injectable} from "@angular/core";
import {Place, PlaceWithOpeningHours} from "../model/place.model";

@Injectable({
  providedIn: "root"
})
export class PlaceService {

  private static readonly URL = '/api/place';

  public async getPlace(id: number) {
    const response = await fetch(`${PlaceService.URL}/${id}`)
    if (!response.ok) {
      throw {
        status: response.status,
        message: "Server connection problem occured"
      }
    }
    return <PlaceWithOpeningHours> await response.json();
  }

  public async search(label?: string, location?: string) {
    const params = [];
    if (location) {
      params.push(`location=${location}`);
    }
    if (label) {
      params.push(`place=${label}`);
    }
    if (params.length === 0) {
      return Promise.reject({
        message: "must provide at least a label or location to search for a place"
      });
    }
    const paramString = params.join("&");
    const response = await fetch(`${PlaceService.URL}/search?${paramString}`);
    if (!response.ok) {
      throw {
        status: response.status,
        message: "Server connection problem occured"
      }
    }
    const json = await response.json();
    return <Place[]>json;
  }

}
