import { Component, OnInit, Input } from '@angular/core';
import { FormFile } from 'src/app/models/detail-data';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-form-file',
  templateUrl: './form-file.component.html',
  styleUrls: ['./form-file.component.scss'],
})
export class FormFileComponent implements OnInit {
  @Input() data: FormFile;

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {}

  download(namafile: string, link: string, type: string) {
    this._projectService.getFileData(link, type, namafile).subscribe((data) => {
      const downloadURL = window.URL.createObjectURL(data);
      const alink = document.createElement('a');
      alink.href = downloadURL;
      alink.download =  namafile;
      alink.click();
    });

  }
}
