using Microsoft.AspNetCore.SignalR;
using PowerhouseAccounting.Business;
using PowerhouseAccounting.Business.Dtos;
using PowerhouseAccounting.Business.Services;
using System.Collections.Generic;
using System.Linq;

namespace PowerhouseAccounting.API.Hubs
{
    public class AccountHub : Hub
    {
        private readonly AccountService _accountSvc;

        public AccountHub(AccountService acctSvc)
        {
            _accountSvc = acctSvc;
        }

        public List<AccountDto> ListAccounts()
        {
            return _accountSvc.List().ToList();
        }

        public AccountDto FindAccount(int id)
        {
            return _accountSvc.Find(id);
        }

        public List<AccountTransactionDto> ListTransactions(int id)
        {
            return _accountSvc.ListTransactions(id).ToList();
        }

        public int SaveAccount(AccountInputDto input)
        {
            int savedId = 0;
            try
            {
                savedId = _accountSvc.Save(input);
                Clients.All.SendAsync("NotifyChange");
                Clients.Caller.SendAsync("NotifySuccess", "Successfully saved account information");
            }
            catch (BusinessException ex)
            {
                // notify error
                Clients.Caller.SendAsync("NotifyError", ex.Message);
            }
            return savedId;
        }

        public void ExecuteTransaction(int accountId, decimal amount)
        {
            try
            {
                _accountSvc.DepositWithdraw(accountId, amount);
                Clients.All.SendAsync("NotifyChange");
                Clients.Caller.SendAsync("NotifySuccess", "Successfully executed account transaction");
            }
            catch (BusinessException ex)
            {
                // notify client of error
                Clients.Caller.SendAsync("NotifyError", ex.Message);
            }            
        }
    }
}
