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

Penetriation Testing Let's us gain knowledge about wheather or not someone would be able to hack our systems, provides a guideline to help fix the systems that have been compromised, and can be specifically focused on a certain system. 

The final reason for a penetration test is for regulatory requirements and compliance. Many standards require that you must adhere to regular penetration tests. 

- PCI DSS Payment Card Industry Data Security Standard requires external AND internal penetration tests to be performed *Annually* and also after any specific infrastructure or application upgrade or modification
- If a vulnerability is found the test must be repeated after the fix

## Penetration Testing Process