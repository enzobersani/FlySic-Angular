import { SelectItemModel } from "../../../../shared/components/forms/select/models/select-item.model";

export const FlightFormStatusOptions: SelectItemModel[] = [
    new SelectItemModel(1, 'Aberta'),
    new SelectItemModel(2, 'Fechada'),
    new SelectItemModel(3, 'Cancelada'),
    new SelectItemModel(4, 'Expirada'),
    new SelectItemModel(5, 'Concluída'),
];