import { Injectable } from "@angular/core";
import { FileType } from "../enums/file-type.enum";

@Injectable({
    providedIn: 'root'
})
export class FileTypeService {
    public formatFileTypes(values: FileType[]): string {
        let result = '';
        values.forEach((value, index) => {
            index == 0 ? result += FileType[value] : 
            index == (values.length - 1) ? result += ' ou ' + FileType[value] :
            result += ', ' + FileType[value];
        });
        return result;
    }
}