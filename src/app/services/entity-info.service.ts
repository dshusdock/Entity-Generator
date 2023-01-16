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

    public getEntityListArray(): EntityInfo[] {
        return this._entityList;
    }

    public set entityClassName(name: string) {
        this._entityClassName = name;
    }

    public get entityClassName() {
        return this._entityClassName;
    }

    check4Duplicate(name: string): boolean {
        if (this._entityList.find(el => el.entityName === name )) {
            return true;
        }
        return false;
    }

    getValidatorImportStr(): string {
        let valImportList = "";

        this._entityList.forEach((el) => {
            let valList = el.entityValidators;

            valList.forEach((val) => {
                console.log(`Working on Element: ${val}`);
                
                let rx = /^@(\w+)\(/g;
                let arr = rx.exec(val);
                
                if (arr !== null) {
                    let match = arr[1];
                    if (!valImportList.includes(match)) {
                        valImportList += `${match},`;
                        console.log("-->" + valImportList);
                    }
                }
            });

        });
        return valImportList;
    }

    deleteByIndex(index: number) {
        this._entityList.splice(index, 1);
    } 
}
