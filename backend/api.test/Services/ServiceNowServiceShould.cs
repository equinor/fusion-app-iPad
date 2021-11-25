using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using api.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace api.test.Services
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
            const string form = "{jsonForm}";
            string ritm = _service.SubmitIpadOrderForm(form).Result;

            Assert.NotNull(ritm);
            Assert.NotEmpty(ritm);
            Assert.True(ritm.Contains("RITM", StringComparison.OrdinalIgnoreCase));
        }

        [Fact]
        public void ThrowArgumentExceptionFromWrongFormFormat()
        {
            const string form = "ErrorForm";
            AggregateException e = Assert.Throws<AggregateException>(() =>
            {
                _service.SubmitIpadOrderForm(form).Wait();
            });
            Assert.NotNull(e.InnerException);
            Assert.IsType<ArgumentException>(e.InnerException);
        }
    }
}
