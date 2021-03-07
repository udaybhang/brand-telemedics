import { Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { environment } from "src/environments/environment";
import { signalRModel } from "src/app/applicationModules/Models/signalR-models/signalR-model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SignalNotificationService {
  // signalReceived = new EventEmitter<any>();
  // connectionEstablished = new EventEmitter<Boolean>();

  private signalReceived = new BehaviorSubject<signalRModel>(null);
  // private connectionEstablished = new BehaviorSubject<boolean>(false);

  baseurl = environment.apiUrl;
  public _hubConnection: HubConnection;
  connectionIsEstablished: boolean = false;

  constructor() {}

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.receivedSignal();
        this.connectionIsEstablished = true;
        console.log("Hub connection started");
        // this.connectionEstablished.next(true);
      })
      .catch((err) => {
        console.log("Error while establishing connection, retrying...");
        setTimeout(function () {
          this.startConnection();
        }, 5000);
      });
  }
  private receivedSignal(): void {
    this._hubConnection.on("notify", (data: any) => {
      this.signalReceived.next(data);
    });
  }


  createConnection( customId: string = "") {
    let url = this.baseurl + "mvrsignal";
    if (customId) {
      url = url + "?customId=" + customId ;
    }

    this._hubConnection = new HubConnectionBuilder().withUrl(url).build();
    this.startConnection();
  }

  subscribeToSignal(): Observable<signalRModel> {
    return this.signalReceived.asObservable();
  }

  clearSignal() {
    this.signalReceived.next(null);
  }
}
