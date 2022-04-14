# setup
---

### vscode
---

```bash
sudo snap install code --classic
```

### slack
---

```bash
sudo snap install slack --classic
```

Check current favoutite apps.

```bash
gsettings get org.gnome.shell favorite-apps
```
```
['firefox.desktop', 'org.gnome.Nautilus.desktop', 'code_code.desktop', 'org.gnome.Terminal.desktop']
```

Now add slack to favoutite apps.

```bash
dconf write /org/gnome/shell/favorite-apps "['firefox.desktop', 'org.gnome.Nautilus.desktop', 'code_code.desktop', 'org.gnome.Terminal.desktop', 'slack_slack.desktop']"
```

### FireFox
---

update packages
```bash
sudo apt update
```

need recent version of firefox

```bash
sudo apt install --only-upgrade firefox
```

### ngrok
---

```bash
sudo snap install ngrok
ngrok authtoken <token>
ngrok help
ngrok http 80
```

```
ngrok by @inconshreveable                                       (Ctrl+C to quit)
                                                                                
Session Status                online                                            
Account                       Raktim Halder (Plan: Free)                        
Version                       2.3.40                                            
Region                        United States (us)                                
Web Interface                 http://127.0.0.1:4040                             
Forwarding                    http://f947-115-187-43-61.ngrok.io -> http://local
Forwarding                    https://f947-115-187-43-61.ngrok.io -> http://loca
                                                                                
Connections                   ttl     opn     rt1     rt5     p50     p90       
                              11      0       0.00    0.00    65.11   65.30     
                                                                                
HTTP Requests                                                                   
-------------                                                                   
                                                                                
POST /slack/event              200 OK                                       
```

for authentication (not suggested in this case)
```
ngrok http -auth="mitkar:mitkar" 80
```

### nginx
---

```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
```

install Node.js 16.x and npm

```bash
sudo apt install -y nodejs
```

installation of development tools to build native addons

```bash
sudo apt install -y gcc g++ make
```

unlink the default Nginx configuration

```bash
sudo unlink /etc/nginx/sites-available/default
```

Issue: 1
```bash
# $ sudo nginx -t
# nginx: [emerg] open() "/etc/nginx/sites-enabled/default" failed (2: No such file or directory) in /etc/nginx/nginx.conf:62
# nginx: configuration file /etc/nginx/nginx.conf test failed
```

```bash
sudo touch /etc/nginx/sites-available/default
```

Issue: 2
```bash
# $ sudo nginx -t
# nginx: [emerg] could not build the server_names_hash, you should increase server_names_hash_bucket_size: 32
# nginx: configuration file /etc/nginx/nginx.conf test failed\
```
comment line '# server_names_hash_bucket_size 64;' in file '/etc/nginx/nginx.conf'

```bash
sudo vi /etc/nginx/sites-available/meerkot.conf
```

```
#The Nginx server instance
server{
    listen 80;
    server_name 0.0.0.0;
    
    location /meerkot/ {
        rewrite ^/meerkot/?(.*)$ /$1 break;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    
    location = /meerkot {
        proxy_pass http://localhost/meerkot/;
    }
}
```

symlink will exist most probably

```bash
sudo ln -s /etc/nginx/sites-available/meerkot.conf /etc/nginx/sites-enabled/
```

```bash
ls -l /etc/nginx/sites-enabled/
```
```
total 0
lrwxrwxrwx 1 root root 34 Apr  9 12:09 default -> /etc/nginx/sites-available/default
lrwxrwxrwx 1 root root 39 Apr  9 12:18 meerkot.conf -> /etc/nginx/sites-available/meerkot.conf
```

```bash
sudo nginx -t
```
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

```bash
sudo nginx -s reload
```

```bash
curl -X GET http://localhost/slack
curl -X GET http://localhost/slack/testing
```
