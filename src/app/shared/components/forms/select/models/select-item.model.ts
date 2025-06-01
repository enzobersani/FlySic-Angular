export class SelectItemModel {
    public key!: number | string;
    public description!: string;

    constructor(key: number | string, description: string) {
        this.key = key;
        this.description = description;
    }
}