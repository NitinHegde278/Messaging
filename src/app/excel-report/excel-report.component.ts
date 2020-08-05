import { ToasterService } from 'angular2-toaster';
import { ExcelReportService } from './excel-report.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-excel-report',
  templateUrl: './excel-report.component.html',
  styleUrls: ['./excel-report.component.css']
})
export class ExcelReportComponent implements OnInit {
  displayedColumns: string[] = ['position', 'org', 'name', 'file', 'date', 'records'];
  dataSource: any;
  data = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(@Inject(ExcelReportService) private service: ExcelReportService,
  private toasterService: ToasterService) { }

  ngOnInit(): void {
    let payload = {};
    this.service.getExcelReport(payload).subscribe(response => {
      this.data = response;
      console.log(this.data);
      this.data.forEach(obj =>{
        let date = new Date(obj.date);
        obj.date = date.toLocaleDateString();
      });
      this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = this.data;
    },
    error =>{
      this.toasterService.pop(
        "error",
        "Check Internet connectivity",
        "Couldn't Fetch the data")
    });
  }

}
