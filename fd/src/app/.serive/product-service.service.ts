import { Injectable } from '@angular/core';

export interface worklog {
  date:String,
  taskid: number;
  location: string;
  category: string;
  workerCount: number;
  status: boolean;
  workerDetails: string[];
  remarks: string;
}

export interface options {
  name: string
}

export interface Cardinfo{

  location:string;
  completed:number;
  pending:number;
}



export interface type {
  label: string,
  value: string
}
export interface optionData {
  id: number,
  option: string[]
}

export interface details {

  name: string;
  staffid: number;
  status: boolean;
  phone: number;
  gender: string;
  skill: string[]
}

export interface StaffDetails {
  name: string,
  phone: number,
  skill: string[],
  gender: string
}


@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {

  private Olocation: options[] =[
{ name: 'AS' },
{ name: 'SF' },
{ name: 'IB' },
{ name: 'Boys hostel' },
{ name: 'Girls Hostel' },
{ name: 'Quateras' }
]

private Otype: options[] =[
  { name: 'Mason' },
  { name: 'Welding' },
  { name: 'Painting' },
  { name: 'wiring' },
  { name: 'plumbing' },
  { name: 'Carter' }
  ]

  // private card:Cardinfo[]=[
  //   {location:'as',pending:5,completed:10},
  //   {location:'mech',pending:3,completed:7},
  //   {location:'qt',pending:4,completed:14},
  //   {location:'gh',pending:5,completed:2},
  //   {location:'bh',pending:1,completed:20},
  //   {location:'sf',pending:1,completed:1},
  //   {location:'ib',pending:0,completed:0},
  // ]

  

  private Category: any[] = [
  { label: 'Mason', value: 'Mason' },
  { label: 'Welding', value: 'Welding' },
  { label: 'Wiring', value: 'Wiring' },
  { label: 'Painting', value: 'Painting' },
  { label: 'Plumbing', value: 'Plumbing' },
];


getCate(): type[] {
  return this.Category;
}

// getcardinfo():Cardinfo[]{
//   return this.card;
// }

getOlocation():options[]{
  return this.Olocation
}
getOtype():options[]{
  return this.Otype
}



}