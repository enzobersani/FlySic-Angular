import { Injectable } from '@angular/core';
import { TextsModel } from '../models/texts/texts.model';
import { Observable, Subject } from 'rxjs';
import { FileType } from '../enums/file-type.enum';
import { FileTypePipe } from '../pipes/file-type.pipe';
import { FileTypeService } from './file-type.service';

@Injectable({
  providedIn: 'root'
})
export class InputFileTextsService {

  private _text: Subject<TextsModel> = new Subject();
  private _reference: TextsModel = {
    labels: {
      title: 'Anexe aqui seu(s) documento(s) em {0}. Tamanho máximo permitido por chamado é de {1} MB.',
      searchFile: 'Procurar arquivo',
      dragAndDrop: 'Arraste e solte aqui seu(s) documento(s)'
    },
    messages: {
      success: 'Arquivo(s) anexado com sucesso!',
      invalidFile: 'Arquivo(s) inválido(s)',
      uploadError: 'Erro no upload',
      maxSizeError: 'Tamanho do arquivo excede o permitido',
      maxLengthError: 'Quantidade máxima de arquivos atingida'
    }
  }

  constructor(private fileTypeService: FileTypeService) { }

  public getAsyncTexts(): Observable<TextsModel> {
    return this._text.asObservable();
  }

  public sendText(texts: TextsModel) {
    this._text.next(texts);
    this._reference = texts;
  }

  public getText(maxSize: number, allowedTypes?: FileType[]): TextsModel {
    if(allowedTypes) {
      this._reference.labels!.title = this._reference.labels!.title!.replace('{0}', this.fileTypeService.formatFileTypes(allowedTypes));
      this._reference.labels!.title = this._reference.labels!.title!.replace('{1}', maxSize.toString());
    }
    return this._reference;
  }

  public setTexts(texts?: TextsModel): void {
    this.sendText(this.getReferenceIfTextsNotExists(texts));
  }

  public getReferenceIfTextsNotExists(texts?: TextsModel): TextsModel {
    return texts ? texts : this._reference;
  }
}
