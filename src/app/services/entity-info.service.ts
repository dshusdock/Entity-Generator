import { Injectable } from '@angular/core';
import { EntityInfo } from '../constants/datatypes';

@Injectable({
    providedIn: 'root'
})
export class EntityInfoService {
    entityList: EntityInfo[] = [];

    constructor() { }

    updateEntityInfo(entityList: EntityInfo[]) {
        this.entityList = [];
        this.entityList = entityList;

        console.log("EntityList length: " + this.entityList.length);
    }

    getEntityList(): EntityInfo[] {
        return this.entityList;
    }
}
