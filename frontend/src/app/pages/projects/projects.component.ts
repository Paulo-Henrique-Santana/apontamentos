import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { DialogDeleteProjectComponent } from '../../components/dialog-delete-project/dialog-delete-project.component';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  imports: [MatTableModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projectsService = inject(ProjectsService);
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
}
