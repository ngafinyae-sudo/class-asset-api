import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private apiUrl = 'http://localhost/class-asset-api/api.php';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addAsset(asset: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, asset);
  }

  updateAsset(asset: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, asset);
  }

  deleteAsset(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl, {
      body: { id: id }
    });
  }
}