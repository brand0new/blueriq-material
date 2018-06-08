import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../../generic/element/element.component';
import { MaterialModule } from '../../../material/material.module';
import { PresentationStyles } from '../../../presentationstyles/presentationstyles';

import { CurrencyFieldComponent } from './currency.component';

describe('CurrencyFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<CurrencyFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyFieldComponent, ElementComponent],
      providers: [BlueriqComponents.register([CurrencyFieldComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.currency();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CurrencyFieldComponent);
  });

  it('should create CurrencyFieldComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain euro sign', () => {
    const suffix = component.nativeElement.querySelector('mat-form-field').innerHTML;
    expect(suffix).toContain('matprefix');
  });

  it ('should contain explain en message support', () => {
    const appElement = component.nativeElement.querySelector('app-element');
    expect(appElement).toBeTruthy();
  });
});
