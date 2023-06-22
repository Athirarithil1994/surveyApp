import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private _storage: Storage | null = null;
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  constructor(private storage: Storage) { 
    this.init();
  }

  public saveToStorage(payload:any) {
    console.log(payload )
    this._storage?.set('userData', JSON.stringify(payload));
  }

  async getDataFromStorage(key: string) {
    if(!this._storage)
        await this.init() ;
    return await this._storage?.get(key) ;
}
}
