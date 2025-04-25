import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  imports: [MatTableModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projectsService = inject(ProjectsService);

  projects: Project[] = [];

  displayedColumns: string[] = ['name', 'actions'];

  ngOnInit(): void {
    this.projectsService.get().subscribe({
      next: (res) => {
        this.projects = res.items;
      },
    });
  }
}
