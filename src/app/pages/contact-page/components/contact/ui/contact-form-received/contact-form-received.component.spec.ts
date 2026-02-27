import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactFormReceivedComponent } from './contact-form-received.component';

describe.todo('ContactFormReceivedComponent', () => {
  let component: ContactFormReceivedComponent;
  let fixture: ComponentFixture<ContactFormReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormReceivedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
