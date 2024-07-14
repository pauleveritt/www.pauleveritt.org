---
title: Manage Numbering with CSS Counters
description: It's like a CSS variable, but different!
date: 2024-07-13
---

Want your numbered list to start at a _different_ number? CSS can handle it! Just use
[`counter-reset`](https://developer.mozilla.org/en-US/docs/Web/CSS/counter-reset) and some strange thing I've never seen
called [CSS Counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters).

Here's a quick example. Set the value:

```css
.postlist {
  counter-reset: start-from 42;
}
```

Then later:

```css
.postlist-item {
  counter-increment: start-from -1;
}
```

## Backstory

I encountered this on [this line](https://github.com/11ty/eleventy-base-blog/blob/v8.0.0/_includes/postslist.njk#L1)
in the [11ty base blog project](https://github.com/11ty/eleventy-base-blog/).

At first, I thought it was some odd Nunjucks scoping thing. But it wasn't surrounded by braces to make it a variable. I
tried to find `start-from` as some special variable, either in the project or in MDN.
It only existed in
the [public CSS](https://github.com/11ty/eleventy-base-blog/blob/3ceaafc400dfa44001af2457d207ff25e0ca8010/public/css/index.css#L190)
for the project, where it was used. But nothing else in that CSS file seemed to make it spring into existence.

I guess that's kind of the point. Some CSS somewhere can make `start-from`, or `daffy-duck`, or any other "symbol" name
spring to life. Then something else can reference it.
