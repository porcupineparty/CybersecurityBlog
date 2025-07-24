---
title: HTB Learning Writeup - "Windows Event Logs"
description: A writeup of what I learned doing the Windows Event Logs module from HTB
date: '2025-07-22'
categories:
    - HTB
    - Blue Team
    - Event Logs
    - Sysmon
    - SOC
published: True
---

## Table of Contents

## Log Attributes
Event logs are made up of different classifiers:

- Security
- System
- Setup
- Application
- Forwarded Events

Each type of log is further classified with attributes which are used to provide information about the event

- Name
- Source
- Event ID
- Task Category
- Level
- Keywords
- User
- Opcode
- Logged (time and date)
- Computer
- XML Data

The *keywords* category is particularly useful for identifying specific associated events

Each event also has specific metadata that is unique to an event type. Security events associated with Logon
status creates a Logon ID and a Logon type for an event that you can further leverage to see what a user
did in a specific session. 

- The Logon ID is the unique classifier to specify the session
- The Logon type tells us what resources the user used to log in
  - For example Interactive is a normal login at a keyboard, but also sometimes RDP, while a Network login refers to when a user logs in over the network often times accessing shared folders (can also be used with RDP)


Some event ID's that are important to Security
- 4624 succesful logon event
- 4625 Failed logon event
- 4688 Event made when a new process is created (Identifying malware)
## Sysmon
Sysmon is a lower level service that is able to log a number of events that don't appear in the typical Event Manager
- Sysmon uses an XML configuration file to specify which events you want to include or exclude


## Detecting DLL Hijacking via Sysmon

First we need to detect event ID 7 so we have to edit the sysmon config file and run it

![Sysmonconfigmod.png](/Screenshot%202025-07-22%20220751.png)
![Runningsysmon.png](/Screenshot%202025-07-22%20221031.png)

Next we can run our dll hijack using calc.exe and a malicious file we named WININET.dll to run from calc.exe

![Succesful DLL Hijack.png](/Screenshot%202025-07-22%20222947.png)

After we can view our logs in Event Viewer:

![HijackLog.png](/Screenshot%202025-07-22%20223448.png)
![LogEvent.png](/Screenshot%202025-07-22%20223645.png)


IoC
- Calc.exe should not be found in a writable directory
- The parent process of WININET.dll in the case of calc.exe should always load from system32 due to the unchanging nature of calc.exe and because the process has to be named WININET.dll
- WININET.dll should always be microsoft signed

## Using Process Hacker to Detect C# Unmanaged Powershell Code Injections
![PowershellInvokingcrlLog](/Screenshot%202025-07-23%20002631.png)
C# uses a runtime environment to execute code. The executed code needs this environment whenever C# runs
Because of this fact, If we see any processes running the dll's needed for the C# environment that typically do not run C# code
we can infer that something wrong is going on. These two dll's are clr.dll and clrjit.dll.

We can use Processhacker to see the spoolsvc process:

![spoolsvcpowershellin.png](/Screenshot%202025-07-23%20001652.png)


We can inject our own Csharp code into the spoolsvc and after we see that it has the subprocess of crl and crljit and it is now a managed process

![crl and crljit proof.png](/Screenshot%202025-07-23%20002135.png)

Here is the log that shows us the same IoC

![PowershellInvokingcrlLog](/Screenshot%202025-07-23%20002631.png)

IoC
- A process is managed by .Net that usually is not managed example spoolsv.exe


## Detecting Credential Dumping
One way of credential dumping that attackers use with mimikatz is dumping credentials in LSASS.
We can monitor the sysmon event ID 10 to detect when a process (in this case Mimikatz) reads from another process
(lsass). 


Here we run Mimikatz:

![Mimikatz](/Screenshot%202025-07-23%20004834.png)



Now if we look at the sysmonlogs for ID 10 we can see this:

```
Process accessed:
RuleName: -
UtcTime: 2025-07-24 16:49:52.344
SourceProcessGUID: {52ff3419-63f5-6882-5f02-000000001000}
SourceProcessId: 5632
SourceThreadId: 9008
SourceImage: C:\Tools\Mimikatz\AgentEXE.exe
TargetProcessGUID: {52ff3419-599c-6882-0c00-000000001000}
TargetProcessId: 692
TargetImage: C:\Windows\system32\lsass.exe
GrantedAccess: 0x1010
CallTrace: C:\Windows\SYSTEM32\ntdll.dll+9d404|C:\Windows\System32\KERNELBASE.dll+2c13e|C:\Tools\Mimikatz\AgentEXE.exe+b6222|C:\Tools\Mimikatz\AgentEXE.exe+b65e5|C:\Tools\Mimikatz\AgentEXE.exe+b6161|C:\Tools\Mimikatz\AgentEXE.exe+838f4|C:\Tools\Mimikatz\AgentEXE.exe+8372c|C:\Tools\Mimikatz\AgentEXE.exe+83509|C:\Tools\Mimikatz\AgentEXE.exe+bcbc9|C:\Windows\System32\KERNEL32.DLL+17034|C:\Windows\SYSTEM32\ntdll.dll+52651
SourceUser: DESKTOP-NU10MTO\Administrator
TargetUser: NT AUTHORITY\SYSTEM 
```

We can see that the sourceImage is directly accessing the TargetImage lsass.exe which is a direct 
indicator of compromise. 








