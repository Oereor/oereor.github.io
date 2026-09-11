---
layout: doc
title: '如何分析 TurnBasedGameData 里面的配置文件？'
date: 2026-09-10
---

# {{ $frontmatter.title }}

> [!WARNING]
> 本文仅作为学习用途。请尊重游戏知识产权。

如果你也想跟着分析，首先要把 [TurnBasedGameData](https://github.com/DimbreathBot/TurnBasedGameData) clone 下来。

我们主要关注的是 `ExcelOutput` 目录，以及很重要的 `TextMapCHS.json`。

> `ExcelOutput` 将各类配置信息以 JSON 的方式呈现出来，非常便于搭建一条数据处理管线来解析并生成模型。
> 
> `TextMapCHS.json` 存储了简体中文的所有游戏文本，是必不可少的对照文件。~~（不然一大堆 hash 看得人头大）~~

在继续之前，本文假定你已经基本熟悉 HSR 的游戏内容；例如，通过看技能标题和描述，你能对应到具体的角色上。特别地，最好要熟悉一下英文的内容，因为配置内部的很多文本是使用英文表述的。

## 目录

- [角色篇](./turn-based-game-data-character.md)
- [技能树篇](./turn-based-game-data-skill-tree.md)
