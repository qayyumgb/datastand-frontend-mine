import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LangTag, Text } from '@app/interfaces';
import { AbstractText } from '@app/interfaces/abstract';
import { LangTagService } from '@app/services';

@Component({
  selector: 'pm-text-form-dialog',
  templateUrl: './text-form-dialog.component.html',
  styleUrls: ['../../base-crud-dialog.scss'],
})
export class TextFormDialogComponent implements OnInit {
  @Input() title?: string;
  // Corpus is only required when creating a new text.
  @Input() langtag?: string;
  // Text is only required when updating a text.
  @Input() text?: AbstractText;
  @Output() submitEvent = new EventEmitter<Partial<Text>>();
  @ViewChild('content', { read: ElementRef }) public content?: ElementRef<any>;
  form = this.fb.group({
    author: ['', []],
    description: ['', []],
    langtag: ['', [Validators.required]],
    name: ['', []],
    raw_string: ['', [Validators.required]],
    tags: [<string[]>[], []],
  });
  langtagOptions?: LangTag[];

  constructor(private fb: FormBuilder, private langTagService: LangTagService) {
    this.langTagService
      .getLangTags()
      .subscribe((res) => (this.langtagOptions = res));
  }

  ngOnInit(): void {
    // Set the language to the container language by default.
    this.form.controls['langtag'].setValue(this.langtag!);
    if (this.text) {
      this.form.controls['author'].setValue(this.text.author!);
      this.form.controls['description'].setValue(this.text.description!);
      this.form.controls['langtag'].setValue(this.text.langtag!);
      this.form.controls['name'].setValue(this.text.name!);
      this.form.controls['raw_string'].setValue(this.text.raw_string);
      // Use spread operator for tags, otherwise it edits Text directly.
      this.form.controls['tags'].setValue([...this.text.tags!]);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const text: Partial<Text> = {
        author: this.form.value.author!,
        description: this.form.value.description!,
        langtag: this.form.value.langtag!,
        name: this.form.value.name!,
        raw_string: this.form.value.raw_string!,
        tags: this.form.value.tags!,
      };
      this.submitEvent.emit(text);
    }
  }

  scrollToBottom() {
    this.content?.nativeElement?.scroll({
      top: this.content?.nativeElement?.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  updateTags(tags: string[]): void {
    this.form.controls['tags'].setValue(tags);
  }
}
