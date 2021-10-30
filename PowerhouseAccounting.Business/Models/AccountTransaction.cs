using System;
using System.Collections.Generic;

#nullable disable

namespace PowerhouseAccounting.Business.Models
{
    public partial class AccountTransaction
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal BalanceAfter { get; set; }

        public virtual Account Account { get; set; }
    }
}
