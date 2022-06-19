import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SearchPageComponent} from "./page/search/search-page.component";
import {PlacePageComponent} from "./page/place/place-page.component";

const routes: Routes = [
  {path: '', component: SearchPageComponent},
  {path: ":id", component: PlacePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
