---
title: What is RSS?
---

RSS is a system where you can view content from websites in a centralized source, rather than having to view each site individually.

## Why?

It's nice to have everything in one spot, basically.

People post stuff online. To find out if someone's posted new content, you have to check. However, because there are many places where people upload content, it means that there's many places you have to check.

For example:

- YouTube: Subscription feed, or specific channels,
- Social media posts
- Trending posts on Reddit
	- (or subreddits)
	- (or posts on a forum in general)
- Blog
- etc.

RSS allows you to have one place to see updates.

You can streamline how you consume content by creating an RSS feed, filtering out everything but what you've set up to browse.

### How does it work?

Websites (or "the place that's making the content") generates something called an RSS feed, a file that stores the contents of a website.[^rss_content] When you look at the file directly, you won't see a "webpage", but the raw information (XML usually, if you know what that means).

[^rss_content]: Technically speaking, there does not have to be a connection between a website's RSS feed(s), and the actual content of the site, but I mean... why would you do that? In almost all situations, when the content of the RSS feed is updated, so is the page.

An RSS reader allows you to store and view RSS feeds in an organized manner. This is done by providing the reader with a list of *sources*— links to the RSS feeds that you to be updated on. For example, you can access the posts on this blog over at [/feed.xml](https://blog.rovidecena.com/feed.xml).

### What if a website doesn't support RSS?

You can still access content from a website that support RSS, but it can be problematic.

If a website doesn't have an RSS feed for you to link, one will have to be generated for you. This can be done through third-party sources that generate feeds, though this often comes at a cost. Some websites may technically support RSS, but only as a deprecated feature that they don't advertise.

Also, some websites may have mediocre support for RSS. Reddit, for example, does not display the comments for posts (though to be fair, RSS isn't really designed to do so). You can get around this with some readers that allow you to load a page directly, though it's a bit slower to load.

### give me other trivia about RSS

Q: I didn't ask that question.

A: too bad

- RSS feeds typically limit themselves to the latest posts. Part of this is to prevent websites having to send an unreasonable amount of posts to you, but also so a website doesn't incur massive charges by sending you large swathes of data every time your RSS reader asks for an update.
- Oh, that's another thing— RSS readers have a one-way connection with their sources. They have to check through all their sources every so often to get feed updates. This is typically something you can configure, though ideally you'd have it no less than 15 minutes (or just have it only update whenever you open it).
- The term RSS actually refers to a specific format/standard on how web feed data should be structured. Atom is a newer standard that is used for newer feeds instead of RSS, but both are fine. JSON is also an option appearently, though I haven't seen it.
	- None of this matters in most cases because an RSS reader can usually handle all three without any fuss.
- This also means that RSS feed is just a type of web feed, but I call it RSS because everyone else does— from what I've seen, anyways.
