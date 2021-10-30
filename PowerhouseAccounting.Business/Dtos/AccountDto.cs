using System;
using System.Collections.Generic;
using System.Text;

namespace PowerhouseAccounting.Business.Dtos
{
    public class AccountDto
    {
        public int? Id { get; set; }
        public string AccountName { get; set; }
        public string AccountNumber { get; set; }
        public decimal Balance { get; set; }
    }
}
