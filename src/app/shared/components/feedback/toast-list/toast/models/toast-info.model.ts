import { ToastEnum }  from "../enum/toast.enum";
import { ToastModel } from "./toast.model";

export class ToastInfoModel extends ToastModel {
    get type(): string { return ToastEnum.Info; }
    get icon(): string { return 'info'; }
}