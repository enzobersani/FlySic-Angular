declare global {
  interface Crypto {
    randomUUID(): string;
  }
}

export abstract class ToastModel {
    public id = crypto.randomUUID();
    abstract get type(): string;
    abstract get icon(): string;
    constructor(public title: string = "", public message: string = "", public time: string = "") { }
}
