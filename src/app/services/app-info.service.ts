import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppInfoService {
    private _abstractRepositorySupport: Boolean;
    private _mongoDBSupport: Boolean;
    private _graphQLSupport: Boolean;

    constructor() {
        this._abstractRepositorySupport = true;
        this._graphQLSupport = true;
        this._mongoDBSupport = true;
    }

    public get abstractRepositorySupport(): Boolean {
        return this._abstractRepositorySupport;
    }

    public set abstractRepositorySupport(abstractRepositorySupport: Boolean) {
        this._abstractRepositorySupport = abstractRepositorySupport;
        console.log("In abstractRepositorySupport Setter: " + abstractRepositorySupport)
    }

    public get mongoDBSupport(): Boolean {
        return this._mongoDBSupport;
    }

    public set mongoDBSupport(mongoDBSupport: Boolean) {
        this._mongoDBSupport = mongoDBSupport;
        console.log("In mongoDBSupport Setter: " + mongoDBSupport)
    }

    public get graphQLSupport(): Boolean {
        return this._graphQLSupport;
    }

    public set graphQLSupport(graphQLSupport: Boolean) {
        this._graphQLSupport = graphQLSupport;
        console.log("In graphQLSupport Setter: " + graphQLSupport)
    }

}
