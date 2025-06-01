import { SidebarLinkModel } from "../sidebar-link/models/sidebar-link.model";

export class SidebarItemModel extends SidebarLinkModel {
    isOpen: boolean = false;
    submenus: SidebarLinkModel[] = []
}