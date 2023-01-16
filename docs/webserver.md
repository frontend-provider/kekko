WebServer Nginx
[Install](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-debian-10)



```
server {
listen 80;
listen [::]:80;
server_name 192.168.1.146;
return 301 https://$server_name$request_uri;
}

upstream websocket {
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


### create a self signed certificate:
```
    sudo mkdir /etc/nginx/ssl
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt
```
