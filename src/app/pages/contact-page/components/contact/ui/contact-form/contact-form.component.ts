import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '@app/components/common/button';
import { AppValidators } from '@app/utils/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, map, tap } from 'rxjs';
import {
  ContactCustomerDto,
  ContactMethod,
} from '../../data-access/contact-customer';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ButtonComponent,
    TranslatePipe,
    NgTemplateOutlet,
    MatPseudoCheckboxModule,
    KeyValuePipe,
    MatCheckboxModule,
  ],
  template: `
    <form
      data-testid="contact-form"
      role="form"
      [formGroup]="contactForm"
      (ngSubmit)="submitForm()"
    >
      <div class="grid grid-cols-2 gap-4">
        <ng-container *ngTemplateOutlet="firstNameField" />
        <ng-container *ngTemplateOutlet="lastNameField" />
        <ng-container *ngTemplateOutlet="emailField" />
        <ng-container *ngTemplateOutlet="phoneNumberField" />
        <ng-container *ngTemplateOutlet="companyField" />
        <ng-container *ngTemplateOutlet="messageField" />
        <ng-container *ngTemplateOutlet="preferredContactMethodsField" />
      </div>

      <div class="m-auto mt-8 w-full max-w-md">
        <app-button [isLoading]="$isLoading()">
          {{ 'contact.form.action' | translate }}
        </app-button>
      </div>
    </form>

    <ng-template #firstNameField>
      <mat-form-field>
        <mat-label>
          {{ 'contact.form.firstName.label' | translate }}
        </mat-label>
        <input matInput [formControl]="contactForm.controls.firstName" />
        @if (contactForm.controls.firstName.hasError('required')) {
          <mat-error>
            {{ 'contact.form.firstName.error.required' | translate }}
          </mat-error>
        }
      </mat-form-field>
    </ng-template>

    <ng-template #lastNameField>
      <mat-form-field>
        <mat-label>
          {{ 'contact.form.lastName.label' | translate }}
        </mat-label>
        <input matInput [formControl]="contactForm.controls.lastName" />
        @if (contactForm.controls.lastName.hasError('required')) {
          <mat-error>
            {{ 'contact.form.lastName.error.required' | translate }}
          </mat-error>
        }
      </mat-form-field>
    </ng-template>

    <ng-template #emailField>
      <mat-form-field class="col-span-full md:col-span-1">
        <mat-label>
          {{ 'contact.form.email.label' | translate }}
        </mat-label>
        <input
          matInput
          type="email"
          [formControl]="contactForm.controls.email"
        />
        @if (contactForm.controls.email.hasError('required')) {
          <mat-error>
            {{ 'contact.form.email.error.required' | translate }}
          </mat-error>
        }
        @if (contactForm.controls.email.hasError('email')) {
          <mat-error>
            {{ 'contact.form.email.error.invalid' | translate }}
          </mat-error>
        }
      </mat-form-field>
    </ng-template>

    <ng-template #phoneNumberField>
      <mat-form-field class="col-span-full md:col-span-1">
        <mat-label>
          {{ 'contact.form.phoneNumber.label' | translate }}
        </mat-label>
        <input
          matInput
          type="tel"
          placeholder="+56987654321"
          [formControl]="contactForm.controls.phoneNumber"
        />
        @if (contactForm.controls.phoneNumber.invalid) {
          <mat-hint>
            {{ 'contact.form.phoneNumber.hint' | translate }}
          </mat-hint>
        }
        @if (contactForm.controls.phoneNumber.hasError('required')) {
          <mat-error>
            {{ 'contact.form.phoneNumber.error.required' | translate }}
          </mat-error>
        }
        @if (contactForm.controls.phoneNumber.hasError('phoneNumber')) {
          <mat-error>
            {{ 'contact.form.phoneNumber.error.invalid' | translate }}
          </mat-error>
        }
      </mat-form-field>
    </ng-template>

    <ng-template #companyField>
      <mat-form-field class="col-span-full">
        <mat-label>
          {{ 'contact.form.company.label' | translate }}
        </mat-label>
        <input matInput [formControl]="contactForm.controls.company" />
      </mat-form-field>
    </ng-template>

    <ng-template #messageField>
      <mat-form-field class="col-span-full">
        <mat-label>
          {{ 'contact.form.message.label' | translate }}
        </mat-label>
        <textarea
          matInput
          [formControl]="contactForm.controls.message"
          [maxlength]="MESSAGE_MAX_LENGTH"
          [placeholder]="'contact.form.message.placeholder' | translate"
          cdkTextareaAutosize
          cdkAutosizeMinRows="5"
          cdkAutosizeMaxRows="10"
        ></textarea>
        <mat-hint align="end">
          {{ contactForm.controls.message.value.length }} /
          {{ MESSAGE_MAX_LENGTH }}
        </mat-hint>
        @if (contactForm.controls.message.hasError('required')) {
          <mat-error>
            {{ 'contact.form.message.error.required' | translate }}
          </mat-error>
        }
      </mat-form-field>
    </ng-template>

    <ng-template #preferredContactMethodsField>
      <mat-form-field class="col-span-full">
        <mat-label>
          {{ 'contact.form.preferredContactMethods.label' | translate }}
        </mat-label>
        <input
          matInput
          hidden
          [formControl]="contactForm.controls.contactMethodSelected"
        />
        <section
          [formGroup]="contactMethodsForm"
          class="flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-around"
        >
          @for (
            contactMethod of contactMethodsForm.controls | keyvalue;
            track contactMethod.key
          ) {
            <mat-checkbox
              [formControl]="contactMethod.value"
              [value]="contactMethod.key"
            >
              {{
                'contact.form.preferredContactMethods.options.' +
                  contactMethod.key | translate
              }}
            </mat-checkbox>
          }
        </section>

        @if (contactForm.controls.contactMethodSelected.hasError('required')) {
          <mat-error>
            {{
              'contact.form.preferredContactMethods.error.required' | translate
            }}
          </mat-error>
        }
      </mat-form-field>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  readonly #formBuilder = inject(FormBuilder);

  readonly $isLoading = input(false, {
    alias: 'isLoading',
    transform: booleanAttribute,
  });

  readonly $submitForm = output<ContactCustomerDto>({ alias: 'submitForm' });

  protected readonly CONTACT_METHODS = Object.values(ContactMethod);
  protected readonly MESSAGE_MAX_LENGTH = 500;

  protected readonly contactMethodsForm = this.#formBuilder.nonNullable.group(
    Object.values(ContactMethod).reduce(
      (formGroup, contactMethod) => ({
        ...formGroup,
        [contactMethod]: this.#formBuilder.control(false, [
          Validators.required,
        ]),
      }),
      {} as Record<ContactMethod, FormControl<boolean>>,
    ),
    { validators: [AppValidators.atLeastOneSelected] },
  );

  protected readonly contactForm = this.#formBuilder.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, AppValidators.phoneNumber]],
    company: [null as ContactCustomerDto['company']],
    message: [
      '',
      [Validators.required, Validators.maxLength(this.MESSAGE_MAX_LENGTH)],
    ],
    preferredContactMethods: this.contactMethodsForm,
    contactMethodSelected: [false, [Validators.requiredTrue]],
  });

  constructor() {
    effect(() => {
      if (this.$isLoading()) this.contactForm.disable({ emitEvent: false });
      else this.contactForm.enable({ emitEvent: false });
    });

    this.contactForm.controls.company.valueChanges
      .pipe(
        filter((company) => company === ''),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.contactForm.controls.company.setValue(null, { emitEvent: false });
      });

    this.contactMethodsForm.statusChanges
      .pipe(
        tap((status) => {
          this.contactForm.controls.contactMethodSelected.setValue(
            status === 'VALID',
          );
        }),
        map(() => this.contactForm.controls.contactMethodSelected),
        filter((control) => control.untouched),
        takeUntilDestroyed(),
      )
      .subscribe((control) => {
        control.markAsTouched({ emitEvent: false });
      });
  }

  protected submitForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched({ emitEvent: false });
      return;
    }

    this.$submitForm.emit({
      firstName: this.contactForm.controls.firstName.value,
      lastName: this.contactForm.controls.lastName.value,
      email: this.contactForm.controls.email.value,
      phoneNumber: this.contactForm.controls.phoneNumber.value,
      company: this.contactForm.controls.company.value,
      message: this.contactForm.controls.message.value,
      preferredContactMethods: Object.entries(this.contactMethodsForm.controls)
        .filter(([, control]) => control.value)
        .map(([contactMethod]) => contactMethod as ContactMethod),
    });
  }
}
