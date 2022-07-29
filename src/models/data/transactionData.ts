import { TransactionNameAmountData } from "./transactionNameAmountData";

export type TransactionData = {
    id: string,
    title: string,
    amount: number,
    payers: TransactionNameAmountData[],
    expenses: TransactionNameAmountData[],
    created_at: Date,
    last_updated: Date
}