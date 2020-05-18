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
        private ConnectionMultiplexer _redis;

        public RedisService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
            _redisPassword = config["Redis:Password"];
        }

        public void Connect()
        {
            //var configString = $"{_redisHost}:{_redisPort}";
            var configString = $"{_redisHost}:{_redisPort},password={_redisPassword},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);
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
