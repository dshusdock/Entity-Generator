import { Injectable } from '@angular/core';

export class LogService {
    classObj

    constructor(public obj: any) {
        this.classObj = obj;
    }

    log(msg: any) {
        console.log("[" + this.classObj.constructor.name + "]" + ": "
            + JSON.stringify(msg));
    }
}