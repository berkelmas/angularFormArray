import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';
import { DjangoResponse } from '../models/djangoresponse.model';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy {
  articles: Observable<Article[]>;

  public form: FormGroup;
  public formSubscription: Subscription;

  username: FormControl = new FormControl('', [Validators.required])

  @ViewChild(NgForm, {static : true}) firstForm : NgForm;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      "username": this.username,
      "password": fb.control('', [Validators.required]),

      "address": fb.group({
        "city": fb.control(''),
        "street": fb.control(''),
        "apartment": fb.control('')
      }),
      "liste": fb.array([])
    })
  }

  ngOnInit() {
    this.articles = this.http.get<DjangoResponse>('https://api.bosanmavukatim.com/kategorimakalefilter').pipe(
      map(res => res.results)
    )

    this.form.valueChanges.pipe(filter(() => this.form.valid)).subscribe(console.log)
  }

  handleSubmit() {
    console.log(this.form.valid);
  }

  get liste() {
    return this.form.get('liste') as FormArray;
  }

  addItem() {
    this.liste.push(this.fb.group({
      "city": this.fb.control(''),
      "street": this.fb.control(''),
      "apartment": this.fb.control('')
    }));
  }

  removeItem(i) {
    this.liste.removeAt(i);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
