import { ToastEnum }  from "../enum/toast.enum";
import { ToastModel } from "./toast.model";

export class ToastWarnModel extends ToastModel {
    get type(): string { return ToastEnum.Warn; }
    get icon(): string { return 'warning'; }
}