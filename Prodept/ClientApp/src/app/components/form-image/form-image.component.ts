import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { FormImage } from 'src/app/models/detail-data';
import { ProjectService } from 'src/app/services/project.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-image',
  templateUrl: './form-image.component.html',
  styleUrls: ['./form-image.component.scss']
})
export class FormImageComponent implements OnInit {
  @Input() data: FormImage;
  gambar: any;
  constructor(private _projectService: ProjectService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    this._projectService.getImageData(this.data.link, this.data.fileName).subscribe(result => {
      const objectURL = URL.createObjectURL(result);
      this.gambar = this._sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

}
