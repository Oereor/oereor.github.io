---
layout: note
title: '如何分析 `TurnBasedGameData` 里面的配置文件？'
description: 记录下我磕磕绊绊的分析过程。
---

> [!WARNING]
> 本文仅作为学习用途。请尊重游戏知识产权。

如果你也想跟着分析，首先要把 [TurnBasedGameData](https://github.com/DimbreathBot/TurnBasedGameData) clone 下来。

我们主要关注的是 `ExcelOutput` 目录，以及很重要的 `TextMapCHS.json`。

> `ExcelOutput` 将各类配置信息以 JSON 的方式呈现出来，非常便于搭建一条数据处理管线来解析并生成模型。
> 
> `TextMapCHS.json` 存储了简体中文的所有游戏文本，是必不可少的对照文件。~~（不然一大堆 hash 看得人头大）~~

在继续之前，本文假定你已经基本熟悉 HSR 的游戏内容；例如，通过看技能标题和描述，你能对应到具体的角色上。特别地，最好要熟悉一下英文的内容，因为配置内部的很多文本是使用英文表述的。

# 目录

- [如何解析角色基础信息](#如何解析角色基础信息)
- [如何解析角色技能配置](#如何解析角色技能配置)

# 如何解析角色基础信息

首先明确一点：在这些内部的配置文件中，角色并不是用我们熟知的 `Character` 来称呼的，而是使用 `Avatar`。因此与角色有关的配置文件都应该包含 `Avatar` 这个关键字。

大多数角色的基础配置数据放在 `AvatarConfig.json` 中。~~作为一个蝶厨~~由于**遐蝶**的配置数据比较有代表性（她有忆灵，有仓库技；战技有多个形态），我们以遐蝶的配置为例来分析一下。

这是遐蝶的配置数据：

```
{
    "AvatarID": 1407,
    "AvatarName": {
      "Hash": 6284038990417808171
    },
    "AvatarFullName": {
      "Hash": 8148736795739493904
    },
    "AdventurePlayerID": 1407,
    "AvatarVOTag": "castorice",
    "Rarity": "CombatPowerAvatarRarityType5",
    "JsonPath": "Config/ConfigCharacter/Avatar/Avatar_Castorice_00_Config.json",
    "DamageType": "Quantum",
    "ExpGroup": 1,
    "MaxPromotion": 6,
    "MaxRank": 6,
    "RankIDList": [
      140701,
      140702,
      140703,
      140704,
      140705,
      140706
    ],
    "SkillList": [
      140701,
      140702,
      140703,
      140704,
      140706,
      140707,
      140709
    ],
    "AvatarBaseType": "Memory",
    "DefaultAvatarModelPath": "Characters/CharacterPrefabs/Avatar/Castorice_00/Avatar_Castorice_00.prefab",
    "DefaultAvatarHeadIconPath": "SpriteOutput/AvatarIcon/Avatar/1407.png",
    "AvatarSideIconPath": "SpriteOutput/AvatarRoundIcon/Avatar/1407.png",
    "AvatarMiniIconPath": "SpriteOutput/AvatarMiniIcon/1407.png",
    "AvatarGachaResultImgPath": "SpriteOutput/AvatarDrawCardResult/1407.png",
    "ActionAvatarHeadIconPath": "SpriteOutput/AvatarIconTeam/1407B.png",
    "UltraSkillCutInPrefabPath": "UI/Battle/UltraSkillCutIn/Avatar/UltraSkillCutIn_1407.prefab",
    "UIAvatarModelPath": "Characters/CharacterPrefabs/Manikin/Avatar/Castorice_00/Manikin_Avatar_Maid_Castorice_00.prefab",
    "ManikinJsonPath": "Config/ConfigCharacter/Manikin/Avatar/Manikin_Avatar_Castorice_00_Config.json",
    "AIPath": "Config/ConfigAI/ComplexSkillAIGlobalGroup/Avatar/Avatar_Castorice_00_ComplexSkillAI.json",
    "SkilltreePrefabPath": "UI/Avatar/Widget/MemorySkillTreeGroup.prefab",
    "DamageTypeResistance": [],
    "Release": true,
    "SideAvatarHeadIconPath": "SpriteOutput/AvatarIconTeam/1407.png",
    "WaitingAvatarHeadIconPath": "SpriteOutput/AvatarIconTeam/1407.png",
    "AvatarCutinImgPath": "SpriteOutput/AvatarCutinFigures/1407.png",
    "AvatarCutinBgImgPath": "SpriteOutput/AvatarCutinBg/1407.png",
    "AvatarCutinFrontImgPath": "SpriteOutput/AvatarDrawCard/1407.png",
    "AvatarCutinIntroText": {
      "Hash": 12022188858628007171
    },
    "AvatarDropOffset": [
      36,
      8,
      0.64,
      36,
      8,
      0.64,
      36,
      8,
      0.64
    ],
    "AvatarTrialOffset": [],
    "PlayerCardOffset": [],
    "AssistOffset": [],
    "AssistBgOffset": [],
    "AvatarSelfShowOffset": []
  }
```

很长，对吧？不过有些字段是用不到的。现在逐个字段来检查一下。

## AvatarID

这是内部的角色 ID，是角色的唯一标识符。遐蝶的是 `1407`。ID 是各个配置文件相互联系的核心；你可以将其认为是关系型数据库的主键。

## AvatarName

角色的名称。这其实是一个文本字段。在配置文件里面，几乎所有的文本字段都是以 hash 的方式存储的；而解析这个 hash 就需要用到 `TextMapCHS.json`。方法很简单：把 `hash` 的那串数字复制下来，在 `TextMapCHS.json` 里面查找，就能找到实际的文本了。这里查找的结果是

```
"6284038990417808171": "遐蝶"
```

所以这个角色叫 `遐蝶`。~~(废话，我上面都已经说过了)~~


## AvatarFullName

看字段名称应该是指角色的全名，但是按上面的方法查找对应的文本你会发现找不到。那就直接不管了，或许是什么废弃的字段吧。

## AdventurePlayerID

可能跟剧情有关，但是在我们的数据库里面目前用不着这个。跳过。

## AvatarVOTag

貌似指的是 CV 信息？但是这个字段的值是 `castorice`，正好是遐蝶的英文名字。总之我们再次确认了这就是遐蝶的配置数据。

## Rarity

稀有度。这是个枚举值，`CombatPowerAvatarRarityType5` 显然表示她是 5 星角色。

## JsonPath

表示更具体的配置数据（例如战斗时 Unity camera 的视角一类的东西），暂时用不到。跳过。

## DamageType

战斗属性。这也是个枚举值，`Quantum` 表示量子。顺便给出 7 种属性的枚举：
- 物理：`Physical`
- 火：`Fire`
- 冰：`Ice`
- 雷：`Thunder`（游戏内文本叫 **Lightning**，注意区分）
- 风：`Wind`
- 量子：`Quantum`
- 虚数：`Imaginary`

## ExpGroup

看名字和经验值有关，但是我们用不到。跳过。

## MaxPromotion

最高角色晋阶。这是一个内部约定：`Promotion` 表示的是晋阶（也就是升上去能拿三张通票的那玩意），而 `Rank` 表示星魂（英文对外显示名称为 `Eidolon`，注意区别）。`"MaxPromotion": 6` 表示角色晋阶最高是 6，与游戏内的表现是一致的。

## MaxRank

按照上面说的，这就是最高星魂等级了。

## RankIDList

这个列表里存储了各个星魂的 ID，可以顺着这些 ID 找到具体的星魂配置。一般来说，星魂 ID 的格式为 `{角色 id} + {01-06}`，所以遐蝶的 6 个星魂 ID 分别是 `140701` 到 `140706`。

具体的星魂配置去哪里找、怎么解析，后面会细说。

## SkillList

这个列表存储的是技能组的 ID，也就是**普攻/战技/终结技/天赋**的 ID。注意**忆灵技和忆灵天赋不在此处列出**，仓库技的配置也不在这个地方。~~我当时就踩坑了没找到仓库技导致第一版页面上仓库技描述丢了~~

在[这里](#如何解析角色技能配置)查阅如何寻找这些 ID 对应的具体配置。

## AvatarBaseType

这指的就是角色的命途。`Memory` 对应的是记忆。这里也顺便给出所有命途的对应关系：
- 毁灭：`Warrior`
- 巡猎：`Rogue`
- 智识：`Mage`
- 同谐：`Shaman`
- 虚无：`Warlock`
- 存护：`Knight`
- 丰饶：`Priest`
- 记忆：`Memory`
- 欢愉：`Elation`

--------

**剩下的字段都是和角色视觉资源相关的，不用看了，全部跳过。**

# 如何解析角色技能配置

记得刚才看到的 `SkillList` 里面那串 ID 吗？现在打开 `AvatarSkillConfig.json` 并查找对应的 ID。这次我们以流萤的普通战技为例来看看如何解析，~~因为我是萤厨~~因为该战技恰好涉及到了大部分字段，包括战技点、特殊资源消耗、额外效果等。

流萤的普通战技**指令-天火轰击**对应 ID 是 `131002`。找到的配置片段如下：

```
{
    "SkillID": 131002,
    "SkillName": {
      "Hash": 12824223137962946937
    },
    "SkillTag": {
      "Hash": 11585018240195872680
    },
    "SkillTypeDesc": {
      "Hash": 16911956374043616971
    },
    "Level": 10,
    "MaxLevel": 15,
    "SkillTriggerKey": "Skill02",
    "SkillIcon": "SpriteOutput/SkillIcons/Avatar/1310/SkillIcon_1310_BP.png",
    "UltraSkillIcon": "",
    "LevelUpCostList": [],
    "SkillDesc": {
      "Hash": 6701218138139153826
    },
    "SimpleSkillDesc": {
      "Hash": 3268729078700965563
    },
    "RatedSkillTreeID": [],
    "RatedRankID": [
      131001
    ],
    "ExtraEffectIDList": [
      10000001
    ],
    "SimpleExtraEffectIDList": [
      10000001
    ],
    "ShowStanceList": [
      {
        "Value": 60
      },
      {
        "Value": 0
      },
      {
        "Value": 0
      }
    ],
    "ShowDamageList": [],
    "ShowHealList": [],
    "InitCoolDown": -1,
    "CoolDown": -1,
    "StanceDamageDisplay": 20,
    "SPMultipleRatio": {
      "Value": 0.5
    },
    "BPNeed": {
      "Value": 1
    },
    "SkillNeed": {
      "Hash": 4365819905914455739
    },
    "DelayRatio": {
      "Value": 1
    },
    "ParamList": [
      {
        "Value": 2
      },
      {
        "Value": 0.4
      },
      {
        "Value": 0.6
      },
      {
        "Value": 0.25
      }
    ],
    "SimpleParamList": [
      {
        "Value": 2
      },
      {
        "Value": 0.4
      },
      {
        "Value": 0.6
      },
      {
        "Value": 0.25
      }
    ],
    "StanceDamageType": "Fire",
    "AttackType": "BPSkill",
    "SkillEffect": "SingleAttack"
  }
```

下面来逐条解析。

## SkillID

技能的 ID，在刚才的 `AvatarConfig.json` 里面已经见过了，也是你用来查找技能的标识符。

## SkillName

技能名称。同样使用 hash 在 `TextMapCHS.json` 里面查找实际文本就可以了。这里查出来确实是 `指令-天火轰击`。

## SkillTag

该技能的 tag（单攻/扩散/群攻/辅助，等等）。这里查出来是 `单攻`。

## SkillTypeDesc

技能的类型（普攻/战技/……）。这里查出来是 `战技`。

## Level

技能等级。没错，技能的每个等级都有一条单独的配置，例如我例子里的是 10 级的战技配置。

## MaxLevel

技能最高等级。

## SkillTriggerKey / SkillIcon / UltraSkillIcon / LevelUpCostList

没什么用的字段。跳过。

## SkillDesc

技能描述。这里用 `TextMapCHS.json` 查出来是这样一段话：
```
消耗等同于自身生命上限<unbreak>#2[i]%</unbreak>的生命值固定恢复等同于自身<color=#f29e38ff><unbreak>#3[i]%</unbreak></color>能量上限的能量，对指定敌方单体造成等同于装甲「萨姆」<color=#f29e38ff><unbreak>#1[i]%</unbreak></color>攻击力的火属性伤害。若当前生命值不足，施放战技时装甲「萨姆」的当前生命值降至1点。使自身下一次<u>行动提前</u><unbreak>#4[i]%</unbreak>。
```

可以看到，文本里面带有很多标记。`#2[i]` 这种标记表示这里是[随等级动态变化的参数](#paramlist)的占位符，`#2` 表示填入参数表里面的第二个，后面的 `[i]` 是等级的占位符不用管；其他的标记按正常语义理解即可。

## SimpleSkillDesc

技能描述的简略版本。

## RatedSkillTreeID

貌似与技能树（行迹图）相关，但是我没有深入研究。

## RatedRankID

与此技能相关的星魂 ID。

> 流萤的 1 魂确实加成了战技，所以这里是符合游戏内表现的。

## ExtraEffectIDList

额外的效果说明。如果你在游戏内打开技能面板，就会发现这里的「行动提前」是有效果说明的；这里的 ID 就是关联到这些额外的效果。

## SimpleExtraEffectIDList

同上，但是适用于简略版本的技能描述。

## ShowStanceList

削韧信息。这里面的三个 `Value` 依次代表 **单攻/群攻/扩散** 削韧值，使用的是 HSR 内部的韧性机制，也就是我们游戏内见到的韧性值的 3 倍。

在这个例子中，也就是流萤普通战技的削韧值是**对单 20 点**。

## ShowDamageList

显示伤害信息。

## ShowHealList

显示治疗信息。

## InitCoolDown / CoolDown

技能冷却？星铁里真的有什么技能有冷却吗？

## StanceDamageDisplay

在你准备放技能时显示的削韧值预览。使用的是对外显示的韧性值，**不要乘以 3**。

## SPMultipleRatio

与能量回复有关的神秘字段，我也还没搞清楚这是什么。

BTW，在配置中 `SP` 代表的就是能量，不要误认为是 Skill Point 了。

## BPNeed

`BP` 指的才是战技点。所以这个字段的意思是战技点消耗量。

> 有时你可能会看到 `BPNeed` 的值是 `-1`，那表示不消耗战技点，而不是产点的意思。产点对应的字段是 `BPAdd`。

## SkillNeed

技能消耗的特殊资源。众所周知流萤普通战技烧血，解析一下这个 hash 得到 `<unbreak>#2[i]%</unbreak>生命值`，填入[动态参数](#paramlist)里面对应的参数值就变成 `40%生命值`。

## DelayRatio

这似乎与推/拉条有关，但我也还没研究清楚。

## ParamList

在技能文本里面需要填入的动态参数。我们把这些填进上面的[技能描述](#skilldesc)里面，就变成了
```
消耗等同于自身生命上限<unbreak>40%</unbreak>的生命值固定恢复等同于自身<color=#f29e38ff><unbreak>60%</unbreak></color>能量上限的能量，对指定敌方单体造成等同于装甲「萨姆」<color=#f29e38ff><unbreak>200%</unbreak></color>攻击力的火属性伤害。若当前生命值不足，施放战技时装甲「萨姆」的当前生命值降至1点。使自身下一次<u>行动提前</u><unbreak>25%</unbreak>。
```

这样是不是就熟悉多了？

## SimpleParamList

简略描述用到的参数列表，与上面类似，不再赘述。

## StanceDamageType

削韧属性，这里是火属性削韧。

## AttackType / SkillEffect

攻击类型和技能效果。这里是消耗战技点的攻击，并且是单攻。这两个字段基本没什么用。