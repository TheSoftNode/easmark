export interface Usage {
    id: number;
    user_email: string;
    credit_usage: number;
    time_of_use: string;
}

export interface Payment {
    id: number;
    user_email: string;
    payments: number;
    time_of_use: string;
}

export interface Balance {
    id: number;
    user_email: string;
    credit_balance: number;
    time_of_use: string;
}

export interface Transaction {
    transaction_type: 'usage' | 'payment';
    amount: number;
    time_of_use: string;
    balance_after: number;
}

export interface CreditUsageResponse {
    total_usage: number;
    usage_history: Usage[];
}
