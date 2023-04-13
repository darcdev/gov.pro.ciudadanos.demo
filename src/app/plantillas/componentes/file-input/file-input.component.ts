import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ElementRef,
  ViewChild
} from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "app-file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.css"]
})
export class FileInputComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}
  radicateSubmited: boolean = false;
  @Input()
  set isSubmitted(isSubmited: any) {
    console.log(isSubmited);
    if (isSubmited) {
      this.clearFileInput();
    }
  }
  @Input() pesoPermitido: any; //En B
  @Input() readonly: boolean; //En B
  @Input() dimensionesPermitidasAncho: any;
  @Input() requerido: boolean;
  @Input() dimensionesPermitidasAlto: any;
  @Input() tiposDatosPermitidos: any;
  @Input() tiposDatosPermitidosTexto: any;
  errorMessage: string = "";
  error: boolean = false;

  public file: File | null = null;
  public fileData: any;
  public nameFileData: any;
  public sizeFileData: any;
  public downloadUrl: string;
  public typeFile: string = "";

  ngOnInit() {}

  validateFileSize() {
    if (this.file && this.pesoPermitido > 0)
      return this.file.size <= this.pesoPermitido;
    return true;
  }

  validateFileDimensions() {
    return true;
  }

  validateFileType() {
    if (this.file) return this.tiposDatosPermitidos.includes(this.file.type);

    return true;
  }

  validarArchivo() {
    this.errorMessage = "";
    this.error = false;

    if (!this.fileData) {
      if (!this.file && this.requerido) {
        this.errorMessage += "\n* " + "Requerido";
        this.error = true;
        return;
      }

      if (!this.validateFileType()) {
        this.errorMessage +=
          "\n* " + "Error tipo" + " " + this.tiposDatosPermitidosTexto;
        this.error = true;
      }

      if (!this.validateFileSize()) {
        this.errorMessage += "\n* " + "Error peso" + " " + this.convertSize();
        this.error = true;
      }

      if (!this.validateFileDimensions()) {
        this.errorMessage +=
          "\n* " +
          "Error en dimensiones" +
          " " +
          this.dimensionesPermitidasAncho +
          " * " +
          this.dimensionesPermitidasAlto;
        this.error = true;
      }
    }
  }
  openFile() {
    const pdfWindow = window.open("", "Pdf viewer");
    pdfWindow?.document.write(
      "<embed width='100%' height='100%' src='data:application/pdf;base64," +
        encodeURI(this.fileData.toString().split(",")[1]) +
        "'></embed>"
    );
    pdfWindow?.document.close();
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;

      this.typeFile = this.file?.type || "";

      this.validarArchivo();

      if (this.error) {
        this.file = null;
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.downloadUrl = "";
        this.fileData = reader.result;
        this.nameFileData = file.name;
        this.sizeFileData = file.size;
        this.errorMessage = "";

        if (this.file?.type === "application/pdf") {
          this.downloadUrl = this.fileData;
        }
      };
    }
  }

  setFileData(fileData: any) {
    this.fileData = fileData;
    this.downloadUrl = this.fileData;
  }

  clearFileInput() {
    this.fileInput.nativeElement.value = "";
    this.fileData = "";
    this.file = null;
    this.validarArchivo();
  }

  convertSizeFunction(bytes: any, decimals: number) {
    if (bytes < 0) {
      return "Invalid value";
    }

    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;
    const gigabytes = megabytes / 1024;

    let result = bytes + "B";

    if (kilobytes >= 1) {
      result = kilobytes.toFixed(decimals) + " KB";
    }

    if (megabytes >= 1) {
      result = megabytes.toFixed(decimals) + " MB";
    }

    if (gigabytes >= 1) {
      result = gigabytes.toFixed(decimals) + " GB";
    }

    if (bytes >= 1073741824) {
      return "Any size";
    }

    return result;
  }
  convertSize() {
    return this.convertSizeFunction(this.pesoPermitido, 0);
  }
}
