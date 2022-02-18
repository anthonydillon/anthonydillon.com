---
tags:
  - engineering
  - post
title: Handling “class” attribute in Beautifulsoup
layout: article.html
---

Using the docs it can be difficult to spot the syntax to find an element with a class. Here is how you refine your search to the elements with my-image class.

```
img = soup.findAll("img", { "class" : "my-image" })
```

Further reading:
- [Beautiful Soup Documentation](http://www.crummy.com/software/BeautifulSoup/bs4/doc/)