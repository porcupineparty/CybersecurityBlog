---
title: Footprinting
description: The art of footprinting 
date: '2024-08-02'
categories:
    - HTB
    - Hacking
    - OSINT
    - Enumeration
published: false
---

## Table of Contents


## Introduction

Hello! This week I started working on the Footprinting module for HTB Academy and would like to share some things I have learned and document my progress.

## Enumeration Principles

### What can we see?
- What reasons can we have for seeing it?
- What image does what we see create for us?
- What do we gain from it?
- How can we use it?

### What can we not see?
- What reasons can there be that we do not see?
- What image results for us from what we do not see?

1. There is more than meets the eye. Consider all points of view.
2. Distinguish between what we see and what we do not see.
3. There are always ways to gain more information. Understand the target.

## Enumeration Methodology

Most penetration testers follow a methodology even though it is not standardized; it is usually based on habits.

The enumeration process is divided into three different levels:
1. Infrastructure-based Enumeration
2. Host-Based Enumeration
3. OS-Based Enumeration

Another source to find more subdomains is [crt.sh](https://crt.sh/). This source is Certificate Transparency logs. Certificate Transparency is a process that is intended to enable the verification of issued digital certificates for encrypted Internet connections. The standard (RFC 6962) provides for the logging of all digital certificates issued by a certificate authority in audit-proof logs.

## FTP

FTP is a TCP/IP protocol that runs within the application layer, the same layer as HTTP and POP. FTP uses port 21 to establish a control channel where the client and server can communicate. They actively communicate on port 20 after it is opened.

### Active FTP
- The client establishes the connection using TCP on port 21 and then informs the server which port it wants to use (usually 20). If a firewall protects the client, the server cannot reply because the firewall blocks the connections.

### Passive FTP
- In passive mode, the server announces a port which the client can make the data channel. The client initiates the connection after this, and since the client initiates the connection, the firewall does not block the transfer.

FTP is a cleartext protocol. Servers can also use anonymous FTP, meaning the operator allows users to upload or download files without a password.

TFTP is like FTP but not as good. It does not provide authentication and uses UDP, so it isn't as reliable. It only provides access via read and write permissions on the file in the server. TFTP should only be used in local and protected networks.

VSFTP is the most used version of FTP on the internet.

A dangerous setting to include is anonymous user settings that can allow anyone to access FTP.

When accessing an FTP server for HTB or for pentesting in general, there are a few commands that help tremendously:
1. `status` - gets the server's settings
2. `debug`
3. `trace` - both help get more information when listing other commands like `ls`

If the FTP server has the setting `hide_ids=YES`, it means that it is harder to identify which rights the files have.

The `ls_recurse_enable=yes` setting allows us to list all of the content on the FTP server using the `ls -R` command.

Footprinting FTP usually involves using NMAP and NSE with `-sC`, which will use the basic scripts. More aggressive scripts can be tried with different options. If we use `--script-trace`, we can see the commands NMAP uses and what ports and responses we receive.

We can also use `netcat` and `telnet` to connect to the FTP server. If there is SSL and TLS encryption, we need to make sure our client can handle those, so we use `openssl`. We can even see the SSL certificate with this command, which often gives us the hostname and email address for a company.

## SMB

The SMB protocol, also known as the Server Message Block, is a way for computers on a network to communicate protocols and files with each other. SMB is usually Windows-specific, but Samba allows Mac and Unix systems to communicate as well. Samba uses CIFS, which is a dialect of SMB or a specific implementation of the SMB protocol.

### SMB Config File for Samba

These are some of the settings:

- **Sharename**: The name of the network share.
- **workgroup = WORKGROUP/DOMAIN**: Workgroup that will appear when clients query.
- **path = /path/here/**: The directory to which the user is to be given access.
- **server string = STRING**: The string that will show up when a connection is initiated.
- **unix password sync = yes**: Synchronize the UNIX password with the SMB password?
- **usershare allow guests = yes**: Allow non-authenticated users to access defined share?
- **map to guest = bad user**: What to do when a user login request doesn't match a valid UNIX user?
- **browseable = yes**: Should this share be shown in the list of available shares?
- **guest ok = yes**: Allow connecting to the service without using a password?
- **read only = yes**: Allow users to read files only?
- **create mask = 0700**: What permissions need to be set for newly created files?

### Dangerous Settings

`browseable = yes` this setting makes it easier for employees to view the file structure but would also allow attackers access to the structure if they were to get in.

NMAP isn't very useful with SMB; it doesn't give us much information. Instead, we should use `rpcclient`. This lets us perform MSRPC functions. Remote Procedure Call includes passing parameters and then returning function values.

### List of Queries and Requests

- `srvinfo`: Server information.
- `enumdomains`: Enumerate all domains that are deployed in the network.
- `querydominfo`: Provides domain, server, and user information of deployed domains.
- `netshareenumall`: Enumerates all available shares.
- `netsharegetinfo share`: Provides information about a specific share.
- `enumdomusers`: Enumerates all domain users.
- `queryuser RID`: Provides information about a specific user.

We can brute force users based on if we are allowed to see RID 

for i in $(seq 500 1100);do rpcclient -N -U "" 10.129.14.128 -c "queryuser 0x$(printf '%x\n' $i)" | grep "User Name\|user_rid\|group_rid" && echo "";done

OR instead we can use an impacket script:

samrdump.py 10.129.14.128

Not all commands are availabel most often but we usually have access to queryuser based on ID. So we can brute force RID's to get more information 

We can also obtain this information using other tools like SMBmap and CrackMapExec

However we should use more than one tool for our enumeration and never rely on only automated tools because we don't know how they are written. 

To automate a lot of this you can use Enum-4-linux-ng 

Porcupineparty@htb[/htb]$ git clone https://github.com/cddmp/enum4linux-ng.git
Porcupineparty@htb[/htb]$ cd enum4linux-ng
Porcupineparty@htb[/htb]$ pip3 install -r requirements.txt


## NFS

NFS (Network File System) is just like SMB in that it accesses file system over a network as if they were local. It is used between linux and Unix systems. NFS devices cannot communicate directly with SMB devices. 

NFSv2 is still used sometimes and initialy only operates over UDP
NFSv3 has more features better error messages, not fully compatible with NFSv2 Clients
NFSv4 has a lot of more features added like integration with kerberos, works with firewalls doesn't require port mappers anymore. It has high security and has a stateful protocol. NFSv4 Only needs to use one port. port 2049

Because NFSv4 only needs one port it simplifies the use of the file system so it's able to be used with firewalls more easily. 

NFS is based on the Open Network Computing Remote Procedure Call https://en.wikipedia.org/wiki/Sun_RPC (ONC-RPC/SUN-RPC)
This protocol operates on port 111 (TCP UDP) and uses XDR https://en.wikipedia.org/wiki/External_Data_Representation
XDR is what encodes and decodes data to make sure both the client and server understand the data that is being transmitted. 

NFC doesn't authorize or authenticate. It relies completely on RPC protocol's options. This could include things like Kerberos integrated in RPC for authentication.

If a user authenticates the server decide what the server is allowed to do with the files. the decision is based on the file system itself and the system's own permissions. The server translates the client's user information (user ID or group ID) into the format used by the server's file system and then checks if the user has the permissions found on the server.

NFS Authentication: The most common method of authenticating users in NFS involves using UNIX user IDs (UIDs) and group IDs (GIDs). Here's how it works:

1. Client-Side: When a user on the client machine attempts to access a file on the NFS server, their UNIX UID and GID are sent along with the request.

2. Server-Side: The NFS server receives this request and uses the provided UID and GID to determine what operations (read, write, execute) the user is allowed to perform based on the file permissions.

Challenges with UID/GID Mapping
One significant issue with this method is that UIDs and GIDs are not inherently consistent across different systems. This can lead to several problems:

1. Mismatched UIDs/GIDs: The UID that corresponds to a particular user on the client machine might correspond to a completely different user on the server machine. For example, UID 1001 might be "alice" on the client but "bob" on the server.

2. Group Memberships: Similarly, the groups to which a user belongs on the client might not match the groups on the server, causing inconsistencies in access permissions.

The server always assumes that the UID and GID sent by the client are accurate and trustworthy it does not verify UID/GID against it's own database or perform additional checks to ensure mapping is correct. 

This means that if a hacker was to get into the network it would provide a step for privilege escalation because no additional checks are made. Which allows for a malicious client to spoof UIDs and gain unauthorized access. 



Dangerous Settings 

RW read and write permissions
Insecure allows ports above 1024 to be used so that means people can host the ports who aren't root. 

nohide this means that if another directory is below the current directory (subdirectory) then it is able to see that directory as well. 

No_root_squash is very bad, typically with a NFS server when the root user uploads/mounts a share to be used, it changes the UID to be changed to Nobody user so the root on the client can't have root access on the server, but if No_root_squash is implemented then that means that the UID is not changed and the client will have root access to the server if they are considered root on the client. 

<h4>FootPrinting the Service<h4>

when using NMAP ports 111 and ports 2049 are essential to NFS. we can get info about NFS using RPC. 111 uses RPC (and portmapping) and 2049 is NFS. IF it is not NFSv4 which doesn't use portmapping on port 111. 

NMAP also has NSE(nmap scripting engine) scripts that you can denote with nfs* which allows all NFS scripts to run. 

Once we footprint and find files we want to check out or collect we mount it on our local machine. We create an empty folder and map it to the NFS share. 

```bash
mkdir target-NFS
sudo mount -t nfs <ipaddress>:/ ./target-NFS/ -o nolock
cd target-NFS
tree .
```



