# rovi_blog

My personal blog, where I talk about projects I'm working on, which tend to be related to websites, games, or music.

![picture of blog post on rovi_blog](/public/img/readme_website.png)

You can check it out at [blog.rovidecena.com](https://blog.rovidecena.com)

## Details

The website is built using:

- Eleventy — static site generator (SSG)
- Cloudflare — domain/hosting
- Pages CMS — git-based content management system (CMS)

Despite Eleventy being an SSG, `rovi_blog` runs as an single page application (SPA) that can fallback to being a multi page app if JavaScript does not work. This is primarily to support the website's theme system, which allows you to dramatically change the look of the website from a selection of styles.

## Getting Started

To get a local copy up and running, follow these steps:

### Installation

1. Clone and open the repository:

```sh
git clone git@github.com:johnrcd/rovi_blog.git
cd rovi_blog
```

2. Install the necessary dependencies:

```sh
npm install
```

### Development

To run a live development server, you can use:

```sh
npx @11ty/eleventy --serve
```

Alternatively, if you just want to make a build:

```sh
npx @11ty/eleventy
```
