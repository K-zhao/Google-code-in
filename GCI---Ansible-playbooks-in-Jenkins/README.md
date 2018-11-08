# GCI---Ansible-playbooks-in-Jenkins

Part of Google-Code-In Tasks

## Creating a playbook

You have to first create a playbook for Ansible to execute on. [More information here](https://docs.ansible.com/ansible/2.6/user_guide/playbooks_intro.html#playbook-language-example)
The playbook consists of a .YAML file detailing hosts to deploy the your tasks to.
Ansible goes through the playbook and executes the tasks through modules. The coding is intentionally made simple for a human to interpret and read.

## Installing Ansible plugin in Jenkins

The Ansible plugin is simple to find and install. Once docker is up [(See here for installation instructions)](https://docs.docker.com/install/linux/docker-ce/fedora/)and running with jenkins [(Also see here)](https://jenkins.io/doc/book/installing/#downloading-and-running-jenkins-in-docker), you should be able to see the home page.
![A picture should display here.](https://github.com/K-zhao/GCI---Ansible-playbooks-in-Jenkins/blob/master/Homepage.png)

On the sidebar to the left, click "Manage Jenkins". Content should pop up on the right side of the screen. An option to "Manage Plugins" will be visible. Go to the "Available plugins" tab and search up for Ansible and install. Make sure to reboot Jenkins. Ansible should be successfully installed as a plug-in for Jenkins.

## Triggering the Ansible job/playbook