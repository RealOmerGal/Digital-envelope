interface IDashboard {
  averagePerGuest: {
    avg: number;
    comparedToSimilar: number;
  };
  paidGuests: {
    current: number;
    max: number;
  };
  totalAmount: string;
  amountDistribution: Array<{
    amount: number;
    count: number
  }>
}
export default IDashboard;
