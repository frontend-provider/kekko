
#### WebServer Nginx
[Install](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)

```
server {
listen 80;
listen [::]:80;
server_name 192.168.1.146;
return 301 https://$server_name$request_uri;
}
upstream websocket {
    server 192.168.1.1;
    server 192.168.1.146;
    server 192.168.1.146:3007;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name 192.168.1.146;
    root /usr/share/nginx/html;
    ssl_certificate /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;
    location / {
            proxy_buffers 8 32k;
            proxy_buffer_size 64k;
            proxy_pass http://websocket;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-NginX-Proxy true;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_read_timeout 86400s;
            proxy_send_timeout 86400s;
    }
}
```
#### create a self signed certificate:
```
sudo mkdir /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt
```
```
sudo systemctl restart nginx
```
---
---
### WebServer Apache2
[Install](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-debian-11)

```
sudo a2enmod proxy proxy_http proxy_balancer lbmethod_byrequests
```
Apache2 Server Configuration :
##### Change default port: 
```
sudo nano /etc/apache2/ports.conf
```
```
Listen 8080

<IfModule ssl_module>
        Listen 4433
</IfModule>

<IfModule mod_gnutls.c>
        Listen 4433
</IfModule>
```
---

```
sudo nano /etc/apache2/sites-available/000-default.conf 
```

```
<VirtualHost *:8080>
  ProxyPreserveHost On
    ProxyPass / http://192.168.1.146:3007/ 
    ProxyPassReverse / http://192.168.1.146:3007/
</VirtualHost>
```
```
sudo a2ensite 000-default
```

```
sudo nano /etc/apache2/sites-available/000-default-ssl.conf
```

```
<VirtualHost *:4433>
   ServerName 192.168.1.146
   SSLEngine on
   SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt
   SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key
</VirtualHost>
```
```
sudo a2ensite 000-default-ssl
```
```
sudo systemctl restart apache2
```


[reverse proxy](https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension-ubuntu-20-04)

#### Create a self signed certificate:
```
sudo a2enmod ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt
```
---
```
sudo nano /etc/apache2/sites-available/000-default-ssl.conf 
```

```
<VirtualHost *:4433>
   ServerName 192.168.1.146
   DocumentRoot /var/www/192.168.1.146
   SSLEngine on
   SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt
   SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key
</VirtualHost>
```

```
sudo a2ensite 000-default-ssl
```
```
sudo systemctl restart apache2
```
[SSL-Apache2](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-20-04)
