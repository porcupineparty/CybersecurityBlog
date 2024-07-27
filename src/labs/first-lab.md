---
title: Pentest Plus - Penetration Testing Chapter 1
description: First Chapter in The Pentest-Plus Book Overview
date: '2024-6-24'
categories:
    - PentestPlus
    - Penetration Testing
    - CIA Triad
    - DAD Triad
    - Regulations
    - Penetration Testing Process
    - Cyber Kill Chain
    - Tools of the Trade

published: true
---
Hello Everyone 👋 my name is Matthew!
I'm fairly new to the hacking scene but I want to start documenting my learning as much as possible. I'm currently studying for the Pentest Plus certification and while studying I would like to share what I learn in every chapter of the Comptia Pentest+ exam guide. 

## Table of Contents

## Cybersecurity Goals and the CIA Triad

- Confidentiality: As security professionals we want to prevent access to data from those unauthorized
- Integrity: Keeping data unaltered and correct
- Availability: Keeping data available whenever someone who is authorized accesses the data

![CIA Triad](CIA_Triad.png) 
*side note, I'm going to use a lot of AI images because it's easier to find them lol, they're also kind-of funny*

These goals directly coincide with the DAD triad which demonstrates what the goals of the attacker might be.

- Disclosure: Exploits confidentiality where attackers seek to gain unauthorized information (Data Leaks)
- Alteration: Exploits Integrity where attackers seek to alter or deface information 
- Denial: Exploits availability where attackers seek to deny access of information to those who should have access (DDOS, Ransomware)

## Benefits and Regulatory Requirements

Penetriation Testing Let's us gain knowledge about whether or not someone would be able to hack our systems, provides a guideline to help fix the systems that have been compromised, and can be specifically focused on a certain system. 

The final reason for a penetration test is for regulatory requirements and compliance. Many standards require that you must adhere to regular penetration tests. 

- PCI DSS Payment Card Industry Data Security Standard requires external AND internal penetration tests to be performed *Annually* and also after any specific infrastructure or application upgrade or modification
- If a vulnerability is found the test must be repeated after the fix

## Penetration Testing Process

There are four penetration testing stages

1. Planning and Scoping
2. Information Gathering and Vulnerability Scanning
3. Attacking and Exploiting
4. Reporting and Communicating Results

Planning and Scoping is where you define the **Rules of Engagement**. Where both parties agree on what systems, tools, allowed practices, etc. This is where we Plan the Penetration Test.

Information Gathering and Vulnerability Scanning is where we gather information about the target(s) (OSINT, NMAP) and look for vulnerabilities that we could possibly use. 

Attacking and Exploiting is where we get down and dirty exploiting the network and systems that we gathered information about. (And described in the Rules of engagement).

Reporting and Communication is where we give the information that we have learned back to the client. Writing a report using clear steps on how they can repair and mitigate their environment. 

## The Cyber Kill Chain

This Model describes how the **Attackers** go about their work it is important for us to understand how an attacker thinks so we can emulate their attacks. 

<br>

![Cyber Kill Chain](cyberkillchain.png) 

The Cyber Kill Chain can map to the CompTIA model

1. Planning and Scoping does not map
2. Information Gathering and Vulnerability Scanning maps to Reconaissance
3. Attacking and Exploiting covers Weaponization, Delivery, Exploitation, Installation, Command and Control, and Actions on Objectives
4. Reporting and communicating results does not map

## Tools of the Trade

There are a lot of Tools you need to know for the Pentest+ exam. Here is a list of all of them and a short synopsis.

<h4>Reconnnaissasnce</h4>

1. *WHOIS* Looks for records about who owns a domain
2. *Nslookup* Looks for ip addresses for an organization
3. *theHarvester* Looks for Email addresses names of employees and details about an organization
4. *Recon-ng* framework that organizes OSINT tools and work
5. *Censys* Tool that scans IP addresses and provides information by search engine
5. *FOCA* (Fingerprinting Organizations with Collected Archives) open source tool that looks for metadata in Word Documents/PDF's and different file formats
6. *Shodan* Looks for vulnerable IOT devices
7. *Maltego* Tool that helps visualize information gathered

<h4>Vulnerability Scanners</h4>

1. *Nessus* Commercial vulnerability scanner 
2. *OpenVas* open source alternative to Nessus
3. *Sqlmap* automation of sql injection attacks
4. *Nikto, Wapiti, and W3AF* are open source web application vulnerability scanners. *WPScan* is used to scan wordpress applications
5. *Security Content Automation Protocol (SCAP)* uses tools to manage compliance with security standards

<h4>Social Engineering</h4>

1. *SET or the Social Engineering Toolkit* is a framework to automate Social Engineering attacks/processes
2. *BeEF or the Browser Exploitatin Framework* is a toolkit to automate processes related to taking over a victims computer

<h4>Credential Testing Tools</h4>

1. *Hashcat, John the Ripper, Hydra Medusa, Patator, and Cain* are all password cracking tools. 
2. *CeWL* is a custom wordlist generator. 
3. *Mimikatz looks for sensitive credentials in windows memory*
4. *DirBuster* is a brute-forcing tool which involves enumerating file systems on a server

<h4>Debuggers and Software Testing Tools</h4>

1. *Immunity Debugger* supports penetration testing and reverse engineering malware
2. *GDB* is a open source debugger for linux
3. *OllyDbg* is a windows debugger that works with binary on the assembly level
4. *IDA* Commercial debugger that works on windows mac and linux
5. *Brakeman* static software analysistool used for scanning ruby on rails applications
6. *Covenant* Software security testing tool used for testing .NET applications
5. *TruffleHog* a tool that scans code repositories looking for accidentally published credentials. 




