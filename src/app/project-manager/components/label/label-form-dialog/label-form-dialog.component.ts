import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import * as utils from '@workbench/utils';
import { validColorValidator } from 'ngx-colors';

import { Label } from '@app/interfaces';

@Component({
  selector: 'pm-label-form-dialog',
  templateUrl: './label-form-dialog.component.html',
  styleUrls: ['../../base-crud-dialog.scss'],
})
export class LabelFormDialogComponent {
  @Input() title?: string;
  @Input() label?: Label | Label;
  @Output() submitEvent = new EventEmitter<Partial<Label>>();
  @ViewChild('content', { read: ElementRef }) public content?: ElementRef<any>;

  form = this.fb.group({
    author: ['', []],
    description: ['', []],
    is_public: [false, [Validators.required]],
    name: ['', [Validators.required]],
    value: ['', [Validators.required]],
    color: [
      '#f0cded',
      {
        updateOn: 'change',
        validators: [Validators.required, validColorValidator()],
        asyncValidators: [],
      },
    ],
    colorPicker: [
      '#f0cded',
      { updateOn: 'change', validators: [], asyncValidators: [] },
    ],
    tags: [<string[]>[], []],
    examples: this.fb.array([this.fb.control('')]),
  });
  labelColors = utils.labelColors;

  get examples() {
    return this.form.get('examples') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.label) {
      this.form.controls['author'].setValue(this.label.author!);
      this.form.controls['description'].setValue(this.label.description!);
      this.form.controls['name'].setValue(this.label.name!);
      // Use spread operator for arrays, otherwise it edits the original data directly.
      this.form.controls['tags'].setValue([...this.label.tags!]);
      this.form.controls['value'].setValue(this.label.value);
      this.form.controls['color'].setValue(this.label.color!);
      this.form.controls['colorPicker'].setValue(this.label.color!);
      this.examples.clear(); // Removes the initial '' field.
      this.label.examples?.forEach((example) =>
        this.examples.push(this.fb.control(example))
      );
    }
    this.form.controls['color'].valueChanges.subscribe((color) => {
      if (this.form.controls['colorPicker'].valid) {
        this.form.controls['colorPicker'].setValue(color, {
          emitEvent: false,
        });
      }
    });
    this.form.controls['colorPicker'].valueChanges.subscribe((color) =>
      this.form.controls['color'].setValue(color, {
        emitEvent: false,
      })
    );
  }

  addExample() {
    this.examples.push(this.fb.control(''));
  }

  deleteExample(exampleIndex: number) {
    this.examples.removeAt(exampleIndex);
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Get examples from the formArray
      const examples: string[] = [];
      this.examples.controls.forEach((example) => examples.push(example.value));
      const label: Partial<Label> = {
        author: this.form.value.author!,
        color: this.form.value.color!,
        description: this.form.value.description!,
        examples,
        name: this.form.value.name!,
        value: this.form.value.value!,
        tags: this.form.value.tags!,
      };
      this.submitEvent.emit(label);
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
