---
layout: post
title:  "Audio Graphs"
date:   2021-02-11 12:38:31 +0100
categories: post
summary: "Making data visualisation accessible at The Guardian's Hack Day."
---

Hack Days are a much-loved occasion at *The Guardian*. Over the course of two-ish days, developers work on a passion project of their choice, conforming more-or-less to a chosen theme, and then present it to the rest of the department. 

Back in late 2020 we had our first pandemic-friendly remote Hack Day. This time around, our theme was Diversity and Accessibility. I had a lingering idea that fit the latter category after working with some good friends that year on [an art project](https://www.owenherbert.co.uk/rain) representing crater location data as music. My question was - how could the visual content of a data visualisation on The Guardian's website be made accessible to people who are blind or partially sighted?

The below demo involves me running through my notably discordant demo, converting a Covid cases-per-day graph made by the *Interactives* team at The Guardian into a slightly <span class="wiggle mono">chaotic</span> audio experience.

<div class="auto-resizable-iframe">
  <div>
    <iframe
     frameborder="0"
     allowfullscreen=""
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     src="https://www.youtube.com/embed/L3qjQVvZSbE">
     </iframe>
  </div>
</div>

### How does it work?

The existing data visualisation draws data from a UK Government API and creates a dynamic graph using D3.js.

I added a keyboard-navigable interface to the visualisation using the D3's existing methods and standard Javascript event handling. Each 'node' in this interface (a month in the visualisation) had a sequence of data points associated with it (the data for the month). Activating a node (by navigating to it) sets off a function that plays the sequence of datapoints as a series of musical notes, with pitch based on their y-value (the number of cases per data). What's great is that the audio experience is created in the front end of the browser, and will change as new data is made available from the government API.

To handle the audio synthesis I used the Tone.js library, which provides APIs that abstract over the more low level Web Audio API, while the speech synthesis is handled directly through the Web Speech Synthesis API. Both of these APIs are handled well on modern browsers, but aren't supported by Internet Explorer 11.

### What next?

Working on the Audio Graph was a great experience, and it was rewarding to come up with a working demo, though it was a little rough around the edges (as hacks tend to be). I think there's great potential in representing visual data in the audio medium, and in a perfect world this functionality would be available straight from the data visualisation library - spanning common types of data visualisation.