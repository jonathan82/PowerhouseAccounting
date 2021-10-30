CREATE PROCEDURE [dbo].[AccountInsert]
	@accountName varchar(50),
	@accountNumber varchar(50),
	@accountId int output
AS
	insert into Account (AccountName, AccountNumber, CreateDate)
	values (@accountName, @accountNumber, GETDATE())
	set @accountId = SCOPE_IDENTITY()
RETURN 0
