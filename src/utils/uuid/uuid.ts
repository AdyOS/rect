class UUID {
  static instance: UUID;
  static uuid: number = 0;

  public static getInstance(): UUID {
    if (!UUID.instance) {
      UUID.instance = new UUID();
    }
    return UUID.instance;
  }

  public getUUID() {
    return UUID.uuid++;
  }
}

export default UUID;