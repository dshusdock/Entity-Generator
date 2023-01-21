import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModuleFileCreatorService {

    constructor() { }

    generateFile(): Blob {
        const file = new Blob(['fileContent'], { type: "text/plain" });
        return file;

    }

}

