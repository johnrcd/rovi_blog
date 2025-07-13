---
title: About
permalink: "/about/"
eleventyNavigation:
  key: About
  order: 2
---
Hi, I'm Rovi Decena! I'm a software developer with a lot of side projects.

Probably too much.

## what is this

A blog.

After enough time spent making long, rambly descriptions on YouTube, or bombarding my friends with development details, I figured that a blog might be a better outlet. For the most part, I'll be posting about stuff I'm working on, or have worked on -- behind the scenes, retrospectives, etc.

My projects tend to revolve around these three topics:

- code (the main one)
- music (secondary)
- game dev (usually code + music)

Not to say that I'll only be talking about this stuff... but I'll probably only be talking about this stuff.

## audience

While the majority of the posts here involve diving into projects I'm working on, the actual content should be relatively easy to understand. If there's something interesting regarding the technical side of my stuff, I'll try and explain it for a general audience, but most of the posts are written after midnight, so the quality can be a bit all over the place.

## technical details

Okay, here's some information about how the site works; how I code and do music, etc. As the header implies, it's technical. Feel free to read, but unlike my posts, I won't try and simplify anything.

### site configuration

- This blog is built using Jekyll, using a heavily modified version of the no-style-please theme.
- The repository is hosted on GitHub.
- There is no automatic build process. I build the files on Jekyll, then transfer the build to my website.
	- I tried using GitHub Actions with their prebuilt Jekyll deployment thingy, but turns out there's issues with doing that because I wanted it to be hosted at `domain/blog` rather than `domain/`.
	- There's *probably* a way to get it builds on the server to be updated automatically, but I have zero experience with CI/CD... or whatever it is that deals with automatic builds.

### previous attempt

- For some reason, I was so desperate to make this blog using just React.
- When I say just React, I mean that -- a static react blog. With no backend of any sort.
- I don't exactly know what compelled me to believe I could could make a blog like that, but I did try! And I did fail!
	- I did think about using WordPress as headless CMS, but I didn't go through with it for various reasons.
	- NOTE: "various reasons" means "i forgot why"
- One of the ideas I had was to simply have a file on my server with all my posts, that would be loaded every time you go on the blog site.
	- I'm still of the belief you could theoretically do something like this, but all the methods I came up with were never fleshed out, and my early (poorly thought-out) tests showed me that I should just bite the bullet and do it a normal way.
	- Actually, writing this now, you could probably just have a massive JSON object.
	- Wait, nevermind that sounds terrible.
	- Wait, I remember already thinking about that solution.
- Comments would be nice, though. That's one of the things I lost when I developed the website using a static site generator.
	- Then again, I don't want to deal with comments (on the rare chance my blog gets enough attention to warrent needing to semi-regularly moderate comments).

### creating, editing, and updating posts

- I use Visual Studio Code to write posts.
	- Posts are written in markdown files, with word wrapping at 80 columns. This doesn't affect the actual code, so if you look into my source files and wonder why I have the longest lines possible, that's why.
- I write posts in _drafts, but (very rarely) I'll use Google Docs if I want to write when I'm not at home.
	- I find that editing a markdown file directly helps me stay focused. I write for less, sure, but it's consistant.

## music stuff

- I produce music using Waveform Free.
	- Yes, I am using the free version of a paid DAW.
	- No, I don't plan on getting the paid version. As long as I can use my VST's, and I can use automations, I don't really care what features I'm missing out on.
- I've used two other DAW's:
	- started off with Soundtrap (browser-based),
	- then tried Ableton Live for ninety days when they hosted their free trial,
	- then spent a week trying to find a DAW before finding Waveform Free.
- TECHNICALLY, I've tried FL Studio, but only for like ten minutes.
	- Personally, I thought the workflow was too awkward to really get into.
	- The only exception for that is automation clips; they look super useful. I wish Waveform had them! (Ableton Live didn't have them either...)
- My formal music education is limited to basic guitar classes in my middle and high school.
	- After a certain point, I taught myself how to play fingerstyle, then percussive.
- Vital is my main, general-purpose synthesizer. I basically don't use anything else.
	- Previously, I used Synth1, but I like Vital because it has nicer visuals that appeal to my brain.
- Other than Vital, I use these for sound making:
	- Spitfire LABS. Always a classic -- mostly because it's free.
	- BBC Symphony Orchestra -- I love strings in my songs! I've used a few synths/samples for strings before, but I'm currently using these right now.
	- A bunch of drum sample packs. Mainly, I use samples from CIRCLES, Cymatics, and Stiickz.
	- Ample Sound's ABPL2 -- bass VST using samples.
	- My own guitar. I record direct input.
- My main mixing plugins:
	- TDR Nova -- I use this as a regular EQ, a dynamic EQ, and a spectrogram.
		- This is my most used plugin, even more than Vital.
	- Valhalla Supermassive -- simple to use. Took awhile to get used to how powerful you could make your reverbs; almost all of the time, I have it cranked down low.
	- A bunch from Kilohearts; the compresser, limiter, delay, distortion, and gain.
		- I like how barebones they are.
	- Native's Supercharger -- a compressor... of some sorts.
		- Not exactly sure how this one works. I just slap it on when I need to glue sounds together.
