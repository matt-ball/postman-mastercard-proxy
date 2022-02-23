# postman-mastercard-proxy

This proxy is designed to support making calls to Mastercard APIs requiring payload encryption via Postman.

## Local Setup

Clone this repo.

`npm i`

Setup config.json with the appropriate configuration object:
https://github.com/Mastercard/client-encryption-nodejs/wiki/Configuration-Object

Some prebuilt configs are available:
https://github.com/Mastercard/client-encryption-nodejs/wiki/Service-Configurations-for-Client-Encryption-NodeJS

Then:

`node index.js`

## Postman Setup

Set your Body to `raw`, type `json` and have the contents as just:

```
{{body}}
```

In the Pre-Request Script, we will facilitate the call to our local payload encryption service:

```
const resource = '/addAccount'

const body = {
  "requestId": "123456",
  "encryptedPayload": {
    "encryptedData": {
      "cardInfo": {
        "accountNumber": "5123456789012345",
        "expiryMonth": "12",
        "expiryYear": "25",
        "panSequenceNumber": "01"
      }
    }
  },
  "reasonCode": "INITIAL_LOAD"
};

/*********************/
/* Do not edit below */
/*********************/

pm.sendRequest({
  url: 'localhost:8080/',
  method: 'POST',
  header: {
    'Content-Type': 'application/json',
    'Resource': resource
  },
  body: {
    mode: 'raw',
    raw: body
  }
}, (err, res) => {
  if (!err) {
    pm.variables.set('body', res.text());
  }
})
```

This should be relatively straight-forward. Update the `body` and `resource` variables to provide the body you want to encrypt and the endpoint/resource you are trying to reach.

The above is an example of hitting the PAM addAccount endpoint:
https://developer.mastercard.com/payment-account-management/documentation/api-reference/#add-account