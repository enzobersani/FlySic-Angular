import { ToastEnum }  from "../enum/toast.enum";
import { ToastModel } from "./toast.model";

export class ToastErrorModel extends ToastModel {
    get type(): string { return ToastEnum.Error; }
    get icon(): string { return 'warning'; }
}