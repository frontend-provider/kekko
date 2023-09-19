
[OpenSSL](https://github.com/openssl/openssl)
#### ssl-certificate

```
sudo apt install openssl
```

```
openssl req -x509 -newkey rsa:4096 -nodes -out ssl/cert.pem -keyout ssl/key.pem -days 365
```
