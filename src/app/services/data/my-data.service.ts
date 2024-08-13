import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  private dataSource = new BehaviorSubject<string>(''); // Valor inicial para string
  private arrayDataSource = new BehaviorSubject<any[]>([]); // Valor inicial para array
  
  // Observables expuestos para suscribirse
  stringData$ = this.dataSource.asObservable();
  arrayData$ = this.arrayDataSource.asObservable();
  


  constructor() { }

  // Métodos para obtener los datoS
  getStringData() {
    return this.stringData$;
  }

  getArrayData() {
    return this.arrayData$;
  }

  // Métodos para actualizar los datos
  setStringData(data: string) {
    this.dataSource.next(data);
  }

  setArrayData(data: any[]) {
    this.arrayDataSource.next(data);
  }
}
