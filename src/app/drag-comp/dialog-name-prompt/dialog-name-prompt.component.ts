import { Component, Input } from '@angular/core';
import { NbDialogRef, NbStepChangeEvent } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent {
  @Input() societe: any[];
  selectedName: string;
  selectedIndex: number;

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  onSelectionChange(event: any) {
    console.log('Selected Option:', event);
  }
  changeEvent: NbStepChangeEvent;

  handleStepChange(e: NbStepChangeEvent): void {
    this.changeEvent = e;
    console.log(e)
  }
}
