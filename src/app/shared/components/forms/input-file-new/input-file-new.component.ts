import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-file-new',
  standalone: true,
  imports: [],
  templateUrl: './input-file-new.component.html',
  styleUrl: './input-file-new.component.scss'
})
export class InputFileNewComponent {
  @Input() multiple: boolean = false;
  @Input() accept: string = '*/*'; // ex: 'image/*', '.pdf', etc
  @Input() label: string = 'Escolher arquivo';
  @Output() filesSelected = new EventEmitter<FileList>();

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.filesSelected.emit(input.files);
    }
  }
}
