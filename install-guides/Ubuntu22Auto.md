# (Automated) Deploying Pixelfed on Ubuntu 22.04 LTS (Jammy Jellyfish) + PHP 8.1
Guide by [@shlee@aus.social](https://aus.social/@shlee) - Version 0.2

[[toc]]

## NOTES
* I will be using `pixelfed.au` as the example domain, because this is the instance I've used to test and confirm this guide. I am running this guide in production. Just replace `pixelfed.au` with your new instance domain.

## TASKS TO COMPLETE AFTER INSTALLATION
* Email setup
* Cloud Storage (S3 bucket)
* Unix Sockets for redis and mariadb to use unixsockets over tcp. (Optional)

## TODO For the guide
* Add UFW

----

## Part 0 - Setup the VM and update the DNS for A and AAAA records
* Setup the VM
> **Note**
> You can use a low spec machine for a while. Increase the instance size for additional CPU/RAM to handle more users as required.

![image](https://user-images.githubusercontent.com/17537000/171820544-80ed8a0e-dae3-4b4b-9c76-ff939c8a488c.png)
* Setup the DNS for pixelfed.au
> **Note**
> DNS records for www.pixelfed.au are not required.
```
A @ <ipv4 address above>
AAAA @ <ipv6 address above> 
```
![image](https://user-images.githubusercontent.com/17537000/171820581-9dd5246f-47e1-4204-bf44-1c5916dd72b5.png)

----

## Part 1 - Upgrade Ubuntu 22.04 LTS
* Install all updated default Ubuntu packages and reboot to use the latest kernel.
```
apt update && apt upgrade -y
```
```
reboot now
```

----

## Part 2 - Run the auto-install script (on a brand new Ubuntu 22.04 VM)
* Download and run the script as root
```
bash -c "$(curl -sSL https://raw.githubusercontent.com/shleeable/autofed/main/autofed-ubuntu22.sh)"
```
