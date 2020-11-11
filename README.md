# Switches

A Sample for Azure App Service multi-container using Docker Compose

Front-end: Angular
Back-end: .NET Core, Redis

Check out here: https://switches.azurewebsites.net

Check out for information about this project: http://v1ctoryu.com/azure-app-service-multi-container/

Try this if page only shows title
```cURL
curl --location --request POST 'switches.azurewebsites.net/switch' \
--header 'Content-Type: application/json' \
--data-raw '[
    true,
    false,
    true,
    false,
    true
]'
```
