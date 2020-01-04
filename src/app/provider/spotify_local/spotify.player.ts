import { MusicPlayer } from '../player';
import { MusicProviders } from '../music.provider';
import { Subject } from 'rxjs';

declare var Spotify: any; // Ignore missing declaration files for Spotify SDK

export class SpotifyPlayer extends MusicPlayer{
    provider = MusicProviders.SPOTIFY_LOCAL

    stateChanged = new Subject<any>();

    async init(authToken){
        console.log("Initializing player")
        const player = new Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(authToken); },
            volume: 0.1
        });
        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); this.stateChanged.next() });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            this.stateChanged.next({
                event: "ready"
            })
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();

        player.setName("Wishlist Player").then(() => {
            console.log('Player name updated!');
        });

        setTimeout(() => {
            // player.pause().then( () => {
            //     console.log("Paused after 3 sec")
            // })
            player.getVolume().then(volume => {
                let volume_percentage = volume * 100;
                console.log(`The volume of the player is ${volume_percentage}%`);
            });
        }, 5000)
    }

    async play(trackId){

    }
}