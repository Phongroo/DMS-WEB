import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import baseUrl from "../../../../service/helper";
import BpmnJS from 'bpmn-js/lib/NavigatedViewer';
@Component({
  selector: 'app-camunda-viewer',
  templateUrl: './camunda-viewer.component.html',
  styleUrls: ['./camunda-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CamundaViewerComponent implements AfterViewInit, OnChanges {

  @Input()
  visible = false;

  @Input()
  processInstanceId!: string;

  @Output()
  visibleChange =
    new EventEmitter<boolean>();

  @ViewChild(
    'bpmnContainer',
    { static: false }
  )
  bpmnContainer!: ElementRef;

  private viewer: any;

  ngAfterViewInit(): void {}

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['visible'] &&
      this.visible
    ) {

      setTimeout(() => {

        this.initViewer();

        if (this.processInstanceId) {

          this.loadDiagram();
        }

      }, 100);
    }
  }

  initViewer(): void {

    this.viewer = new BpmnJS({

      container:
      this.bpmnContainer
        .nativeElement
    });
  }

  close(): void {

    this.visible = false;

    this.visibleChange.emit(false);

    if (this.viewer) {

      this.viewer.destroy();

      this.viewer = null;
    }
  }

  async loadDiagram(): Promise<void> {

    try {

      const res = await fetch(
        `${baseUrl}/viewer/${this.processInstanceId}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const data = await res.json();

      await this.viewer.importXML(
        data.data.bpmn20Xml
      );

      const canvas =
        this.viewer.get('canvas');

      const elementRegistry =
        this.viewer.get('elementRegistry');

      canvas.zoom('fit-viewport');

      setTimeout(() => {

        this.clearHighlight(
          canvas,
          elementRegistry
        );

        this.applyHighlight(
          data.data,
          canvas,
          elementRegistry
        );

      }, 50);

    } catch (err) {

      console.error(
        'LOAD BPMN ERROR',
        err
      );
    }
  }

  clearHighlight(
    canvas: any,
    elementRegistry: any
  ) {

    elementRegistry.getAll()
      .forEach((el: any) => {

        canvas.removeMarker(
          el.id,
          'highlight-running'
        );

        canvas.removeMarker(
          el.id,
          'highlight-done'
        );

        canvas.removeMarker(
          el.id,
          'highlight-error'
        );

        canvas.removeMarker(
          el.id,
          'highlight-flow'
        );
      });
  }

  applyHighlight(
    data: any,
    canvas: any,
    elementRegistry: any
  ) {

    data.runningActivities
      ?.forEach((id: string) => {

        const el =
          elementRegistry.get(id);

        if (el) {

          canvas.addMarker(
            el.id,
            'highlight-running'
          );
        }
      });

    data.completedActivities
      ?.forEach((id: string) => {

        const el =
          elementRegistry.get(id);

        if (el) {

          canvas.addMarker(
            el.id,
            'highlight-done'
          );
        }
      });

    data.errorActivities
      ?.forEach((id: string) => {

        const el =
          elementRegistry.get(id);

        if (el) {

          canvas.addMarker(
            el.id,
            'highlight-error'
          );
        }
      });

    data.flows
      ?.forEach((id: string) => {

        const el =
          elementRegistry.get(id);

        if (el) {

          canvas.addMarker(
            el.id,
            'highlight-flow'
          );
        }
      });

    data.endEvents
      ?.forEach((id: string) => {

        const el =
          elementRegistry.get(id);

        if (el) {

          canvas.addMarker(
            el.id,
            'highlight-end'
          );
        }
      });
  }
}
