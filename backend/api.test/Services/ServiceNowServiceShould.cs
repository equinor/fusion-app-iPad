using System;
using Api.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace Api.Test.Services
{
    public class ServiceNowServiceShould
    {
        private readonly ServiceNowService _service;

        public ServiceNowServiceShould()
        {
            // Initialize service with null-logger (Mocked logger)
            _service = new ServiceNowService(new Logger<CommonLibraryService>(new NullLoggerFactory()));
        }

        [Fact]
        public void ReturnRitmFromFormJson()
        {
            //TODO: Create actual form to mock service - Waiting for service now integration
            const string Form = "{jsonForm}";
            string ritm = _service.SubmitIpadOrderForm(Form).Result;

            Assert.NotNull(ritm);
            Assert.NotEmpty(ritm);
            Assert.True(ritm.Contains("RITM", StringComparison.OrdinalIgnoreCase));
        }

        [Fact]
        public void ThrowArgumentExceptionFromWrongFormFormat()
        {
            const string Form = "ErrorForm";
            var e = Assert.Throws<AggregateException>(() =>
            {
                _service.SubmitIpadOrderForm(Form).Wait();
            });
            Assert.NotNull(e.InnerException);
            Assert.IsType<ArgumentException>(e.InnerException);
        }
    }
}
