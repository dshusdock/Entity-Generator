import { Injectable } from '@angular/core';
import { EntityInfo } from '../constants/datatypes';

@Injectable({
    providedIn: 'root'
})
export class EntityInfoService {
    private _entityList: EntityInfo[] = [];
    private _entityClassName = "";

    constructor() { }

    public set entityList(entityList: EntityInfo) {
        this._entityList.push(entityList);
    }

    // public get entityList(index): EntityInfo {
    //     return this._entityList[index];
    // }

    public getEntityListArray(): EntityInfo[] {
        return this._entityList;
    }

    public set entityClassName(name: string) {
        this._entityClassName = name;
    }

    public get entityClassName() {
        return this._entityClassName;
    }
}
