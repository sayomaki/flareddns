/*
  ------------------------------------------------------
           FlareDDNS - Cloudflare DDNS Client
   Made by willi123yao(https://github.com/willi123yao)
  ------------------------------------------------------
*/

// == Required Libraries ==
const request = require('request');
const fs = require('fs');
const ip = require('ip');

// == Load config ==
try {
  var config = JSON.parse(fs.readFileSync('./config.json'));
}
catch (e) {
  console.log(`File 'config.json' not found or corrupted! Exiting...`);
  process.exit(0);
}

console.log(`------------------------------------------------------
         FlareDDNS - Cloudflare DDNS Client
 Made by willi123yao(https://github.com/willi123yao)
------------------------------------------------------`);


// == Preflight Checks ==
try {
  if (config.zone_id == "" || config.zone_id=== undefined) {
    console.log(`Config value 'zone_id' cannot be blank! Exiting...`);
    process.exit(0);
  }
  if (config.dns_id == "" || config.dns_id === undefined) {
    console.log(`Config value 'dns_id' cannot be blank! Exiting...`);
    process.exit(0);
  }
  if (config.dns_name == "" || config.dns_name === undefined) {
    console.log(`Config value 'dns_name' cannot be blank! Exiting...`);
    process.exit(0);
  }
  if (config.api_email == "" || config.api_email === undefined) {
    console.log(`Config value 'api_email' cannot be blank! Exiting...`);
    process.exit(0);
  }
  if (config.api_key == "" || config.api_key === undefined) {
    console.log(`Config value 'api_key' cannot be blank! Exiting...`);
    process.exit(0);
  }
}
catch (e) {
  console.log(`Corrupted 'config.json' file! Exiting...`);
  process.exit(0);
}

// == Main Code ==
let ipaddr = ip.address();
let data = {"type":"A","name":config.dns_name,"content":ipaddr,"ttl":1,"proxied":false};
let url = 'https://api.cloudflare.com/client/v4/zones/'+config.zone_id+'/dns_records/'+config.dns_id;
request({
    url: url,
    method: 'PUT',
    json: data,
    headers: {
      'X-Auth-Email': config.api_email,
      'X-Auth-Key': config.api_key
    },
  }, function(error, res, body) {
  console.log(body);
});
