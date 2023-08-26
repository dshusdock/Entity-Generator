import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppInfoService {
    private _abstractRepositorySupport: boolean;
    private _mongoDBSupport: boolean;
    private _graphQLSupport: boolean;

    constructor() {
        this._abstractRepositorySupport = true;
        this._graphQLSupport = true;
        this._mongoDBSupport = true;
    }

    public get abstractRepositorySupport(): boolean {
        return this._abstractRepositorySupport;
    }

    public set abstractRepositorySupport(abstractRepositorySupport: boolean) {
        this._abstractRepositorySupport = abstractRepositorySupport;
        console.log("In abstractRepositorySupport Setter: " + abstractRepositorySupport)
    }

    public get mongoDBSupport(): boolean {
        return this._mongoDBSupport;
    }

    public set mongoDBSupport(mongoDBSupport: boolean) {
        this._mongoDBSupport = mongoDBSupport;
        console.log("In mongoDBSupport Setter: " + mongoDBSupport)
    }

    public get graphQLSupport(): boolean {
        return this._graphQLSupport;
    }

    public set graphQLSupport(graphQLSupport: boolean) {
        this._graphQLSupport = graphQLSupport;
        console.log("In graphQLSupport Setter: " + graphQLSupport)
    }

}
