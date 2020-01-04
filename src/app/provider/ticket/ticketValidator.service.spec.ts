/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TicketValidatorService } from './ticketValidator.service';

describe('Service: TicketValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketValidatorService]
    });
  });

  it('should ...', inject([TicketValidatorService], (service: TicketValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
