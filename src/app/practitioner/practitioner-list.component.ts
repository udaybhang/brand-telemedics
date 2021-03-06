import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { PractionerService } from "../services/practioner.service";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface MyFilter {
  position: string[];
  name: string;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-practitioner-list',
  templateUrl: './practitioner-list.component.html',
  styleUrls: ['./practitioner-list.component.css']
})
export class PractitionerListComponent implements AfterViewInit, OnInit {
  constructor(private pracServ: PractionerService) {

  }
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  positions: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  filteredValues: MyFilter = { position: [], name: "", weight: "", symbol: "" };

  positionFilter = new FormControl();
  nameFilter = new FormControl();
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  getPractitionerList() {
      this.pracServ.getAllPractitionerList().subscribe(res=> {
          console.log(res)
      })
  }
  ngOnInit() {
    this.getPractitionerList();
    this.positionFilter.valueChanges.subscribe(positionFilterValue => {
      this.filteredValues["position"] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nameFilter.valueChanges.subscribe(nameFilterValue => {
      this.filteredValues["name"] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();

    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  customFilterPredicate() {
    return (data: PeriodicElement, filter: string): boolean => {
      let searchString = JSON.parse(filter) as MyFilter;
      let isPositionAvailable = false;
      if (searchString.position.length) {
        for (const d of searchString.position) {
          if (data.position.toString().trim() == d) {
            isPositionAvailable = true;
          }
        }
      } else {
        isPositionAvailable = true;
      }
      return (
        isPositionAvailable &&
        data.name
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.name.toLowerCase()) !== -1
      );
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
