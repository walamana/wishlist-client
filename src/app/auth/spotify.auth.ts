import { Authorizer } from './auth';
import { environment } from 'src/environments/environment';

export namespace SpotifyAuth{

    export function login(){
        window.location.assign(environment.api_url + "/login/spotify")
    }

}
