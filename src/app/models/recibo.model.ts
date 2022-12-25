export class Recibo {
  tipoMoneda: number;
  monto: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  nombres: string;
  tipoDocumento: number;
  numeroDocumento: string;
  id?: number;
  logo?: string;

  constructor() {
    this.tipoMoneda = 0;
    this.monto = 0;
    this.titulo = '';
    this.descripcion = '';
    this.direccion = '';
    this.nombres = '';
    this.tipoDocumento = 0;
    this.numeroDocumento = '';
  }
}
