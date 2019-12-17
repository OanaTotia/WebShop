import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import {Game} from './game'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

var URL = 'http://localhost:3000';
@Injectable()
export class GameService {
    constructor( private http: Http){}

addGame( name: string, description: string, urlImage: string, unitPrice: number, stock: number, averageRating: number){
        let body = 'name='+name+"&description="+description+"&urlImage="+urlImage+"&unitPrice="+unitPrice+"&stock="+stock+"&averageRating="+averageRating+'';
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(URL+'/games', body, {headers: headers})
        .subscribe(data => {console.log("it worked!")});
    
}
getGames() {
      return this.http.get(URL+'/games').map((res:Response) => res.json())
}
  
deleteGame(id: string){
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.delete(URL+'/games/'+id, {headers: headers})
    .subscribe(data => {console.log("it worked! " +id)});
    
}
getGame(id: string) {
      return this.http.get(URL+'/games/'+id).map((res:Response) => res.json())
}

update(id: string, name: string, description: string, urlImage: string, unitPrice: number, stock: number, averageRating: number ){

      let body = 'name='+name+"&description="+description+"&urlImage="+urlImage+"&unitPrice="+unitPrice+"&stock="+stock+"&averageRating="+averageRating+'';
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.put(URL+'/games/'+id, body, {headers: headers})
      .subscribe(data => {console.log("it worked!"+name)});
}
  

     private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
     let errMsg: string;
     if (error instanceof Response) {
       const body = error.json() || '';
       const err = body.error || JSON.stringify(body);
       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
     } else {
       errMsg = error.message ? error.message : error.toString();
     }
     console.error(errMsg);
     return Observable.throw(errMsg);
   }

}
