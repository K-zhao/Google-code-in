# Executing a Shell Script from Jenkins

## Step 1 - Logging in to Jenkins

Boot up Jenkins from Docker. You might see a login screen. Input your username and password.
![Login]()

## Step 2 - Navigating Jenkins and Creating a Project

Once you are on the home page, click on `new item`.
![Home]()

Create a Freestyle project, and name your project. Click `Ok`.
![Create]()

Under source management, link the repository where you will be storing the file that you will be interacting with through the shell script. I will be using `test.txt` as my test file. You will need to input your credentials.

![Screenshot]()

![Screenshot]()

Copy and paste the following

` sed -e 's|status||' /path/to/inputfile > /path/to/outputfile`

In my case, I will be using `sed -e 's|status||' test.txt > output.txt`

The `-e` flag is to signal a script. The structure of the script is as follows.

`'s|pattern|newpattern|`
