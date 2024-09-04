import { ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, input, signal, ViewChild } from '@angular/core';
import { injectBeforeRender, NgtVector3 } from 'angular-three';

@Component({
  selector: 'app-cube',
  standalone: true,
  template: `
    <ngt-mesh 
      #mesh
      [position]="position"
      [scale]="clicked ? 1.5 : 1"
      (pointerover)="onPointerOver()"
      (pointerout)="onPointerOut()"
      (click)="onClick()"
    >
      <ngt-box-geometry />
      <ngt-mesh-standard-material [color]="hovered ? 'darkred' : 'mediumpurple'" />
    </ngt-mesh>`,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cube {
  @ViewChild('mesh') meshRef!: ElementRef;
  @Input({required: true}) position = <NgtVector3>[0, 0, 0];
  hovered = false;
  clicked = false;

  constructor(private cdr: ChangeDetectorRef) {
    injectBeforeRender(({ delta }) => {
      const mesh = this.meshRef.nativeElement;
      mesh.rotation.x += delta;
      mesh.rotation.y += delta;
    });
  }

  onPointerOver(){
   this.hovered = true;
   this.cdr.detectChanges();

  }
  onPointerOut() {
    this.hovered = false;
    this.cdr.detectChanges()
  }

  onClick() {
    console.log('click');
    this.clicked = !this.clicked;
    this.cdr.detectChanges()
  }
}