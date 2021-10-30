using System;
using System.Collections.Generic;
using System.Text;

namespace PowerhouseAccounting.Business.Dtos
{
    public class AccountTransactionDto
    {      
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public decimal BalanceAfter { get; set; }
    }
}
