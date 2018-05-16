# Welcome to InstaFight

This is the midterm exam for the Web Development class at Universidad de los Andes
You will be able to compare the number of likes of two public Instagram accounts to see which user has more likes and wins the InstaFight. 

## Plus! As a creative addition!

You can also see how many comments the posts of the two public Instagram accounts have!

## If you want to run in just follow this simple steps:

First you need to have/create an account in https://mlab.com/ an to have a database to use with the project 

after this you have to configure you env file, in order to achive this you hace to create a .sh file with this format

```
export  mlabUsername=your_username
export  mlabPassword=your_password
export  mlabDatabase=your_db_name
```

and then run `. your_file_name.sh` in terminal (do not close that terminal window, follow the next steps in the same window)

Go to the cloned project
```
cd instafightOficial
npm install
```
Go to the /frontend folder and run 
```
cd frontend
yarn install
yarn build
```

Then go back and run
```
cd ..
yarn start
```

To use the project open your browser on http://localhost:3001

Note: You need to have Nodejs, npm and yarn installed 
