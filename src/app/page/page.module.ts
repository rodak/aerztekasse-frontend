import {NgModule} from "@angular/core";
import {SearchPageComponent} from "./search/search-page.component";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {PlacePageComponent} from "./place/place-page.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    SearchPageComponent,
    PlacePageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PageModule {

}
