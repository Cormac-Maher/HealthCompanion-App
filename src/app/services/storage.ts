import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.storage.create();
  }

  async save(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async load(key: string) {
    return await this.storage.get(key);
  }

}
