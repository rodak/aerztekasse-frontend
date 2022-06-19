import {Component} from "@angular/core";
import {PlaceService} from "../../service/place.service";
import {FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: "search-page",
  templateUrl: "./search-page.component.html"
})
export class SearchPageComponent {

  searchControl = new FormControl('');
  searchGroup = new FormGroup({
    search: this.searchControl
  });

  constructor(private placeService: PlaceService) {

  }

  ngOnInit() {

  }

  submitSearch() {
    this.placeService.search(<string>this.searchControl.value, <string>this.searchControl.value).then(places => {

    }, err => {

    });
  }

}
