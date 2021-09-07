---
layout: post
title:  "How to set a default PR template for a GitHub organisation"
date:   2021-09-07 11:50:31 +0100
categories: post
summary: "I was wondering how a default PR template could be set for a GitHub organisation, but I found it a little difficult to find official documentation on the subject."
---
I was wondering how a default PR template could be set for a GitHub organisation, but I found it a little difficult to find [official documentation](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file) on the subject (though there is a [support thread on the subject](https://github.community/t/pull-request-template-per-organization/862)).

The secret is to:

1. Create a repository within your organisation called `.github` (a special repository where other default files like a license or code of conduct can be collected).
2. Create a `PULL_REQUEST_TEMPLATE.md` file there, either in the root directory, or within a directory called `.github`. This file is a markdown document which can be edited in the same way as a pull request.

This template can be overridden in a specific repository by adding a `PULL_REQUEST_TEMPLATE.md` there.

**Some examples:**

- [The Guardian](https://github.com/guardian/.github)
- [Adobe](https://github.com/adobe/.github/blob/main/.github/PULL_REQUEST_TEMPLATE.md)

