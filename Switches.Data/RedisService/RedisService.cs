using System;
using System.Collections.Generic;
using StackExchange.Redis;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;

namespace Switches.Data.RedisService
{
    public class RedisService
    {
        private readonly string _redisHost;
        private readonly string _redisPassword;
        private readonly int _redisPort;
        private readonly string _redisConnectionString;
        private ConnectionMultiplexer _redis;

        public RedisService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
            _redisPassword = config["Redis:Password"];
            _redisConnectionString = config["RedisConnectionString"];
        }

        public void Connect()
        {
            //var configString = $"{_redisHost}:{_redisPort}";
            var redisConnectionString = !string.IsNullOrEmpty(_redisConnectionString)?_redisConnectionString:$"{_redisHost}:{_redisPort},connectRetry=5"+(!string.IsNullOrEmpty(_redisPassword) ? $",password={_redisPassword}" : string.Empty);

            _redis = ConnectionMultiplexer.Connect(redisConnectionString);
        }

        public async Task<bool> SetArray(string key, IEnumerable<object> values)
        {
            var db = _redis.GetDatabase(); 
            return db.StringSet(key, JsonConvert.SerializeObject(values));
        }

        public async Task<RedisValue> Get(string key)
        {
            var db = _redis.GetDatabase();
            return db.StringGet(key);
        }

    }
}
