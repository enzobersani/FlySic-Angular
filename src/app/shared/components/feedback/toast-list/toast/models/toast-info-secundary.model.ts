import { ToastEnum }  from "../enum/toast.enum";
import { ToastModel } from "./toast.model";

export class ToastInfoSecundaryModel extends ToastModel {
    get type(): string { return ToastEnum.InfoSecundary; }
    get icon(): string { return 'info'; }
}