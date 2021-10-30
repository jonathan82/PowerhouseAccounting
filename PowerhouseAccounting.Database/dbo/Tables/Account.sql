CREATE TABLE [dbo].[Account] (
    [Id]      INT          IDENTITY (1, 1) NOT NULL,
    [AccountName]    VARCHAR (50) NOT NULL,
    [AccountNumber]  VARCHAR (50) NOT NULL UNIQUE,
    [Balance] MONEY        NOT NULL DEFAULT 0,
    [CreateDate] DATETIME NOT NULL, 
    CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED ([Id] ASC)
);

