---
layout: post
title:  "Installing Kali on a Raspberry Pi"
date:   2021-07-02 15:30:31 +0100
categories: post
summary: "How I fixed a few snags to turn my microcomputer into a pentesting tool."
---

Back in late 2020 I got a [8GB Raspberry Pi](https://thepihut.com/products/raspberry-pi-4-model-b?variant=31994565689406&currency=GBP&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gclid=CjwKCAjwgISIBhBfEiwALE19SZMf0WSOu6fDshjJxu4Ma4qpAdqvnDraBB4AU6We3YWiMPWNh0xhrBoCREcQAvD_BwE). As you may be aware, the Pi is an affordable microcomputer aimed at hobbyists. I got the more powerful model at that time in order to keep my options open for how to use it. I bought a few accessories - and played around with adding a [touchscreen](https://www.amazon.co.uk/Elecrow-Monitor-800x480-Display-Raspberry/dp/B013JECYF2/ref=asc_df_B013JECYF2/?tag=googshopuk-21&linkCode=df0&hvadid=309981988222&hvpos=&hvnetw=g&hvrand=7008280090012538622&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1007171&hvtargid=pla-440182632879&psc=1), but didn't get much further than that at the time.

<figure>
    <img src="{{ "assets/img/raspberry-pi.jpg" | relative_url }}" alt="My 8GB Raspberry Pi Model B" role="img" aria-label="Rhys Mills"/>
    <figcaption>My 8GB Raspberry Pi Model B, in <a href="https://shop.pimoroni.com/products/pibow-coupe-4?variant=29210100170835">Pibow Coupé 4 case</a></figcaption>
</figure>

Once of the many joyful things about the Pi is that you can install a new operating system on an SD card, plug it in, and get going doing useful things.

At The Guardian (where I work) developers can spend 10% of their time working on personal development and educational projects. I had been reading up on penetration testing and thought it would be fun to look into running [Kali](https://www.kali.org/) on my Pi.

Kali is a Linux distro built essentially as a collection of penetration testing tools, rather than a general purpose operating system. It was my time setting up a Linux distro and I hit a couple of snags along the way - this blog post covers how I got it working.

### How I got it working initially

1. Installed Kali on an 32GB SD card from my Macbook Pro - following the [command line instructions here](https://www.kali.org/docs/usb/live-usb-install-with-mac/), except... 
2. The `dd` step didn't work for me, so I used the `xzcat` command from here: https://www.kali.org/docs/arm/raspberry-pi-3/ (n.b. I had to remove the `status=progress` bit which was causing an error on my device)
3. After plugging the SD into my Pi, it booted as intended and I logged in with the default username and password ('kali' and 'kali' - which I immediately changed).

### The next fix

Kali worked great on the the Pi, and I played around with some of its utilities. 

However, on reboot a bug was preventing me from logging in, it was apparently well known, and I needed to run `apt update && apt dist-upgrade ` in order to fix it. However, I was apparently out of disk space - only a small portion of the 32GB SD card was being assigned to the operating system and Kali was unable to use the rest of the available memory in order to run the command successfully and update Kali. After some googling, I realised I needed to expand the root file system as by default Kali won’t fill the entire SD card. This was a faff.

I followed many rabbit holes, but found the only solution that worked for me was [Steve Robillard’s answer here](https://raspberrypi.stackexchange.com/questions/499/how-can-i-resize-my-root-partition).

I couldn’t login to make these changes (due to the original bug) - but it turns out that you can launch a console from the Kali login screen using `ctrl-alt-f1`.

But I hit *another* problem, there were errors in the filesystem that stopped an important step of the process from successfully completing (`sudo resize2fs /dev/mmcblk0p2`).

I needed to sort the errors - it's not trivial to do this from Kali itself, but I didn't have another Linux system with which to make the necessary changes. Instead, the only solution that worked for me was the [downvoted comment by Erik on this post](https://superuser.com/questions/401217/how-to-check-root-partition-with-fsck) - putting Kali into read mode so that I could run the commands that would resolve the errors (replacing `/dev/sda2` with `/` - which is where my partition was).

Finally, I could run `sudo resize2fs` and then `df` to see that the partition now only used 37% and not 100% of the disk space.

Ironically, the login problem had been sorted somewhere along the way without me updating the operating system - but I now had space on my SD to do useful work (and of course I updated).