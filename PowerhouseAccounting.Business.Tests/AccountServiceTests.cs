using Microsoft.Data.SqlClient;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PowerhouseAccounting.Business.Dtos;
using PowerhouseAccounting.Business.Services;
using System;
using System.Text;

namespace PowerhouseAccounting.Business.Tests
{       
    [TestClass]
    public class AccountServiceTests
    {
        private static Random _random = new Random();

        [TestMethod]
        public void CreateAccount_Exists()
        {
            // arrange
            var svc = new AccountService(new PowerhouseAccountingDbContext());

            // act 
            int id = svc.Save(new AccountInputDto { 
                AccountName = GenerateRandomString(8) 
            });
            var newAccount = svc.Find(id);

            // assert
            Assert.IsNotNull(newAccount);
        }

        [TestMethod]
        public void CreateAccount_Balance_IsZero()
        {
            // arrange
            var svc = new AccountService(new PowerhouseAccountingDbContext());

            // act 
            int id = svc.Save(new AccountInputDto {
                AccountName = GenerateRandomString(8)
            });
            var newAccount = svc.Find(id);

            // assert
            Assert.AreEqual(0, newAccount.Balance);
        }

        [TestMethod]
        public void Deposit_Correct_Amount()
        {
            const decimal amountToDeposit = 100;

            // arrange
            var svc = new AccountService(new PowerhouseAccountingDbContext());
            int id = svc.Save(new AccountInputDto
            {
                AccountName = GenerateRandomString(8)
            });
            var newAccount = svc.Find(id);

            // act
            decimal balanceAfter = svc.DepositWithdraw(id, amountToDeposit);

            // assert
            Assert.AreEqual(newAccount.Balance + amountToDeposit, balanceAfter);
        }

        [TestMethod]
        public void Withdraw_MoreThanBalance_Throws()
        {
            const decimal amountToWithdraw = -100;

            // arrange
            var svc = new AccountService(new PowerhouseAccountingDbContext());
            int accountId = svc.Save(new AccountInputDto
            {
                AccountName = GenerateRandomString(8)
            });

            // act - current balance should be 0
            Assert.ThrowsException<SqlException>(() => svc.DepositWithdraw(accountId, amountToWithdraw));
        }

        private string GenerateRandomString(int length)
        {
            var sb = new StringBuilder();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (int i = 0; i < length; i++)
            {
                sb.Append(chars[_random.Next(0, chars.Length)]);
            }
            return sb.ToString();
        }
    }
}
