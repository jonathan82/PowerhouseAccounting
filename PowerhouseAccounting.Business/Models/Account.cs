using System;
using System.Collections.Generic;

#nullable disable

namespace PowerhouseAccounting.Business.Models
{
    public partial class Account
    {
        public Account()
        {
            AccountTransactions = new HashSet<AccountTransaction>();
        }

        public int Id { get; set; }
        public string AccountName { get; set; }
        public string AccountNumber { get; set; }
        public decimal Balance { get; set; }

        public virtual ICollection<AccountTransaction> AccountTransactions { get; set; }
    }
}
