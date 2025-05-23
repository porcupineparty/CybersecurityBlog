---
title: Incident Handling Process
description: First Chapter in The Pentest-Plus Book Overview
date: '2025-4-25'
categories:
    - Incident Response
    - Detection and Analysis
    - Containment Eradication and Recovery
    - Post Incident

published: false
---
I've decided over the past few days to up my skill-set covering Incident Response. 
## Table of Contents

## Incident Handling

Incident handling is a critical aspect of cybersecurity and is often the final opportunity to minimize damage 
after all other defenses have failed. Incident response begins once an attacker—or even an insider—has initiated an attack 
on the network, though incidents may also arise from non-malicious causes such as system failures or misconfigurations. 
This is when swift action is most critical, especially to minimize reputational and financial losses.

The Incident Handling Process involves four stages:

1. Preparation
2. Detection and Analysis
3. Containment Eradication & Recovery
4. Post Incident Activity

These stages are not always sequential, it is also important to understand that the steps may change according to the needs
of the systems that are being protected. For example, if an attacker already has full control of a number of services, you might have to
forgo detection and analysis on more minor systems until those critical systems are recovered and safe. Also, it would be important to recover all systems on 
a network first before going on and eradicating parts of said systems in order to not alert the attacker of our knowledge that he is in the 
network. 

NIST has published an extensive and widely respected guide to incident response: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf

## Preparation
The first stage of the Incident Handling Process is the preparation to properly and adequately handle any event, this includes:

1. Incident Handling Team Members
2. Training procedures
3. Policies and Documents
4. Detection and Forensic Software and Hardware

This isn't everything though, one aspect of preparation within Incident Response is to have security controls already in place 
to mitigate incidents, this includes:

- Phishing Protection
- Endpoint Hardening
- Vulnerability Scanning
- etc. 



## Detection and Analysis

Detection and Analysis involves monitoring and alerting using a variety of different tools 

- SIEM
- Firewall
- IDS/IPS
- Log Analysis

Even third party vendors can be a source of information about a potential breach. 

After an incident has been identified it is important to gather as much information as possible about the incident. 
Without information about the incident, it is really easy for employees to jump to conclusions about what is occuring.
It should also be important to logically create different levels of detection in order to much more easily create a report.

After we gain knowledge about the incident, we must ask ourselves how severe the incident is and appropriately determine 
corrective measures based on the criterea. 

## Containment Eradication and Recovery

## Pyramid of Pain

1. **Hash Values**
    - Example: MD5, SHA1 hashes of malicious files
    - Description: Fingerprints of known malicious files
    - Why it's low pain: Attackers can easily recompile or slightly modify files to change the hash

2. **IP Addresses**
    - Example: 192.168.1.10, known bad IPs
    - Description: Network addresses used by malicious infrastructure
    - Why it's low pain: Attackers can switch IPs quickly with dynamic hosting or VPNs

3. **Domain Names**
    - Example: evil-domain[.]com
    - Description: Domains used for command & control or phishing
    - Why it's moderate pain: Registering and setting up new domains takes more effort than IPs

4. **Network/Host Artifacts**
    - Example: File paths, registry keys, mutex names
    - Description: Indicators left by malware on hosts or networks
    - Why it's significant pain: Attackers must modify malware behavior or deployment techniques

5. **Tools**
    - Example: Mimikatz, Cobalt Strike, Metasploit
    - Description: Software or scripts used by attackers
    - Why it's high pain: Changing tools or modifying/customizing takes significant time and skill

6. **Tactics, Techniques, and Procedures (TTPs)**
    - Example: Lateral movement via PsExec, credential dumping
    - Description: Patterns and methodologies used by attackers
    - Why it's severe pain: Requires fundamental changes to the attacker’s playbook and strategy

