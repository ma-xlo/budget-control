import { getMonthName } from "../../utils/helpers";

describe("Get month name", () => {
  test("Provide '2024-10-14T12:45:30Z' to return 'Outubro'", () => {
    expect(getMonthName('2024-10-14T12:45:30Z')).toBe('Outubro');
  });
});


describe("Get month name", () => {
    test("Provide '2024-11-14T12:45:30Z' to return 'Novembro'", () => {
      expect(getMonthName('2024-11-14T12:45:30Z')).toBe('Novembro');
    });
  });
  
