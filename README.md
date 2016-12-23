to install local server run:

npm start;

Log as admin with:

user: admin,
password: 12345

-----------------
Note* 

1. if you get error on start server try to change port in file package.json from 8000 to 8080 .

2. you can change default config and set initial users and prefix for local storage in app.js file

3. when try to register -- username must be unique.

4. new account always get user role (only admin user you can change role)
