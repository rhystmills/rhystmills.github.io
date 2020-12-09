---
layout: post
title:  "How do hex colour codes work?"
date:   2020-12-09 12:38:31 +0100
categories: post
summary: "An explanation of what hex codes represent."
---

If you have worked on websites, you've almost certainly encountered hex colour codes. They're a sequence of characters that denote a particular colour, generally made up of a '#' character and 6 numbers or characters from **a-f**. For example:

```
#1c1a3f - The colour of the header on this site
```

I think they're unintuitive if you don't come from a programming background, so I'm going to explain how they work.

### Red, Green and Blue

Every colour on a modern computer screen is synthesised by mixing red, blue and green light. For example, with all three colours at 100% intensity, we get white light - and with all three at 0% intensity we get black (the colour of the unlit screen). Any colour you specify in the browser is based on this principle.

In CSS, in addition to hex codes, we can specify colours directly as RGB values, with each potential value ranging from 0-255. 

In CSS RGB format, white would be specified as:

```
rgb (255, 255, 255)
```

In hex format, this would equate directly to:

```
#ffffff
```

Pure green, on the other hand would be specified as:

```
rgb (0, 255, 0)
```

Or in hex:

```
#00ff00
```

You may notice the similarity in form of those values. In fact, they are exactly equivalent. A hex colour code is really a triplet of three values, but those values are written in **hexadecimal**.

### Hexadecimal

In mathematics, we tend to operate in base 10, representing all numbers using the digits **0-9**. We're so familiar with using base ten that it sometimes feels like a 'natural' representation of numbers - but there's no inherent reason why there should be ten numerals in a mathematical system.

In computing, we tend to use bases that are powers of two, and can therefore be represented neatly in binary (base 2). Hexidecimal uses **16** numerals: **0-9** followed by **A-F**.

Therefore the number **10** in hexadecimal is equivalent to **16** in base ten. Similarly, the number **ff** in hexadecimal is equivalent to **255** in base ten.

(**NB:** To avoid confusion, and make sure hexadecimal values are recognised as distinct from base 10 values, systems using hexadecimal often use the following convention to denote a value: `0x10` or `0xff`, which I will use from now on).

### Wrapping up

Looking again at the hex code for white:

```
#ffffff
```

We have three pairs of digits:

```
R: 0xff, G: 0xff, B: 0xff
```

Our values for red, green and blue are all `0xff`: 255 in base ten - the maximum intensity, and using this system we can denote any colour our monitor is capable of producing. For example:

- Greyer (less 'saturated') colours are created by having similar intensities for these three values
- Brighter colours are created by having higher numbers overall
- More 'saturated' colours are created by having a greater imbalance between the values

As a final note - browsers also commonly support hex codes specified with only 3 digits as a shorthand for three pairs of identical numerals, for example `#123` can be used as shorthand for `#112233`. 