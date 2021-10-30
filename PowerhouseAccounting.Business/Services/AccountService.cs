using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PowerhouseAccounting.Business.Dtos;
using PowerhouseAccounting.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PowerhouseAccounting.Business.Services
{
    public class AccountService
    {
        private readonly PowerhouseAccountingDbContext _db;
        private static Random _random = new Random();

        public AccountService(PowerhouseAccountingDbContext db)
        {
            _db = db;
        }
        
        /// <summary>
        /// Creates a new account and returns the ID of that account. Initial balance is zero
        /// </summary>
        //public int Create(string accountName)
        //{
        //    var accountNumber = GenerateAccountNumber();
        //    var accountNameParam = new SqlParameter("accountName", accountName);
        //    var accountNumberParam = new SqlParameter("accountNumber", accountNumber);
        //    var accountIdParam = new SqlParameter
        //    {
        //        ParameterName = "accountId",
        //        SqlDbType = System.Data.SqlDbType.Int,
        //        Direction = System.Data.ParameterDirection.Output
        //    };
        //    _db.Database.ExecuteSqlRaw("exec AccountInsert @accountName, @accountNumber, @accountId output", accountNameParam, accountNumberParam, accountIdParam);
        //    return (int)accountIdParam.Value;
        //}

        public int Save(AccountInputDto input)
        {
            if (string.IsNullOrEmpty(input.AccountName))
            {
                throw new BusinessException("Account Name cannot be empty");
            }

            var accountNameParam = new SqlParameter("accountName", input.AccountName);
            int newId;

            if (input.Id == null)
            {
                // new account
                var accountNumber = GenerateAccountNumber();
                var accountNumberParam = new SqlParameter("accountNumber", accountNumber);
                var accountIdParam = new SqlParameter
                {
                    ParameterName = "accountId",
                    SqlDbType = System.Data.SqlDbType.Int,
                    Direction = System.Data.ParameterDirection.Output
                };
                _db.Database.ExecuteSqlRaw("exec AccountInsert @accountName, @accountNumber, @accountId output", accountNameParam, accountNumberParam, accountIdParam);
                newId = (int)accountIdParam.Value;
            } 
            else
            {
                // update existing account
                var accountIdParam = new SqlParameter("id", input.Id);
                _db.Database.ExecuteSqlRaw("exec AccountUpdate @id, @accountName", accountIdParam, accountNameParam);
                newId = (int)input.Id;
            }
            return newId;
        }

        /// <summary>
        /// Deposit(+) or Withdraw(-) money from the account.  If balance goes below zero error is thrown.
        /// Returns the balance after the transaction
        /// </summary>
        public decimal DepositWithdraw(int accountId, decimal amount)
        {
            var accountIdParam = new SqlParameter("id", accountId);
            var amountParam = new SqlParameter("amount", amount);
            var balanceAfterParam = new SqlParameter
            {
                ParameterName = "balanceAfter",
                SqlDbType = System.Data.SqlDbType.Money,
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                _db.Database.ExecuteSqlRaw("exec AccountDepositWithdraw @id, @amount, @balanceAfter output", accountIdParam, amountParam, balanceAfterParam);
            }
            catch (SqlException ex)
            {
                if (ex.Number==51000)
                {
                    throw new BusinessException("Account Balance cannot be less than 0");
                }
                throw;
            }            
            return (decimal)balanceAfterParam.Value;
        }

        public IEnumerable<AccountDto> List()
        {
            return _db.Accounts.Select(x => new AccountDto
            {
                Id = x.Id,
                AccountName = x.AccountName,
                AccountNumber = x.AccountNumber,
                Balance = x.Balance
            });
        }

        public AccountDto Find(int id)
        {
            var acct = _db.Accounts.Find(id);
            return acct == null ? null : new AccountDto
            {
                Id = acct.Id,
                AccountNumber = acct.AccountNumber,
                AccountName = acct.AccountName,
                Balance = acct.Balance
            };
        }

        public IEnumerable<AccountTransactionDto> ListTransactions(int id)
        {
            return _db.AccountTransactions
                .Where(x => x.AccountId == id)
                .OrderByDescending(x => x.TransactionDate)
                .Select(x => new AccountTransactionDto
            {
                Id = x.Id,
                TransactionDate = x.TransactionDate,
                Amount = x.Amount,
                BalanceAfter = x.BalanceAfter
            });
        }

        private string GenerateAccountNumber()
        {
            //generate a random 10-digit string
            string digits = "0123456789";
            var sb = new StringBuilder();
            for (int i = 0; i < 10; i++)
            {
                sb.Append(digits[_random.Next(0, 10)]);
            }
            return sb.ToString();
        }
    }
}
