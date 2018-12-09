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

Copy and paste the following

` sed -i 's|status||' /path/to/inputfile`

In my case, I will be using `sed -i 's|status||' test.txt`
`

The `-i` flag means in place, so the file changes will occur within the file. 