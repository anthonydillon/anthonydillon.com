---
tags:
  - engineering
  - post
title: Surprising CSS selectors you can use today
layout: article.html
---

As of date of writing which was 2016.

While working on the Juju GUI project, I was reviewing a pull request when I spotted there were no prefixes on box-sizing. I thought I should check if they needed it before asking the requester to add them. In doing so I was surprised to find that there are a lot more CSS features with global support than I originally thought. So I trawled through the chasms of Can I use and have come out with some gems to share.

## filter: sepia(1); – 78% browser support
CSS filter effects can be used to apply effects like blur, grayscale, brightness, contrast and hue. I remember a few years ago I was asked to create a blur effect as an element that overlays the page content. CSS was no help as none of the browsers supported blur. So I went on a dirty hacking weekend where I set the text to transparent, added a text shadow and used JavaScript to replace all the images with a blurred version. This worked, but I needed a shower afterwards.

I was shocked to spot that today browser support is 78%, including full support for all browsers apart from Edge, IE and Opera Mini. So I could have just used the following:

```css
img {
  transition: -webkit-filter .5s;
  -webkit-filter: blur(0);
}

.overlay-active img {
  -webkit-filter: blur(1);
}
```

So while this doesn’t cover all bases; it’s enough to let us drop the dirty hacks and use progressive enhancement instead. After all, it’s not the end of the world if IE users see a simple alpha transparent overlay instead of a blurred version.

See http://caniuse.com/#feat=css-filters (WebKit prefix)

## CSS3 selectors – 97.73% browser support
CSS3 selectors dawned a new era of capabilities in CSS, giving us a bunch of new methods to select with logic. The more interesting selectors are explained below.

`[foo^="bar"]`, the carat symbol is used as a regular expression to select attributes starting with `bar` in this case. A simple example of this features usage is:

```css
a[href^="http"] {
   background: url(external-icon.svg) no-repeat;
   padding-left: 10px;
}
```

Here we are selecting all the links that link to an external site and adding a small external icon to it automatically.

`[foo$="bar"]`, similarly this regular expression symbol refers to matching end of string.

```css
a[href$=".pdf"]:after {
  content: “(PDF)";
}
```

This example demonstrates selecting a link that is linking to a PDF file and appending a notice to give the use an understanding of the expected behaviour.

```css
:nth-child()
, selects elements based on the occurrence of the elements. For example:

li:nth-child(n2) {
  background-color: light-grey;
}
```

This example will select the every second element and apply a light grey background to it. You can also use (odd) in this case but I wanted to show the nth usage.
`:empty`, This selector will select any element that containing nothing including HTML comments.

Will match:

```html
<div></div>
```
Won’t match:
```html
<div> </div>

The `:empty` pseudo selector is useful for hiding empty elements that can cause spacing as they have padding. It can also hide the border of an empty list item. `:not()`, is a negative selector. It takes an element selector as a parameter. If the match is false then styles are applied.

```css
.menu:not(.is-hidden) {
  // menu styles
}
```

`foo ~ bar`, is a sibling combinator. Which works similarly to `foo + bar` but is less strict. The + method will only select the first bar inside foo. Whereas the ~ select will select all bars only if it is preceded by a foo.

```css
h2 ~ p {
  margin-top: 1em;
}
```

You may have been under the impression, as I was, that these selectors were not well supported. Perhaps you thought either that you could not use them, or would require some thought into a polyfill or progressive enhancement trick to use them. However, I was surprised to discover that CSS3 selectors have 97.73% global support, including IE8 and up.

See http://caniuse.com/#feat=css-sel3

## Calc() – 80.75% browser support
This is one of my favourite new features to CSS. `Calc()` gives users the ability to perform mathematical calculations using different units within CSS. For example, positioning a background icon to the right of a input field.

We have all been there, you add a background and position the icon to `right center`. Dust your hands, job done. You show the design and they ask for the icon to be 10px from the right of the element. Damn, its a background and you don’t want to create a new element just for a little icon. So you set the background position to `90% center`. This falls over at different viewport sizes. Calc to the rescue!

```css
.search-field {
  background-position: calc(100% - 10px) center;
  …
}
```

That will do nicely. Also if you wanted a floating sidebar to fill up the entire height of the screen, apart from the header, you could use:

```css
.sidebar {
  height: calc(100% - 50px)
}
```

With a nice healthy 80.75% global support and no browser prefixes required, it’s time to add this to your arsenal of selectors.

See http://caniuse.com/#feat=calc

## CSS animation – 90.29% browser support
Ever since the death of Flash we have been looking for a replacement to animation on the web, luckily CSS animations became available very quickly after. As with all new features I was curious, but resistant to use in production without carefully considering an appropriate fallback.

These days, CSS animations boast a healthy 90.29% support with a `-webkit` prefix. This means there is no reason not to add some small usability aids to your UI components, such as animating a notification into view to grab the user’s attention.

If you want to bring your site or web app to life by adding some subtle animation. You could add some motion to the introduction of the notification, using the following simple example.

```css
.notification-open {
  -webkit-animation: dropDown .6s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-timing-function: ease-in-out;
  animation: dropDown .6s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}

@-webkit-keyframes dropDown {
  from {-webkit-transform: translate(0,-100px);}
  to {-webkit-transform: translate(0,25px);}
}

@keyframes dropDown {
  from {-webkit-transform: translate(0,-100px);}
  to {-webkit-transform: translate(0,25px);}
}
```

**Pro tip**: Do not animate a positional style such as `top` and `margin`. This will cause a page repaint and in some cases require the browser to calculate the positions of the visible elements on the page.

See http://caniuse.com/#feat=css-animation

## @supports rule – 67.85% browser support
`@supports` gives us the ability to check if a feature is supported and conditionally style elements based on the browser’s functionality. For example, you can use supports to detect if flexbox is supported by that particular browser and if not swap back to floats.

```css
@supports (display: flex) {
  div { display: flex; }
}

@supports not (display: flex) {
  div { float: left; }
}
```

Pairing `@supports` with the not keyword allows for any type of logic within your CSS.

One of the gotchas with this feature is most of the time we want to test an older browser for new feature support. The older browser itself will not support this type of query.

At the moment feature queries have 67.85% support. While this is not ideal, it does cover the latest versions of the evergreen browsers, which is a good start. The only browsers lacking support are IE and Opera Mini. This has the added benefit of meaning we can begin to drop the extra dependence on Modernizr.

See http://caniuse.com/#feat=css-featurequeries

## Flexbox – 95.4% browser support
This is one feature I’ve heard nothing about. Only joking! It’s talked about in hundreds of blog posts and conferences. It’s a fantastic tool to position elements either stacked horizontally or vertically, giving us the ability to easily centre elements or make elements all the same height. It also allows us to change the order in which the elements are displayed on the page. Have you ever been asked to swap the order of the image and text of a section when on small screen. I have &mdash; flexbox to the rescue.

```css
@media only min-width(768px) {
  .row {
    display: flex;
    flex-direction: column-reverse;
  }
}
```

That said, I was a little wary of using it for anything important because, like all of these things, I didn’t believe its support was good enough. Flexbox proudly boasts a huge 95.4% browser support, spanning all the latest browsers, including Opera Mini. IE9 and below will miss out but when using it for aesthetics, that’s probably ok.

See http://caniuse.com/#feat=flexbox

## 3D transforms – 89.87% browser support
This feature allows us to position an element in the third dimension. This feature also includes the perspective property, allowing us to set the z-index of a 3D element.

We’ve all seen awesome examples of 3D scenes using just CSS, but the level of browser support took me by surprise. With an impressive 89.87% global support with a single prefix of webkit, it is ready to be used today in production. I would suggest dropping the fallback, as in most cases the functionality of a 3D element will be aesthetic.

A quick example of a card that would spin and flip as you hover over it.

```css
.card {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: rotateX(0deg) rotateY(0deg);
  transform: rotateX(0deg) rotateY(0deg);
  transition: transform 1s;
}

.card:hover {
  -webkit-transform: rotateX(180deg) rotateY(180deg);
  transform: rotateX(180deg) rotateY(180deg);
}
```

See http://caniuse.com/#feat=transforms3d

## In conclusion
I read a lot of blog posts and listen to a lot of podcasts all about frontend web development but did not realise how important it was to read through the features documented on Can I use. Truly, hats off to the people working on the site.

If you’re unsure how well a feature is supported, Can I use is the holy grail. I would recommend to any frontend dev to take the time to read through all the features, their support and known feature issues. There is no better shortcut to levelling up your CSS knowledge.

I hope you can see all the awesome stuff that can be developed using the features in this post. 2016 is the year to start using new features and create rich immersive user experiences. Whether it’s web apps or even a simple site. Never wait for “permission" to use new features just make sure you understand the support and consider fallbacks.

Now go out and use them!