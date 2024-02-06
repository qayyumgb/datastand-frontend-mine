import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Corpus, LangTag } from '@app/interfaces';
import { CorpusService, LangTagService } from '@app/services';

@Component({
  selector: 'pm-corpus-form-dialog',
  templateUrl: './corpus-form-dialog.component.html',
  styleUrls: ['../../base-crud-dialog.scss'],
})
export class CorpusFormDialogComponent implements OnInit {
  @Input() title: string = 'New Corpus';
  // Corpus is only required when updating a corpus.
  @Input() corpus?: Corpus;
  @Output() submitEvent = new EventEmitter<Partial<Corpus>>();

  form = this.fb.group({
    description: ['', []],
    is_public: [false, [Validators.required]],
    langtag: ['', [Validators.required]],
    name: ['', [Validators.required]],
    tags: [<string[]>[], []],
  });
  langtagOptions?: LangTag[];

  constructor(
    private corpusService: CorpusService,
    private fb: FormBuilder,
    private langTagService: LangTagService
  ) {}

  ngOnInit(): void {
    if (this.corpus) {
      this.form.controls['description'].setValue(this.corpus.description!);
      this.form.controls['is_public'].setValue(this.corpus.is_public!);
      this.form.controls['langtag'].setValue(this.corpus.langtag!);
      this.form.controls['name'].setValue(this.corpus.name);
      // Use spread operator for tags, otherwise it edits Text directly.
      this.form.controls['tags'].setValue([...this.corpus.tags!]);
    }
    this.langTagService
      .getLangTags()
      .subscribe((res) => (this.langtagOptions = res));
  }

  onSubmit(): void {
    if (this.form.valid) {
      const corpus: Partial<Corpus> = {
        description: this.form.value.description!,
        is_public: this.form.value.is_public!,
        langtag: this.form.value.langtag!,
        name: this.form.value.name!,
        tags: this.form.value.tags!,
      };
      this.submitEvent.emit(corpus);
    }
  }

  updateTags(tags: string[]): void {
    this.form.controls['tags'].setValue(tags);
  }
}
