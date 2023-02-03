---
layout: post
title:  "How to make screen recordings with internal device audio on a Mac"
date:   2023-02-03 14:51:31 +0100
categories: post
summary: "TLDR: use Kap and Loopback"
---


I do development work for my job on a Mac. I care about accessibility, and make occasional PRs related to screenreader support - especially for VoiceOver. I like to record videos of portions of my screen with audio from the Mac itself to demonstrate accessibility changes to our projects, and embed them in GitHub PRs. This post is basically a writeup of my setup.

<iframe width="429" height="762" src="https://www.youtube.com/embed/zeCPlOlpHpA" title="Demo screen recording using Kap and Voiceover" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

I use a combination of [Kap](https://getkap.co/) and [Loopback](https://rogueamoeba.com/loopback/). Kap records the screen and Loopback captures device audio, which Kap can use.

Loopback captures your device audio and makes it available as a ‘microphone’ that you can use in other programs. In Kap, select this microphone as the one you want to use.,

**Why the complicated setup?**

Mac doesn’t support recording internal device audio by default, bafflingly.

Instead, you need a third party application to do it. Older guides recommend [Soundflower](https://github.com/mattingalls/Soundflower) but this doesn’t seem to be in active development and doesn’t work on M1 macs, apparently. [Blackhole](https://existential.audio/blackhole/) also played up for me, though others have recommended it.

I personally use [Loopback](https://rogueamoeba.com/loopback). It has a free mode that will work for 10 minutes - then it starts blasting out white noise, which is obviously quite annoying. But it works well for those ten minutes and suits my needs.

Kap has a few output options available after capturing the video that make it more useful to me than Quicktime’s screen recording function, you can:

* Output at a fraction of the actual screen size
* Change the FPS (frames per second)
* Output as mp4, gif or webm (Quicktime only supports Apple's poorly supported .mov) 

All of which are helpful for producing low file sizes when I embed in a GitHub PR.


