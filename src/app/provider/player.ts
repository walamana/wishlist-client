import { MusicProviders } from './music.provider';

export abstract class MusicPlayer{
    abstract provider: MusicProviders

    abstract async init(authToken)
    abstract async play(trackId)
}