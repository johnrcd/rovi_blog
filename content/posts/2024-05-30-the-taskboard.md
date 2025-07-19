---
title: "The Taskboard"
date: 2024-06-02
tags: web_dev projects code

description: "tl;dr: jira board but for me"
# date_edited: 2024-04-13 14:35:00 -0600
---

<!-- table of contents hack -->
<h2 style="color:transparent; font-size:1px; line-height:0;">(top of post)</h2>

As part of my work term, I had the oppertunity to work on a full-stack web application, specifically using Django (DRF), and React. Technically speaking, this wasn't my first time doing this, but it was definitely a step above from just using raw PHP and SQL. It was pretty fun, but I figured that to get a better grasp on Django, I should do my own project using it.

When trying to find ideas, I knew that I wanted to do something simple. I had my dose of unfinished projects in game development, so I really didn't want to go down that rabbit hole again. The easiest reccommended full-stack application to build was a to do list. I thought was interesting, but I thought about it more and had some doubts.

- Does every viewer have their own to do list? Is that how it works?
- If every viewer has their own to do list, why would you even need to make it full stack at all? Just store everything in the local storage (assuming text only).
- If the To Do list is synced between everyone, that seems counter-productive.

Anyways -- even if was a good idea or not, I found it boring, and I figured it had been done to death to be recommended in so much different websites, so I started looking for other avenues.

I didn't hate the idea of a to do list app, but I wanted to expand upon it. I have a habit of working on several projects at once, so I thought it would be funny if I create a project that burdened me with even more stuff to do, which led to the taskboard.

## what is the taskboard?

![taskboard home page]({{ site.url }}{{ site.baseurl }}/assets/images/my_websites/taskboard_home.png)

To put it simply; the Taskboard is a JIRA board, except I'm the only one actually handling tickets.

If you didn't get that, the Taskboard is a website where you can submit tasks for me to do. These tasks are expected to be related to stuff I do (games, music, websites). Each task is viewable on the board, displaying information as to the type of task, details of the task, and the current status of it.

Outside of the tasks, there's also a comment section within each task. The intended purpose of the comments is to give feedback between me and the person submitting the task, maybe clarifying why I approved/rejected a task, and letting them know on any status updates.

## project status

As of now, the website is live! You can check it out [here](https://rovidecena.com/taskboard/).

> https://rovidecena.com/taskboard/

It's functional, for the most part. There's a few bugs I have to iron out at the time of writing, but as of now, I have reduced focus on this

While the biggest major features have been completed, the Taskboard is far from what I'd consider feature complete. There's a few ideas I've had that I'll probably work on within (insert future period):

- User profiles, allowing you to view tasks that you've posted
- Notifications whenever someone posts a comment, or if I update your task.
- Change the Taskboard to hide resolved tasks (completed, cancelled, rejected), and create a separate archive board to display these tasks.
- Sort tasks by latest activity rather than by post (posted comment, status change).
- Colour overhaul -- something besides the random shades of blue. Probably look into actually making a colour palette instead of using tailwind's defaults.
    -  (yes there's a u in colour!!!)

I'll get around to them at some point (probably). At the time of writing, I'm switching my main programming project to Arcfest II[^arcfest].

[^arcfest]: Arcfest <https://johnrcd.itch.io/arcfest> is a game I made a few years ago. The game was a one-versus-one brawler where you win rounds by knocking your opponent into an everclosing zone to do damage.

<hr />

## footnotes








