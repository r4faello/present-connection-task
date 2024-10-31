﻿using static System.Runtime.InteropServices.JavaScript.JSType;

namespace LibraryApp.Common
{
    public class Result
    {
        public bool IsSuccess { get; }
        public string Message { get; }

        public Result(bool isSuccess, string message)
        {
            IsSuccess = isSuccess;
            Message = message;
        }


        public static Result Failure(string message)
        {
            return new Result(false, message);
        }

        public static Result Success()
        {
            return new Result(true, string.Empty);
        }
    }
}
