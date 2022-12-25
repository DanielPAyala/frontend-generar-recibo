import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Recibo } from './models/recibo.model';
import { ReciboService } from './services/recibo.service';
import { environment } from '../environments/environment';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  recibo: Recibo = new Recibo();
  listRecibo: Recibo[] = [];

  logosPath = environment.LOGOS_URL;

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('fileInput') el:ElementRef | undefined;

  constructor(private reciboService: ReciboService) {}

  ngOnInit(): void {
    this.getRecibos();
  }

  addClick() {
    this.recibo = new Recibo();
  }

  getRecibos(): void {
    this.reciboService.getListrecibo().subscribe({
      next: (data) => {
        this.listRecibo = data;
      },
    });
  }

  generarRecibo(): void {
    let file = this.el?.nativeElement.files[0];
    this.reciboService.convertFile(file).subscribe(base64 => {
      const pdfDefinition: any = {
        content: [
          (this.recibo.tipoMoneda == 1) ? 'Sol': 'Dolar',
          this.recibo.monto,
          this.recibo.titulo,
          this.recibo.descripcion,
          this.recibo.direccion,
          this.recibo.nombres,
          (this.recibo.tipoDocumento == 1) ? 'Factura': 'Boleta',
          {
            image: base64,
            width: 50
          }
        ]
      }
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    });

    const formData: FormData = new FormData();

    formData.append('archivo', file);
    formData.append('recibo', JSON.stringify(this.recibo));

    this.reciboService.saveRecibo(formData).subscribe({
      next: (resp) => {
        console.log(resp);
        this.getRecibos();
        this.closebutton.nativeElement.click();
      },
      error: console.log,
    });
  }
}
