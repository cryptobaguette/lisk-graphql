export const resolver = {
  Transaction: {
    timestampRaw: (row: any) => row.timestamp,
    amountRaw: (row: any) => row.amount,
  },
};
