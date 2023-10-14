# Simple telegram web-app example 

First copy .env.example in tg-web-app-node and past to .env inside  tg-web-app-node folder, fill that file with youre keys

Run command: 
```
docker-compose up
```

If you will change ports in .env then you alse need to change ports in docker-compose.yml file 

# Important information

first do not run on the server inside docker it can cause problems with telegram polling 
second all links must be https otherwirse project will not going to work

# example 
See tg bot https://t.me/web_app_test_1234_bot