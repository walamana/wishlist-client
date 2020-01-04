import { MusicProviders } from '../provider/music.provider';
import { SpotifyAuth } from './spotify.auth';


export abstract class Authorizer{
    abstract login()
}

export function getAuthorizer(provider: MusicProviders): () => void{
    if(provider == MusicProviders.SPOTIFY_REMOTE){
        return SpotifyAuth.login
    }else{
        return () => { console.error("Invalid authorizer") }
    }
}