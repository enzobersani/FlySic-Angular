import { RangeDateModel } from "./range-date.model";

describe('RangeDateModel', () => {
    let model: RangeDateModel;

    beforeEach(() => {
        model = new RangeDateModel();
    });

    it('should be created', () => {
        expect(model).toBeTruthy();
    });

    it('should create complete empty instace', () => {

        // Arrange


        // Act
        var result = RangeDateModel.createCompleteInstace();

        // Assert
        expect(result.source).toEqual(0);
        expect(result.instanceId).toBeUndefined();
        expect(result.dates?.initialDate).toBeNull();
        expect(result.dates?.finalDate).toBeNull();

    });

});
