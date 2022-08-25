import UUID from "../uuid";

describe("UUID", () => {
  it("should have the same instance properties on each creation", () => {
    const instance = UUID.getInstance();
    const newInstance = UUID.getInstance();

    expect(instance === newInstance).toBe(true);
  });

  it("should return uniq value for each instance", () => {
    const instance = new UUID();
    const newInstance = new UUID();

    expect(instance.getUUID()).toEqual(0);
    expect(newInstance.getUUID()).toEqual(1);
  });
});
