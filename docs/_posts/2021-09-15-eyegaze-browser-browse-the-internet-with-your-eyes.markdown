---
layout: post
title:  "Eyegaze Browser: browse the internet with your eyes "
date:   2021-09-15 16:50:31 +0100
categories: post
summary: "An accessibility demo from The Guardian's Hack Day."
---
I was wondering how a default PR template could be set for a GitHub organisation, but I found it a little difficult to find [official documentation](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file) on the subject (though there is a [support thread on the subject](https://github.community/t/pull-request-template-per-organization/862)).

The secret is to:

1. Create a repository within your organisation called `.github` (a special repository As I've previously written:

 > Hack Days are a much-loved occasion at *The Guardian*. Over the course of two-ish days, developers work on a passion project of their choice, conforming more-or-less to a chosen theme, and then present it to the rest of the department.

We have a Hack Day every 6 months or so. With one coming up tomorrow, I realised I never got up to writing about my last contribution.

<iframe width="560" height="315" src="https://www.youtube.com/embed/qzSiotk2jVY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

My hack was a Chrome extension that lets you browse a website using your eyes, using your standard webcam. It's a work-in-progress.

Eyegaze technology isn't new - but it usually happens through expensive specialist technology which requires manual calibration. For someone with a condition like motor neurone disease or paralysis, it may be their primary interface for interacting with the world and other people. 

My goal was to create a free, open-source solution for eyegaze-powered web browsing, without the need for additional technology. After all - accessibility technology can be very expensive, and access to this kind of technology is especially limited in developing countries.

## How does it work?

[`eyegaze-browser`](https://github.com/rhystmills/eyegaze-browser) uses [WebGazer.js](https://webgazer.cs.brown.edu/) under the hood to track eye movements - WebGazer itself uses machine learning to predict where the user is looking on the screen based on video recordings of their eye movements during the initial calibration.

`eyegaze-browser` replaces every page you visit with a React app that contains the `eyegaze-browser` interface. It then loads the page you are trying to visit in a iframe. It creates a list of all tabbable elements in the iframe (via [tabbable](https://github.com/focus-trap/tabbable)), and the user moves through the tabbable links by using the on-screen buttons, equivalent to how a keyboard user would navigate through a page.

### What's next?

There's quite a distance to go to make the project more useful to users. It would be good to offer a search function which would replace the new tab, to allow users to find pages as well as browse through pages they're already on. There's also the question of how to reset calibration if something goes wrong, as well as improving calibration overall. If you want to have a play with the extension, please [check out the repository](https://github.com/rhystmills/eyegaze-browser).
