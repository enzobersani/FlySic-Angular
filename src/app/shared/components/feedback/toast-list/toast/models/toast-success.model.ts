import { ToastEnum }  from "../enum/toast.enum";
import { ToastModel } from "./toast.model";

export class ToastSuccessModel extends ToastModel {
    get type(): string { return ToastEnum.Success; }
    get icon(): string { return 'check_circle'; }
}