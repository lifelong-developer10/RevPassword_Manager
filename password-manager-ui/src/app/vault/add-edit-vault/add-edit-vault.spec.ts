import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVault } from './add-edit-vault';

describe('AddEditVault', () => {
  let component: AddEditVault;
  let fixture: ComponentFixture<AddEditVault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditVault]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditVault);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
