import { RECIEVERS, MSGTYPE } from '../constants/datatypes';


export class MessageItem <T> {
  private _reciever: RECIEVERS;
  private _msgType: MSGTYPE;
  private _payload: any;

  constructor(recv: RECIEVERS, type: MSGTYPE, data: T) {
    this._reciever = recv;
    this._msgType = type;
    this._payload = data;
  }

  public set reciever(type: RECIEVERS) {
    this._reciever = type;
  }

  public get reciever() {
    return this._reciever;
  }

  public set msgtype(type: MSGTYPE) {
    this._msgType = type;
  }

  public get msgtype() {
    return this._msgType;
  }

  public set payload(data: any) {
    this._payload = data;
  }

  public get payload(): any {
    return this._payload;
  }
}