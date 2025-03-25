type Transaction = { amount: string; type: "credit" | "debit" };

function calculateTotalAmount(
    user: { transactions?: Transaction[] },
    filterType: "credit" | "debit" | "total" = "total"
): number {
    return user?.transactions
        ?.filter(transaction => filterType === "total" || transaction.type === filterType)
        .reduce((total, transaction) => total + Number(transaction.amount), 0) || 0;
}
export default calculateTotalAmount