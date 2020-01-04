import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ElementRef } from '@angular/core';
import { SearchService } from '../search.service';
import { PlayerService } from '../player.service';
import { AuthService } from '../auth.service';
import { StatusService } from '../services/status.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  @ViewChild("search")
  searchInput
  searchText = ""
  searchThreadhold = null

  items = []

  constructor(
    public search: SearchService, 
    public player: PlayerService, 
    public auth: AuthService,
    public status: StatusService,
    public route: ActivatedRoute,
    public notify: NotifyService) { }

  ngOnInit() {
  }

  addToQueue(item){
    this.player.addToQueue(item).subscribe(data => {
      console.log("Added to queue", data)
      this.notify.notification.next({type: "requestCurrentState"})
    });
  }

  onSearchInput(event){
    if(this.searchThreadhold != null){
      clearTimeout(this.searchThreadhold)
    }
    this.searchThreadhold = setTimeout(() => {
      var query = event.target.value

      if(query == "" || query == null) return;
      
      this.search.search(query).subscribe(data => {
        this.items = data.tracks.items;
      })
    }, 500)
  }

  clearSearch(){
    if(this.searchThreadhold != null){
      clearTimeout(this.searchThreadhold)
    }
    this.searchInput.nativeElement.value = ""
    this.items = []
  }
}
