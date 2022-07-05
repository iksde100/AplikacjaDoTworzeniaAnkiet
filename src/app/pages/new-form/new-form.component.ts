import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss'],
})
export class NewFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    questions: this.fb.array([
      this.fb.group({
        content: ['test1', Validators.required],
      }),
      this.fb.group({
        content: ['test2', Validators.required],
      }),
      this.fb.group({
        content: ['test3', Validators.required],
      }),
    ]),
  });
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addQuestion(): void {
    this.questions.push(
      this.fb.group({
        content: ['', Validators.required],
      })
    );
  }

  onSubmit() {
    console.log(this.form.value);
    this.snackBar.open('Dodano ankietę', 'Ok', {
      duration: 2000,
    });
  }
}
