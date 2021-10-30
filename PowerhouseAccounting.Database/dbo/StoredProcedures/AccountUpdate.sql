CREATE PROCEDURE [dbo].[AccountUpdate]
	@id int,
	@accountName varchar(50)
AS
	update Account set AccountName = @accountName where Id = @id
RETURN 0
