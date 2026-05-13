import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent  implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  visibleChange =
    new EventEmitter<boolean>();

  @Input()
  visible = false;

  @Input()
  pdfUrl!: string;

  close(): void {

    this.visible = false;

    this.visibleChange.emit(false);
  }
}
