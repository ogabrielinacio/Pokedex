import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  private stateData: any;
  private stateListData: any;

  constructor() { }


  setState(key: string, data: any, islist: boolean ) {
    if(islist){
      this.stateListData =  data;
    }else{
      this.stateData = data;
    }
    localStorage.setItem(key, JSON.stringify(data)); 
  }

  getState(key: string, islist: boolean) {
    if (!this.stateData) {
      const savedState = localStorage.getItem(key);
      this.stateData = savedState ? JSON.parse(savedState) : null;
    }
    if(islist){
      return this.stateListData;
    }else{
      return this.stateData;
    }
  }

  clearState(key: string) {
    this.stateData = null;
    localStorage.removeItem(key);
  }
}
