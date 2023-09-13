export const taxCalculate = (
  price: number, 
  freight: number = 0, 
  hasDispatchFee: boolean = false,
  isPRC: boolean = false,
  currency: number = 1
): string | Error => {
  try {
    const icms = 1 - 0.17;
    const ii = 1.60;
    const dispatchFee = hasDispatchFee ? 15 : 0;
    
    if ((price + freight) <= 50 && isPRC) {
      return (((price + freight) / icms) + (dispatchFee / currency)).toFixed(2).replace(".", ",");
    }

    return (((price + freight) * ii / icms) + dispatchFee / currency).toFixed(2).replace(".", ",");
  } catch (error) {
    return new Error((error as Error).message);
  }
}

export const api: Promise<Response> = fetch("https://economia.awesomeapi.com.br/last/USD-BRL");

export const verifyDate = (timestamp: number): boolean => {
  const storage = new Date(timestamp);
  const now = new Date();

  return storage < now;
}

export const addOneHour = (created: Date): Date => {
  const date = new Date(created);

  date.setHours(created.getHours() + 1);

  return date;
}