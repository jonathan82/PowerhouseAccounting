using System;
using System.Collections.Generic;
using System.Text;

namespace PowerhouseAccounting.Business
{
    public class BusinessException : Exception
    {
        public List<string> Messages { get; set; } = new List<string>();

        public BusinessException(string errMsg)
        {
            Messages.Add(errMsg);
        }
    }
}
