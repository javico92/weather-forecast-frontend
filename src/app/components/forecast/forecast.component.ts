import {OnInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { DataService } from "../../services/data.service";
import { Probability } from "../../models/probability";
import { Municipality } from "../../models/municipality";
import { Unit, UnitType2LabelMapping } from "../../models/unit";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnChanges {

  @Input() municipality = {} as Municipality;

  columns = [
    { columnDef: 'period', header: 'Period',    cell: (element: any) => `${element.period}` },
    { columnDef: 'probability',     header: 'Probability',   cell: (element: any) => `${element.probability}%`     }
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  dataSource: MatTableDataSource<Probability> = new MatTableDataSource<Probability>();
  temperature!: number;
  unit!: Unit;
  date!: Date;
  UnitType2LabelMapping = UnitType2LabelMapping;

  constructor(private dataService: DataService) { }

  ngOnChanges(changes: SimpleChanges) {

    if(changes["municipality"].currentValue != ""){
      this.getMunicipalityInformation(this.municipality);
    }
  }

  getMunicipalityInformation(identifier: any){
    this.dataService.getMunicipalyInformation(identifier).subscribe(response => {
      this.dataSource = new MatTableDataSource<Probability>(response.rainProbabilitiy);
      this.temperature = response.temperatureAverage;
      this.unit = response.temperatureUnit;
      this.date = response.date;
    })
  }

}
