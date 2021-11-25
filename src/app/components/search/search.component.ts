import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from "../../services/data.service";
import { Municipality } from "../../models/municipality";
import { Unit } from "../../models/unit";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  formGroup!: FormGroup;

  municipalities: Municipality[] = [];
  filteredOptions!: Municipality[];
  units: Unit[] = [Unit.G_CEL, Unit.G_FAH];

  selectedMunicipality: any = "";

  constructor(private dataService: DataService, private fb : FormBuilder) {
  }

  onSelected(item: Municipality) {
    // item.id = item.id.replace("id", "");
    this.selectedMunicipality = item;
  }

  displayFn(municilapity: Municipality): string {
    return municilapity && municilapity.name ? municilapity.name : '';
  }

  clearSelection() {
    this.selectedMunicipality = "";
    this.filteredOptions = [];
  }

  ngOnInit(): void {
    this.initForm();
    this.getMunicipalities();
  }

  private initForm(){
    this.formGroup = this.fb.group({
      municipality : ['', [Validators.required, Validators.minLength(1)]]
    }, );
    this.formGroup.get('municipality')?.valueChanges.subscribe(response => {
      this._filter(typeof(response) === 'string' ? response : response.name);
    });
  }

  private _filter(enteredData: string){
    this.filteredOptions = this.municipalities.filter(item => {
      return item.name.toLocaleLowerCase().includes(enteredData.toLocaleLowerCase())
    })
  }

  private getMunicipalities(){
    this.dataService.getMunicipalities().subscribe(response => {
      this.municipalities = response;
      this.filteredOptions = response;
    })
  }
}
