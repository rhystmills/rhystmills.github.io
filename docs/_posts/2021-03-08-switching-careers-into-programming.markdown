---
layout: post
title:  "Switching careers into programming"
date:   2021-03-08 08:38:31 +0100
categories: post
summary: "How I moved into software development without a computer science degree or bootcamp experience"
---

I'm currently 7 months into my career as a software developer.  Before my current job I worked in  marketing for 4 or so years. I have a degree in English Literature, and I don't have a specific computer science qualification nor a bootcamp under my belt.

In the context of the wider industry – where job specifications often ask for a computer science (or at least STEM) qualification – I'm not a totally 'typical' engineer, but from personal experience I've encountered lots of people in a similar position to me.

<!-- Menu with links to sections -->
- [General advise for getting into programming](#advise)
- [What is worth learning?](#learning)
- [Entry level schemes in the UK](#schemes)

<hr/>

### How did I get my current job?

My biggest stroke of luck was already working at *The Guardian*. The engineering team here is very special - there's a shared ethos which really values learning and sharing our understanding with each other, and we have a yearly Fellowship which aims to help people into their first software engineering gig. We also have occasional *Associate Software Developer* roles which ask for a similar type of candidate - this was the role I ended up landing.

When I first became interested in programming, I sought the advice of engineers here at *The Guardian*, doing my best to follow it. One engineer in particular spent many hours pairing with me, which gave me invaluable insights into professional code, IDEs, testing, React, best practices and much more - she was also a great inspiration to me as she had worked in publishing for years before making her career change, which made me feel like my ambitions were genuinely achievable with some hard work. Without her and others who helped me along, I can confidently say I wouldn't have the job I do now. 

<hr/>

### <a name="advise">What general advise can I give about getting into programming?</a>

There are really two sets of skills that you'll want to improve before you go for your dream job:

- The craft of programming itself
- The associated skills and concepts that professional programmers grow through their day-to-day work

Bootcamps will try to teach their students both of these things, but bootcamps are expensive and time-consuming, and many of us can't afford to take time out of work to attend a bootcamp, nor money out of our paychecks to pay for one. One of the biggest barriers for the self-taught programmer is figuring out what is really *useful* to learn - especially since programming and computer science are essentially fractal in their complexity, and have far more depth than any one person can master. On the plus side, there is a colossal amount of free knowledge available online.

Knowing *what* is most useful to learn is really tough - I will do my best to outline what I've found particularly useful further down this post. 

I do have a few pieces of general advice that on reflection I think are especially important.



**Lean on your connections, or make new ones**

An especially useful thing I would recommend doing is talking to people who work in programming already, especially those who came from outside of the traditional STEM gamut. The advice given to me by those people was totally invaluable. I have found that people are often really open to sharing their experiences and advice to those who are genuinely interested in what they do. I talked to people where I work, to former colleagues, and people I'd known from school. They recommended things worth learning, books worth reading, and useful advice for interviews.

I've found that [pairing](https://en.wikipedia.org/wiki/Pair_programming) (i.e. simultaneously coding with others) is an *incredibly* useful learning experience. Usually this will involve one person *driving* (physically typing on a keyboard), while the other makes suggestions and observations. If you can find opportunities to do this regularly, it can really help your development.


**Write code whenever you can**

My long commute into work was very helpful for my personal development. I spent 3 hours a day commuting to and from work, with an additional hour at lunch. That totalled 4 hours of *dead* time every day, time that could be used to move me towards my goal.

So I tried to spend as much of this time as possible honing my programming skills. I'd find fun problems to work on and put together a solution in JavaScript. Some of these came from The Guardian's [coding exercises](https://github.com/guardian/coding-exercises). Often I'd play around with functionality I wasn't totally comfortable with - working with [ES5 array methods like map and reduce](https://github.com/guardian/coding-exercises), trying to understand [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), using Git, trying to manipulate [the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). For other commute-coders out there - I strongly recommend [devdocs.io](https://devdocs.io/), which can be cached to work offline in your browser, like <span class="wiggle">magic</span>.

The best way to learn coding is to **do coding**. If you practise regularly alongside reading books, blog posts and documentation, and think independently about how you can use code to solve problems: your quality of learning will be much improved.

I would also advise learning one language deeply rather than lots of languages at a shallow level, as you will find that most modern languages have a lot in common at a fundamental level.


**Create a personal passion project**

A piece of advice I feel very strongly about is to **work on a personal project yourself**. Build it from the ground up, make choices about the programming languages and libraries you use. Solve problems, encounter bugs, improve things, and note what you'd like to do better. Ideally, start with a problem that you'd like to solve, or an opportunity that you think is waiting to be solved.

It doesn't have to be a totally original idea - maybe you want to work on something like a digital calculator, or process the output of an API in an interesting way. Use version control like Github and make it open source. Perhaps think about a build/deploy process, or testing.

I'd recommend using technologies that you want to learn about: that way it will also be a great and purposeful learning experience.

Why? Beyond learning, **many interview questions are related this**: tell us about something good (and relevant) you have achieved. Tell us how you fixed a problem, how you made a decision. Tell us about a project you've worked on, and how you'd like to make it better.

You'll know your own projects inside out and be able to answer questions like these with confidence, while boosting your own understanding of the technologies that companies would like you to have.

I made a [chrome extension using NASA's Astronomy Photos of the Day API](https://github.com/rhystmills/nasa-apod-extension) - and I ended up talking about it in my interviews.


**Find good resources**

Good documentation will answer all of your questions accurately. For all things web (e.g. JavaScript, HTML, CSS, the DOM) - this is [the MDN Web Docs](https://developer.mozilla.org/en-US/).

I paid for almost none of the resources I used, other than a couple of second-hand books.

There is a large body of published work around programming. My general strategy has been to seek the wisdom of others when deciding what to read (Google it, or ask connections for recommendations). For JavaScript, I read [*Eloquent JavaScript*](https://eloquentjavascript.net/) which has the advantage of being free, but can be quite intimidating for an absolute beginner. People frequently recommend the *You Don't Know JS* series. I found an older edition of *HeadFirst JavaScript* useful early on (though it was a bit goofy and pre-ES5, thus outdated. The world of web development changes *very* quickly).

Harvard's [*CS50x - Introduction to Computer Science*](https://cs50.harvard.edu/x/2021/) is also available online for free and gives an incredible overview of core computer science concepts - I highly recommend it, though it will take up a chunk of your spare time.

[Codecademy](https://www.codecademy.com/) is a fun and gamified representation of coding and doesn't seem to burn you out as quickly as a scholarly book, but I think it can hand-hold a bit too much to get you thinking as independently as you will need to. Nonetheless, it offers a friendly introduction to programming concepts.


<hr/>

### <a name="learning">What is worth learning about?</a>

As I have written above, programming is a very deep and wide set of knowledge, and early on I struggled to know which topics were worth prioritising. I've tried to compile a long and detailed list of concepts that I have found personally useful. There are useful fundamental skills that you'll **definitely** want to know, and beyond that - things that are worth understanding in order to stand out from the crowd but which are probably beyond the scope of *entry-level software developer skills* (I've highlighted these in <span class="green">green</span>).

Really, this list is *much more* than an entry level role should expect you to know - but I think all of it is worthwhile knowledge. I'm far from mastering a lot of these items myself, but how I differ from myself two year ago is that I'm **aware** these things are worth knowing, and know that **being able to talk about them will come across well in an interview**. 

It's worth noting that this list is quite specific to a full stack web developer role.



**Programming fundamentals:**

- Can you use `for` & `while` loops?
- Do you understand the difference between arrays/lists and objects/dictionaries?
- Can you use conditional `if/else` statements?
- Can you use the modulus function/operator?
- What makes a good function?
- What is the purpose of a function?
- Can you write a useful recursive function?
- <span class="green">Can you write a higher order function (i.e. a function that is passed a function as an argument)?</span>



**Web fundamentals:**

- What do HTML, JavaScript and CSS each contribute towards a web page?
- Can you construct a basic responsive webpage which works well on both mobile and desktop?
- Do you know basic accessibility guidelines and principles?
- What is the DOM?
- How do you manipulate the DOM with JavaScript?
- Can you use your browser's developer tools well?
- How can you ensure your code works across a variety of browsers including older ones?
- <span class="green">Do you understand HTTP queries, and the ins and outs of HTTP headers?
- <span class="green">Have you worked with APIs which return JSON in response to HTTP queries?
- <span class="green">Do you know the basics of a modern web framework like React, Angular or Vue?
- <span class="green">Do you know any TypeScript or understand why its type system is valuable?</span>

  

**JavaScript fundamentals:**

- Do you know the difference between `var`, `let` and `const`?
- Do you know the difference between `false`, `null`, `undefined` and `NaN`?
- Can you work with event handlers?
- Can you use ES5 array methods like `reduce`, `map` and `filter`?
- Can you use and understand arrow functions? (e.g. `(value) => value * 2`)
- Can you import and export modules?
- Can you work with JSON? Do you understand its purpose?
- <span class="green">Can you run a local server to test your code in a production-like environment?
- <span class="green">Have you written backend JavaScript for `node.js`?
- <span class="green">Have you worked with asyncronous code e.g. `async`, `Promise`, `.then()`?
- <span class="green">Do you understand what `this` means?
- <span class="green">Can you use regular expressions?
- <span class="green">Can you use the spread operator?
- <span class="green">Do you understand object destructuring?
- <span class="green">Can you work with classes and constructors?
- <span class="green">Do you understand the mechanics of prototypes?
- <span class="green">Do you know how arrow functions differ from functions declared with the `function` keyword?
- <span class="green">What is a closure?</span>

  

**Coding Practices**

- Can you write readable code - including consistent naming conventions, and intuitively named functions and values?
- Can tyou debug your code effectively - including using the console/REPL well, but also beyond (e.g. using tests and handling errors well) 
- <span class="green">Can you conduct test-driven development (TDD) - i.e. setting up tests and writing them in advance of your functions
- <span class="green">Do you know about Object-Oriented Programming or Functional Programming as programming paradigms?</span>

  

**Associated skills of a software developer**

- Can you use Git to add version control to your projects?
- Can you use the command line (i.e. terminal) to navigate your folder structure and get work done, especially using *bash* or associated shells like *zsh*?
- Do you understand the basics of a relational CRUD (create, read, update, delete) database?
- <span class="green">Have you conducting pair programming? Can you respond well to feedback and code reviews?
- <span class="green">Are you aware of different database types (e.g. SQL-based relational, NoSQL) and their differences?
- <span class="green">Are you familiar with build tools like package managers, linters, compilers, transpilers, minifiers?
- <span class="green">Are you aware of the value of continuous integration and automated deployment processes?
- <span class="green">Have you worked with Amazon Web Services (AWS) or other cloud technologies?
- <span class="green">Are you familiar with design patterns like the MVC (Model-View-Controller) model?
- <span class="green">What do project management concepts like Agile, sprints, standups and retros involve</span>

  

**General computer science:**

- What are the differences between compiled and non-compiled languages? What are the advantages of both?
- What is a type system? What advantages does a type system offer?
- <span class="green">Can you roughly explain the differences between binary, assembly language, compiled code and a scripting language?
- <span class="green">Can you discuss the basics of algorithm theory and data structures, e.g. big O notation, sorting algorithms, hashing algorithms, hash tables, linked lists, binary trees, queues and stacks?
- <span class="green">Are you familiar with basic computer science topics like hexadecimal, memory and pointers?</span>

<hr/>


### <a name="schemes">What entry level schemes are open in the UK?</a>

Entry level schemes open to people outside of a traditional computer science background are something of a rare beast - I've only applied at The Guardian but I asked around my colleagues and found a couple of similar opportunities.

- The [Guardian Digital Fellowship](https://www.theguardian.com/info/series/digital-fellowship-scheme) generally takes place every year. It offers a fantastic learning experience with fellows rotating around different teams in the department. We also have occasional 'Associate Software Developer' roles that are open to people with similar experience.
- The [Made Tech Academy](https://www.madetech.com/careers/academy) offers a 12 week coding course leading into a paid role, open to those with a little coding experience.
- The [Sky Software Engineering Academy](https://careers.sky.com/earlycareers/software-engineering/#toggle-id-3) is open to those with any degree plus applied knowledge of programming.
- ITV have an [academy](https://www.itvjobs.com/business-areas/corporate/technology/technology-graduate-scheme), though it's aimed specifically at technology graduates.

### Closing thoughts

 Plenty of brilliant software engineers come from outside of the traditional Computer Science background. Ultimately a company will want you for the value you bring: your work ethic, knowledge and personality - and they won't care all that much about your specific qualifications, especially if you've gone the distance of learning under your own steam. Don't let self doubt stop you from pursuing a career that feels like the right fit for you - there is plenty you can do to 