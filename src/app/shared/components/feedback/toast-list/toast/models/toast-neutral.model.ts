import { ToastEnum }  from "../enum/toast.enum";
import { ToastModel } from "./toast.model";

export class ToastNeutralModel extends ToastModel {
    get type(): string { return ToastEnum.Neutral; }
    get icon(): string { return 'info'; }
}