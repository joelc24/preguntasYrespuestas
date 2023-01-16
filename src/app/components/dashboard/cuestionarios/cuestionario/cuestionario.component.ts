import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit{
  idCuestionario: number
  loading: boolean = false
  cuestionario: any = {}
  ngOnInit(): void {
    this.getCuestionario()
  }

  constructor(
    private cuesionarioService : CuestionarioService,
    private aRoute: ActivatedRoute
  ) {
    this.idCuestionario = +aRoute.snapshot.paramMap.get('id')
  }

  getCuestionario(): void {
    this.loading = true
    this.cuesionarioService.getCuestionario(this.idCuestionario).subscribe(data => {
      this.loading = false
      this.cuestionario = data
      console.log(data)
    })
  }
}
