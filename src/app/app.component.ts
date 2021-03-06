import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DataModel } from './data/data.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: Promise<any>; // Array<any>, Observable<DataModel>
  provinceID: string; // number
  csvUrl: string = 'https://health-infobase.canada.ca/src/data/covidLive/covid19.csv';  
  csvUrlWithProxy: string = `https://cors-anywhere.herokuapp.com/${ this.csvUrl }`;
  localCsv: string = './assets/covid19.csv';
  dataLoading: boolean;
  
  constructor( private http: HttpClient ) {
  }

  reformatDateYMD( dmy ): string {
    let newdate = dmy.split("-").reverse().join("-");
    return newdate;
  }

  formatDateDMY( ymd ): string {
    let day = ymd.getDate();
    if( day < 10 ){
      day = '0' + day;
    }

    let month = ymd.getMonth() + 1;
    if( month < 10 ){
      month = '0' + month;
    }

    const year = ymd.getFullYear();
    const newdate = day + '-' + month + '-' + year;
    return newdate;
  }

  filterDataAsWeekly( inputData ): Array<any> {
    // filter out dates so only every 7th
    const dateValuesOnly = inputData.map( d => this.reformatDateYMD(d.date) );
    const dateMin = dateValuesOnly.reduce( function (a, b) { return a<b ? a:b; } ); // Math.min.apply(null, dateValuesOnly)
    const dateMax = dateValuesOnly.reduce( function (a, b) { return a>b ? a:b; } ); // Math.max.apply(null, dateValuesOnly)
    const datesEvery7Days = d3.timeDay.every(7).range( new Date(dateMin), new Date(dateMax) );
    const datesEvery7DaysDMYarray = datesEvery7Days.map( i => this.formatDateDMY(i) );
    
    // works but for es7 only
    // const dataOnlyWithWeeklyDates = data.filter( function(item) {
    //   return datesEvery7DaysDMYarray.includes(item.date); 
    // });
    const dataOnlyWithWeeklyDates = inputData.filter( 
      d => datesEvery7DaysDMYarray.indexOf( d.date ) > 0  // indexOf: if no match return -1, if match return index > 0
    );

    return dataOnlyWithWeeklyDates;
  }
  
  getData(): void {
    const self = this; // 'this' context changes within d3.csv() function
    this.dataLoading = true;
    console.log('AppComponent getData this.dataLoading set to true', this.dataLoading)
    console.log('AppComponent getData this.data before csv()', this.data)

    // using cors-anywhere as a proxy to access the external CSV file
    // d3.csv returns a promise, so needs a return statement inside    
    this.data = d3.csv( this.csvUrlWithProxy ) // this.localCsv
    .then( function (data){
      console.log('AppComponent covid CSV data is', data);  
      console.log('AppComponent TYPE OF CSV DATA', typeof(data) )
              
      // show data of selected province
      console.log('AppComponent csv() self.provinceID', self.provinceID)
      const dataOfProvince = data.filter( d => d.pruid==self.provinceID ); // parseInt(d.pruid)   
      const dataOfProvinceWeekly = self.filterDataAsWeekly( dataOfProvince );
      return dataOfProvinceWeekly;        
    })
    .finally( function (){
      console.log('AppComponent csv() self.data!!!!', self.data)
      self.dataLoading = false;
    });
  }

  /* receive Event Emitter from province-select.component.ts: onChange/this.selected.emit() */
  onSelect( id: string ) {
    this.provinceID = id; // parseInt( id )
    console.log('AppComponent onSelect provinceID', this.provinceID)   

    if( this.provinceID !== '' ){
      this.getData();
    }
  }
}
