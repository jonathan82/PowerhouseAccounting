CREATE PROCEDURE [dbo].[AccountDepositWithdraw]
	@id int,
	@amount money,
	@balanceAfter money output
AS
begin transaction
	set @balanceAfter = (select balance from Account where Id = @id) + @amount
	if @balanceAfter < 0
	begin;
		throw 51000, 'Account balance cannot be less than 0', 1
	end
	update Account set Balance = @balanceAfter where Id = @id
	insert into AccountTransaction (AccountId, Amount, TransactionDate, BalanceAfter)
	values (@id, @amount, GETDATE(), @balanceAfter)
commit
RETURN 0
