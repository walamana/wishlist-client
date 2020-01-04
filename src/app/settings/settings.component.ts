import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../provider/spotify_local/playlist.service';
import { SettingsService } from './settings.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  settings = { playlist: ""}

  playlists: {id: any, name: string, cover: string, selected: boolean}[] = []

  constructor(
    private playlist: PlaylistService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.playlist.getPlaylist().subscribe(playlists => {
      this.playlists = playlists.items.map(item => {
        return {
          id: item.id,
          name: item.name,
          cover: item.images.length > 0 ? item.images[0].url : "https://static.tumblr.com/qmraazf/ps5mjrmim/unknown-album.png",
        }
      })
    })

    this.settingsService.getSettings().subscribe(settings => {
      this.settings = settings;
      console.log(this.settings)
    })

    this.playlist.getPlaylists().subscribe(data => {
      console.log(data);
    })
  
  }

  playlistClicked(index){
    this.settings.playlist = this.playlists[index].id;
    this.settingsService.setProperty("playlist", this.playlists[index].id).subscribe(res => {
      console.log(res)
    })
  }

}
