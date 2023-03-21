import { Component, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  surname: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent {
  customColumn = 'name';
  defaultColumns = [ 'surname', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Marban', surname: 'Otto', items: 5, kind: 'dir' },
      children: [
        { data: { name: 'visit-1.pdf', kind: 'pdf', surname: '' } },
        { data: { name: 'visit-2.pdf', kind: 'pdf', surname: '' } },
        { data: { name: 'visit-3.pdf', kind: 'pdf', surname: '' } },
        { data: { name: 'visit-4.pdf', kind: 'pdf', surname: '' } },
      ],
    },
    {
      data: { name: 'Jacob', kind: 'dir', surname: 'Thornton', items: 2 },
      children: [
        { data: { name: 'visit-1.pdf', kind: 'doc', surname: '' } },
        { data: { name: 'visit-2.pdf', kind: 'doc', surname: '' } },
      ],
    },
    {
      data: { name: 'Albart', kind: 'dir', surname: 'Marken', items: 2 },
      children: [
        { data: { name: 'visit-1.pdf', kind: 'bkp', surname: '' } },
        { data: { name: 'visit-2.pdf', kind: 'txt', surname: '' } },
      ],
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
