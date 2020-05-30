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
        private readonly string _redisConnectionString;
        private ConnectionMultiplexer _redis;

        public RedisService(IConfiguration config)
        {
            _redisConnectionString = config["RedisConnectionString"];
        }

        public void Connect()
        {
            //var configString = $"{_redisHost}:{_redisPort}";
            _redis = ConnectionMultiplexer.Connect(_redisConnectionString);
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
