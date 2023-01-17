import { TestBed } from '@angular/core/testing';

import { RespuestaCuestionarioService } from './respuesta-cuestionario.service';

describe('RespuestaCuestionarioService', () => {
  let service: RespuestaCuestionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestaCuestionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
