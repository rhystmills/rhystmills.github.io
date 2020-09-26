---
layout: post
title:  "What makes this site"
date:   2020-09-26 17:38:31 +0100
categories: post
---
I've had a few generations of websites in my time, most recently, an <span class="wiggle mono">oldskool</span> handwritten HTML site. 

Here's that whole site in an iframe:
<p><iframe src="https://rhystmills.github.io/rhysmills/" title="The old rhysmills.com" height="600px" style="width: 100%; margin-top: 10px;"></iframe></p>

I had opted for a handwritten html site for a few reasons:
- I wanted very cheap<span class="free"> (free) hosting
- I'd heard that you could [host a website for free in an Amazon S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) provided it was a static site (and it felt like valuable experience using S3, given that I was interesting in learning all things AWS)
- I wanted total control of the site without my choices being limited by the capacities of a CMS like Wordpress
- I could throw something together quickly and get it online

<h3>So what happened?</h3>

Unsurprisingly, I quickly ran up against the problems that had led humanity towards the invention of the [CMS](https://en.wikipedia.org/wiki/Content_management_system), and away from handwriting html websites. 

I didn't want to have to manually write an html document each time I put out a blog post, nor did I want to fiddle with manually copying the core structure of the page (e.g. the header and footer) for each page I wanted. 

**Instead, I wanted:**
- To write my posts in something code-light like [Markdown](https://en.wikipedia.org/wiki/Markdown), using a system which could compile that markdown into a static site.
- To be free to edit the site and its content locally, whether or not I have an internet connection.

Looking into this concept led me to [Jekyll](https://jekyllrb.com/) - a CMS written in Ruby and incorporating [Sass](https://sass-lang.com/documentation/syntax) & [Liquid](https://shopify.github.io/liquid/#:~:text=Liquid%20is%20an%20open%2Dsource,many%20other%20hosted%20web%20applications.), which compiles a collection of Markdown documents into a static site. On top of that, it can be used to power a free-hosted site on [Github Pages](https://pages.github.com/) - which is how you're reading this post. I can add and update posts locally as Markdown documents, then compile the whole site and push to Github, automatically updating the site.

I'm using a heavily modified version of the [Minima](https://github.com/jekyll/minima) theme, which provides many sensible defaults and a useful structure for creating your own site.

Everything in this site can be seen in its [Github repository](https://github.com/rhystmills/rhystmills.github.io).
