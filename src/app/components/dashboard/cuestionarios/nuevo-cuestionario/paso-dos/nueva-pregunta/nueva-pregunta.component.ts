import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from '../../../../../../models/respuesta';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit{
  nuevaPregunta: FormGroup
  pregunta: Pregunta
  rtaCorrecta : number = 0

  @Output() enviarPregunta = new EventEmitter<Pregunta>()

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    
    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([])
    })

  }  
  ngOnInit(): void {
    this.agregarRespuestasPorDefecto()
  }
 
 
  //* DEVUELVE FORMARRARY DE RESPUESTAS *//
  
  public get getRespuestas() : FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray
  }
  
  
  //* AGREGAR RESPUESTAS AL ARRAY *//
  
  agregarRespuestas() : void {
    this.getRespuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      esCorrecta: 0
    }))
  }

  agregarRespuestasPorDefecto() : void {
    this.agregarRespuestas()
    this.agregarRespuestas()
  }

  eliminarRespuesta(indice : number) : void{
    if(this.getRespuestas.length === 2){
      this.toastr.error('Como minimo la pregunta debe contener dos respuestas','Error!')
    }else{
      this.getRespuestas.removeAt(indice)
    }
  }

  setRespuestaValida(indice : number) : void {
    this.rtaCorrecta = indice
  }

  agregarPregunta():void {
    //? Obtenemos el titulo de la pregunta
    const descripcionPregunta = this.nuevaPregunta.get('titulo').value

    //? Obtenemos el array de respuesta 
    const arrayRespuestas = this.nuevaPregunta.get('respuestas').value

    //? Creamos el array de respuestas
    const arrayRta: Respuesta[] = []

    arrayRespuestas.forEach((element, index) => {
      const respuesta : Respuesta = new Respuesta(element.descripcion, false)
      if (this.rtaCorrecta === index) {
        respuesta.esCorrecta = true
      }

      arrayRta.push(respuesta)
    });

    const pregunta : Pregunta = new Pregunta(descripcionPregunta,arrayRta)
    
    this.enviarPregunta.emit(pregunta)
    this.reset()
  }

  reset() : void {
    this.nuevaPregunta.reset()
    this.getRespuestas.clear()
    this.agregarRespuestasPorDefecto()
  }
}
