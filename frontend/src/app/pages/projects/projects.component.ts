import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DialogDeleteProjectComponent } from '../../components/dialog-delete-project/dialog-delete-project.component';
import { DialogFormProjectComponent } from '../../components/dialog-form-project/dialog-form-project.component';
import { DialogFormProjectData } from '../../models/dialog-form-project-data';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  imports: [MatTableModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Project>;

  projectsService = inject(ProjectService);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);

  projects: Project[] = [];

  displayedColumns: string[] = ['name', 'actions'];

  ngOnInit(): void {
    this.projectsService.get().subscribe({
      next: (res) => {
        this.projects = res.items;
      },
    });
  }

  openDeleteDialog(project: Project) {
    const dialogRef = this.dialog.open(DialogDeleteProjectComponent, {
      data: project.name,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProject(project);
      }
    });
  }

  deleteProject(project: Project) {
    this.projectsService.delete(project.id!).subscribe({
      next: () => {
        this.projects = this.projects.filter((p) => p.id !== project.id);

        this.snackBar.open('Projeto deletado com sucesso!', 'Fechar', {
          duration: 5000,
        });
      },
    });
  }

  openCreateDialog() {
    const dialogData: DialogFormProjectData = {
      title: 'Cadastro de projeto',
      txtBtnSubmit: 'Cadastrar',
    };
    const dialogRef = this.dialog.open(DialogFormProjectComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createProject(result);
      }
    });
  }

  createProject(project: Project) {
    this.projectsService.create(project).subscribe({
      next: (res) => {
        this.projects.unshift(res);
        this.table.renderRows();

        this.snackBar.open('Projeto cadastrado com sucesso!', 'Fechar', {
          duration: 5000,
        });
      },
    });
  }

  openEditDialog(project: Project) {
    const dialogData: DialogFormProjectData = {
      title: 'Edição de projeto',
      txtBtnSubmit: 'Salvar',
      project: project,
    };
    const dialogRef = this.dialog.open(DialogFormProjectComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editProject({ id: project.id, ...result });
      }
    });
  }

  editProject(project: Project) {
    this.projectsService.update(project).subscribe({
      next: (res) => {
        const index = this.projects.findIndex((p) => p.id === res.id);
        this.projects[index] = res;
        this.table.renderRows();

        this.snackBar.open('Projeto editado com sucesso!', 'Fechar', {
          duration: 5000,
        });
      },
    });
  }
}
