---
layout: post
title:  "'a11y' isn’t accessible"
date:   2023-02-10 10:51:31 +0000
categories: post
summary: "Accessibility enthusiasts have a strange habit of referring to accessibility as ‘a11y’. Why is this a bad idea? And what can we learn from it?"
---

Accessibility is partly about making your product technically usable by as many people as possible. If your website is accessible: a blind person, deaf person or a colourblind person - for example - should be able to use it and navigate around it without the experience being too painful.

But for me, it also incorporates trying to make your content comprehendible to as large a group as possible - including people with low technological literacy, non-native english speakers and people with low reading comprehension. 

For this reason, there’s some overlap with technical writing best practices - the aim of which is to make technically complex topics accessible to as broad an audience as possible.

Something I try to employ from technical writing is thoughtful use of acronyms. With regards to acronyms, [Google’s technical writing guidance](https://developers.google.com/tech-writing/one/words#use_acronyms_properly) suggests that:

> acronyms are really just a layer of abstraction; readers must mentally expand recently learned acronyms to the full term. For example, readers convert TTN to Telekinetic Tactile Network in their heads, so the "shorter" acronym actually takes a little longer to process than the full term.

In advises technical writers to:

> On the initial use of an unfamiliar acronym within a document or a section, spell out the full term, and then put the acronym in parentheses. Put both the spelled-out version and the acronym in boldface.

… and to use acronyms only when:

> * The acronym is significantly shorter than the full term.
> * The acronym appears many times in the document

Editorial style guides, which similarly cover making complex topics accessible to a broad audience, often follow similar guidance. [The Guardian’s style guide](https://www.theguardian.com/guardian-observer-style-guide-a) states:

> If an abbreviation or acronym is to be used more than once in a piece, put it in brackets at first mention: so Association of Chief Police Officers (Acpo), seasonal affective disorder (Sad); alternatively, use the abbreviation with a brief description, eg the conservation charity the RSPB. Remember that our international online readership will not necessarily be aware of even well-known UK abbreviations. If an organisation is mentioned only once, it is not necessary to give its abbreviation or acronym.

This raises an important subject - that we shouldn’t assume our audience has the same familiarity with acronyms or abbreviations that we do. 

Let’s get back to ‘a11y’.

[Numeronyms](https://en.wikipedia.org/wiki/Numeronym), as they are apparently known, are used fairly frequently by the tech crowd. As well as 'a11y' - I encounter 'i18n' (internationalisation) and 'k8s' (kubernetes) fairly frequently. The argument for their use is basically to save the author the burden of writing a long word, and perhaps - if we’re being generous - to shorten the text others have to read.

The downside is that without an initial definition of what the numeronym means, they’re particularly incomprehensible to outgroups. And you can easily imagine assistive devices like screenreaders struggling to pronounce them in a comprehendible way, even if they are defined early on: moreover, unlike capitalised acronyms, there’s no clue to the screenreader to read them letter by letter. 

In addition, as the Google technical writing guidance suggests, you’re really offloading mental labour onto the reader to unpick what you’re referring to (or worse - if you haven’t explained it - the physical labour of Googling the numeronym for a definition).

So I’ve always found it strange that accessibility enthusiasts, a crowd who care about making applications and content useable to a broad range of people, use ‘a11y’. It’s an artefact of an incorrect assumption about our readers - that they’re broadly similar to us and will understand what we’re writing about, justifying our use of obscure technical jargon.

So what should we do instead? Just write ‘accessibility’. And more broadly - question your use of niche acronyms and abbreviations. If you do judge that they’re useful to your audience - define them on first use. 

For subsequent uses, think about wrapping them in a semantic `<abbr>` tag and providing a title that explains what they mean, after all - you don’t know at which point in a page a reader has started reading, and they might miss your initial definition if they start half way through the page.

---
```
<abbr title="accessibility">a11y</abbr> isn't accessible
```
<abbr title="accessibility">a11y</abbr> isn't accessible