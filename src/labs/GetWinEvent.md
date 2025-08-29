---
title: Get-WinEvent - "Managing Windows Logs with Powershell cmdlets"
description: A writeup on using Get-WinEvent to analyze logs.
date: '2025-08-28'
categories:
    - HTB
    - Blue Team
    - Event Logs
    - Sysmon
    - SOC
    - GetWinEvent
    - Powershell
published: True
---

## Table of Contents

## What Is Get-WinEvent?

Get-WinEvent is a powershell cmdlet that allows us to sift through event logs much easier than using the typical Event Viewer.
With this cmdlet we can gather logs from many different sources, including typical windows logs, but it also integrates well with 
Sysmon and *ETW* (Event Tracer for Windows). Because this is a powershell cmdlet, it can also be called multiple ways and integrated
very easily with different services because it sits on top of the *Windows Event Log API*. It is especially useful in powershell scripts
and C-Sharp code because of the native support they both provide. 

## Basic Syntax

The Get-WinEvent cmdlet is actually very simple to integrate, let's look at few examples below

```
    Get-WinEvent -ListLog * | Select-Object LogName, RecordCount, IsClassicLog, IsEnabled, LogMode, LogType | Format-Table -AutoSize
```

This first example is calls the Get-WinEvent cmdlet and then gives the flag *ListLog* This flag is used to list out any 
available log sources that can be called, it does this by taking the list of log files and condenses them into objects almost like a class in a language like C++, we then pipe that output into another cmdlet called `Select-Object`, which 
only selects the attributes that you tell it to show. In this case *LogName, RecordCount, IsClassicLog, IsEnabled, LogMode, LogType* Are all attributes.
We then pipe the data associated with those attributes again to another cmdlet Format-Table which automatically creates a visual table for us to look at with the flag `-AutoSize`.


```
    Get-WinEvent -ListProvider * | Format-Table -AutoSize
```

This flag -ListProvider, can be used to see the source of the event within the logs, Like *Powershell* or *System*

```
    Get-WinEvent -LogName 'System' -MaxEvents 50 | Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -AutoSize
```

The `LogName` flag is used to select which source you want to grab the Logs from. In this case we are selecting the first 50 events from the 
Windows system log source. As you can see the Select-Object cmdlet is taking different parameters now since we are now focusing
on the actual events withing the Log file. 

```
    Get-WinEvent -Path 'C:\Tools\chainsaw\EVTX-ATTACK-SAMPLES\Execution\exec_sysmon_1_lolbin_pcalua.evtx' -MaxEvents 5 | Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -AutoSize
```

You can also specify a specific .evtx file to take events from with the -Path flag, other than that it is the same. 

```
    Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=1,3} | Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -AutoSize

```

We can use the FilterHashtable flag to further narrow down our search. With it we can specify ID's and other information to look for. 
Here we use ID 1 and 3, One indicator of compromise that we could look for, which stems from Event ID's 1 and 3 is communication with a C2 server.
A C2 Server usually runs suspicious binaries or processes and then reaches out using a network connection. If these events are close together
time-wise it is very likely that a process is reaching out to a C2 server. You could then go and search for specific IP addresses 





