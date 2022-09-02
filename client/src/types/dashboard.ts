interface IDashboard {
  averagePerGuest: number;
  paidGuests: {
    current: number;
    max: number;
  };
  totalAmount: number;
  amountDistribution: Array<{
    amount: number;
    count: number
  }>
}
export default IDashboard;
