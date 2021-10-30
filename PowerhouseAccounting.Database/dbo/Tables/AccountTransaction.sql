CREATE TABLE [dbo].[AccountTransaction]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [AccountId] INT NOT NULL, 
    [Amount] MONEY NOT NULL, 
    [TransactionDate] DATETIME NOT NULL, 
    [BalanceAfter] MONEY NOT NULL, 
    CONSTRAINT [FK_AccountTransaction_Account] FOREIGN KEY ([AccountId]) REFERENCES [Account]([Id])
)
