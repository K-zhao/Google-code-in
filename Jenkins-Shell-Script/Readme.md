# Executing a Shell Script from Jenkins

## Step 1 - Logging in to Jenkins

Boot up Jenkins from Docker. You might see a login screen. Input your username and password.
![Login](https://github.com/K-zhao/Google-code-in/blob/master/Jenkins-Shell-Script/Login.png)

## Step 2 - Navigating Jenkins and Creating a Project

Once you are on the home page, click on `new item`.
![Home](https://github.com/K-zhao/Google-code-in/blob/master/Jenkins-Shell-Script/Home.png)

Create a Freestyle project, and name your project. Click `Ok`.
![Create](https://github.com/K-zhao/Google-code-in/blob/master/Jenkins-Shell-Script/Createjob.png)

Under source management, link the repository where you will be storing the file that you will be interacting with through the shell script. I will be using `test.txt` as my test file. You will need to input your credentials.

![Screenshot](https://github.com/K-zhao/Google-code-in/blob/master/Jenkins-Shell-Script/Screenshot.png)

![Screenshot](https://github.com/K-zhao/Google-code-in/blob/master/Jenkins-Shell-Script/Screenshot2.png)

Copy and paste the following:

`#!/bin/bash`

`sed -i 's|status||' /path/to/inputfile.txt`

`cat /path/to/inputfile.txt`

The `-i` flag means in place, so the file changes will occur within the file. The structure of the `'s|status||'` is as follows: `'s|old_word|changed_word|'` A blank between the pipes means to replace the word with nothing. The `cat` command is to read back the final result to the terminal.

Click `Save` at the bottom of the page.

## Step 3 - Running the build

Click `Build now`, which is located in the left side of the page. You can then view the results in the `Console Output` tab, which can be found by clicking the Build History number.