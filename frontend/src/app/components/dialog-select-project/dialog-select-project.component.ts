import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogSelectProjectData } from '../../models/dialog-select-project';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dialog-select-project',
  imports: [
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-select-project.component.html',
  styleUrl: './dialog-select-project.component.scss',
})
export class DialogSelectProjectComponent {
  projectService = inject(ProjectService);
  data = inject<DialogSelectProjectData>(MAT_DIALOG_DATA);

  displayedColumns: string[] = ['name', 'select'];

  dataSource = new MatTableDataSource<Project>();
  selection = new SelectionModel<Project>(true, []);

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.get().subscribe({
      next: (res) => {
        this.dataSource.data = res.items;
        this.markSelectedProjects();
      },
    });
  }

  markSelectedProjects() {
    if (this.data.selectedProjects) {
      this.dataSource.data.forEach((project) => {
        const selectedProject = this.data.selectedProjects.some(
          (item) => item.id === project.id
        );

        if (selectedProject) {
          this.selection.toggle(project);
        }
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
}
