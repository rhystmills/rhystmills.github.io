---
layout: post
title:  "Can AI replace all software engineers?"
date:   2026-09-12 08:16:00 +0100
categories: post
summary: "And could Ophan be developed without people?"
---

Having used AI agents in my work (agents being large language models that can call tools to handle specific tasks), I'm now aware that they can write code very well. This used to be something only humans could do, and it had me wondering - is there a future in software engineering? Will AI one day replace developers completely?

I can imagine a few different ways the development of AI might affect the number of software engineers in the future.

Perhaps previously unfeasible tech projects will become practical through an abundance of cheap AI labour. Software will expand into more aspects of our lives, and even more programmers will be needed: supervising uber-productive AI agents doing much of the intellectual legwork.

The leading assumption is that companies will hire fewer people to write code. In the (often doomerist) AI company Anthropic's [recent economic report](https://www.anthropic.com/institute/econ-scenarios) – which presents three possible scenarios for the future of the economy - it posits that net job losses in "knowledge work" are inevitable even by 2030: it's just a question of how many will go.

Others wonder – will we even need software engineers? Will the CEO of the future be able to ask any question to a powerful AI agent, and have a system built and maintained without needing to worry about the implementation details at all? This is appealing to companies that want to stop paying expensive engineers, and therefore a tempting marketing message for the AI companies who want more investment and customers.

What we have is a spectrum - at the extreme end of the "job losses" side is the total replacement of all software engineers by AI. Software engineering would be an antiquated, artisanal practice like hand-weaving, replaced by a superior method.

<figure>
    <img src="{{ "assets/img/software-jobs.png" | relative_url }}" alt="The spectrum of AI engineering outcomes" role="img"/>
</figure>

Is total replacement of engineers possible? I'm going to avoid making predictions on the future of AI development, and approach this question from first principles instead, focusing on my current domain: pageview analytics.

At [The Guardian](https://www.theguardian.com/uk) (where I work), staff want to know what pages are getting seen, and where traffic is coming from. Over the past year and a half, I've been working on the team managing the Guardian's answer to this problem, ['Ophan'](https://theguardian.engineering/blog/info-2021-jul-12-how-we-backfilled-the-guardians-in-house-analytics-tool-to-provide-greater-journalistic-insight). This is our internal pageview analytics platform, which collects pageview data from users, and presents it in a series of configurable dashboards that our staff can interrogate. Something like Google Analytics, customised to the needs of the newsroom.

## Pageview analytics in the age of superhuman agentic AI

Let's say that one day, for the very first time, the CEO of the (pretend) company FutureCorp decides that they want to know how many people have been on their website.

Even with an omnipotent AI agent, this question can't be answered unless there is already data infrastructure in place. The data already needs to have been collected and stored somewhere in order for it to be analysed. The agent can't conjure it up retrospectively.

We would need a storage method for the data. And there will be tonnes of data, because FutureCorp's website gets more than 100 million pageviews a day. Even if the data per pageview is small, this will add up quickly.

To store data, we need hardware. Any software project has two core components – code, representing a series of digital operations with some value to the creator, and hardware – the computer on which the code will run.

In the past, companies often ran their own servers, and large tech companies still do. But in the last 25 years, cloud computing emerged as the dominant force in web hosting. Most of the Guardian's services run on machines managed by AWS (Amazon Web Services) – and the vast majority of digital services will use a similar cloud provider for their infrastructure.

<figure>
    <img src="{{ "assets/img/servers-comparison.png" | relative_url }}" alt="Servers, then and today" role="img" />
</figure>

These machines cost money to build (they use expensive materials and labour) – and maintain (they need a continuous supply of electricity, cooling, and security). And AWS aren't running them for fun; if we want to use some of that finite computing resource we'll have to pay. 

This usage might be more or less abstracted - we might reserve a specific machine running Ubuntu Linux, or we might just give data to AWS for them to store on our behalf in S3 (one of their abstracted storage solutions) – and not have to care about the underlying hardware.

Regardless; in order to store data, or run a continuous data-processing program on a server, we will have to pay for hardware. We have generated cost.

Hopefully this demonstrates that if the CEO wants to know who visited their website, the problem needs to have been considered ahead of time. There will be decisions to make, decisions like:

- How long we want to store the data for
- How detailed the data should be
- How the data will get from our user's web browser to the place we're storing it
- How we will get our code to the hardware it's running on
- How much we are willing to pay for this

The CEO is going to have to think ahead, and they're going to get bogged down in technical requirements. Let's say we hand off all the decisions to the AI agent. It will decide the answers to everything above, except perhaps "how much are we willing to pay".

The CEO does just that, and the next month the bill they receive is 100 times what they expected. What now?

## "A computer can never be held accountable"

The AI agent can't be held accountable if it does something wrong. Part of the reason we have hierarchies in organisations is to assign responsibility and accountability. Does the CEO want to be accountable for the decisions the AI agent has made, decisions they don't understand?

No – instead, the CEO will want to designate accountability to somebody else, an employee who can check some of what the AI agent is doing. That person would have some responsibilities:

- Understanding the business's requirements
- Checking that the system meets those requirements

How do we check that the system meets those requirements? 

For instance, let's say the CEO wants data to be available for 10 years. We can't wait 10 years to see if the data got deleted prematurely. We need some assurance <span class="wiggle mono">now</span> that the time-scale is enforced somewhere and will be honoured. 

The agent may assure us that the measure is in place –  but the enforcement ultimately lives in the code, so the agent might need to show us the value containing the data retention period. In pseudocode, it might show us this:

```
val dataRetentionPeriodYears = 10
val dataStore = new DataStore({config: {
	retentionYears: dataRetentionPeriodYears
}})
```

The employee is being shown code at this point and they need to be able to understand it. They might have to look in lots of other places to understand how this value is passed through the system and whether it's applied in the right places, to be absolutely sure that the data will be retained as intended.

It seems we can't totally get away from the code implementation details.

Similarly, in order to be accountable, the FutureCorp employee will need to know:

- What hardware is needed, and how much it's expected to cost
- That the architecture of the system is functional – every user's pageview data comes from their browsers and ends up in the storage system for the specified amount of time 
- There are tests or guarantees in place that can assure us that the system is functional

What we've described above are some of the responsibilities of a software engineer. Rather than exclusively writing code, a lot of our time is spent communicating with others to clarify requirements, and making sure that the systems we produce meet those requirements (which requires reading the code).

Some decisions are big, some are small – but they need to be made continually and autonomously without constantly asking the CEO to decide. Many decisions will have financial or legal implications, and wherever those appear we need accountability. 

Is personal data being handled according to legal requirements? What about data deletion requests? Are we adequately communicating the data we collect to our users? Is that data being stored securely? Even if a machine can adequately solve these problems in place of a human – it can't be held accountable when there's a failure.

You might summarise all this as follows:

> Your organisation exists within financial and legal constraints
>
> An employee needs to be accountable for your system meeting those constraints
>
> The actual implementation of those constraints lives in your code
>
> If you can't understand the code, you can't verify the implementation
>
> Therefore you need to be able to read the code

I think this reasoning shows that, in the case of pageview analytics, the role of the software engineer can't disappear. 

Beyond that, I think this rules out the worst case scenario for AI's impact on software engineering employability everywhere – in fact I think it makes a strong case that there will always need to be a decent number of engineers around who understand code, anywhere software is being made, even if the job looks a bit different in the future. If your system does anything important, or introduces financial risk of any kind, you need a person around who can understand it and take responsibility for it.

The way we structure our time is bound to shift towards reading and reviewing code written by agents (because they're already very good at writing code), and perhaps fewer of us will be needed, but someone will always need to check the fine details. The need to understand code is not going away.


<em>This post was written without AI.</em>