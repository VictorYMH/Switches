# Switches

Check out here: https://switches.azurewebsites.net

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
