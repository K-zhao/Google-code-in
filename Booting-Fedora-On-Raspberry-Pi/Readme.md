# How to boot Fedora ARM on Raspberry PI

## Tables of Contents

1. [Installation Process](https://github.com/K-zhao/Google-code-in/blob/master/Booting-Fedora-On-Raspberry-Pi/Readme.md#installation-process)
    - [Windows and Linux](https://github.com/K-zhao/Google-code-in/blob/master/Booting-Fedora-On-Raspberry-Pi/Readme.md#windows)

## Installation Process
Information for this guide was sourced from [here.](https://fedoraproject.org/wiki/Architectures/ARM/Raspberry_Pi#Introduction)
Look here for any additional information. The guide will provide sufficient information for a base install.

### Windows and Linux
1. Download and install [Etcher.](https://www.balena.io/etcher/)
2. Download the appropriate version of Fedora ARM that you want on your Pi. The guide will use the Fedora 29 Workstation [image.](https://fedoraproject.org/wiki/Architectures/ARM/Raspberry_Pi#aarch64_supported_images_for_Raspberry_Pi_3)
3.  Launch Etcher. ![Etcher](https://github.com/K-zhao/Google-code-in/blob/master/Booting-Fedora-On-Raspberry-Pi/Screenshot.PNG)
    - Choose your image, then flash it. ![Etcher](https://github.com/K-zhao/Google-code-in/blob/master/Booting-Fedora-On-Raspberry-Pi/Screenshot2.PNG)
    - You should get a "Flash Complete!" at the end of the process. ![Etcher](https://github.com/K-zhao/Google-code-in/blob/master/Booting-Fedora-On-Raspberry-Pi/Screenshot3.png)
4. Remove the microSD card from the computer, and put it into the Pi. Turn on the Raspberry Pi and wait for the boot-up process to run itself through. You should see this. ![Raspberry](https://github.com/K-zhao/Google-code-in/blob/master/Booting-Fedora-On-Raspberry-Pi/Screenshot4.jpg)
5. Continue with the bootup process, including setting up a username and setting a password. You should see a finished panel at the end. You have successfully installed Fedora ARM on your Raspberry Pi now! Congratulations.