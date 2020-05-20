using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Switches.Data.RedisService;

namespace Switches.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SwitchController : ControllerBase
    {

        private readonly ILogger<SwitchController> _logger;
        private readonly RedisService _redisService;
        private readonly string _switchKey="Switches";

        public SwitchController(ILogger<SwitchController> logger, RedisService redisService)
        {
            _logger = logger;
            _redisService = redisService; 
        }

        [HttpGet]
        public async Task<string> Get()
        {
            return await _redisService.Get(_switchKey);
        }

        [HttpPost]
        public async Task<bool> POST(IEnumerable<object> statuses)
        {
            return await _redisService.SetArray(_switchKey, statuses);
        }
    }
}
