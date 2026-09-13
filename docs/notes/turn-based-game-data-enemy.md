---
layout: doc
title: 'TurnBasedGameData ——敌方单位篇'
date: 2026-09-13
---

# {{ $frontmatter.title }}

敌方单位的配置与角色有很大的不同。众所周知星穹铁道里面~~有很多换皮怪~~有很多敌方单位会在各个不同的场景下出现，包括主线、活动、材料本/遗器本、周本，深渊，等等。不同场景下出现的怪各需要不同的配置，那么总不能每个怪都完整地写一遍配置字段吧？要知道敌方单位的等级从 1 到 100 都有的，如果每个等级还要再配置一遍，工作量就是无法接受的了。

因此，敌方单位的配置将不同的维度分离，采用了「模板 + 实例」的方式；如果你了解**面向对象**的思想，大可以直接把「模板」看成一个敌方单位的类，而具体的敌方单位配置都是这个类或者其派生类的实例。

等级的配置又是一个单独的文件，这是因为等级实际上只控制若干个属性数据的乘区，并不引入特殊的机制。

## 模板

我们先从最基础的模板开始看起。敌方单位的模板定义在 `MonsterTemplateConfig.json` 中，这里我们挑出帕姆（~~沟槽的帕姆王~~）为例，来看看里面的字段要如何解释。

```
  {
    "MonsterName": {
      "Hash": 3416332227273864389
    },
    "MonsterStrategy": [],
    "MonsterTemplateID": 5014020,
    "Rank": "LittleBoss",
    "NPCMonsterList": [
      5014020
    ],
    "MonsterCampID": 17,
    "TemplateGroupID": 5014020,
    "AtlasSortID": 16,
    "IconPath": "SpriteOutput/MosterIcon/Monster_5014020.png",
    "RoundIconPath": "SpriteOutput/MonsterRoundIcon/Monster_5014020.png",
    "ImagePath": "SpriteOutput/MonsterFigure/Monster_5014020.png",
    "ManikinImagePath": "SpriteOutput/MonsterMiddleIcon/Monster_5014020.png",
    "JsonConfig": "Config/ConfigCharacter/Monster/Monster_W5_Pam_00_Config.json",
    "PrefabPath": "Characters/CharacterPrefabs/Monster/W5_Pam_00/Monster_W5_Pam_00.prefab",
    "ManikinPrefabPath": "Characters/CharacterPrefabs/Manikin/Monster/W5_Pam_00/Manikin_Monster_W5_Pam_00.prefab",
    "ManikinConfigPath": "Config/ConfigCharacter/Manikin/Monster/Manikin_Monster_W5_Pam_00_Config.json",
    "AttackBase": {
      "Value": 18
    },
    "DefenceBase": {
      "Value": 210
    },
    "HPBase": {
      "Value": 3487.5
    },
    "SpeedBase": {
      "Value": 120
    },
    "StanceBase": {
      "Value": 720
    },
    "CriticalDamageBase": {
      "Value": 0.2
    },
    "StatusResistanceBase": {
      "Value": 0.3
    },
    "InitialDelayRatio": {
      "Value": 0.5
    },
    "StanceCount": 1,
    "StanceType": "Quantum",
    "AIPath": "Config/ConfigAI/Monster_W5_Pam_00_AI.json",
    "AISkillSequence": [],
    "NatureID": 1,
    "MinimumFatigueRatio": {
      "Value": 0.2
    }
  }
```

**以下没列出来的字段就表示不重要。**

### MonsterName

这个模板的名字，也就是战斗中看到的敌方名称。这里在 `TextMapCHS.json` 里面查找对应的 hash 得到「合金机铠·帕姆王」。

### MonsterTemplateID

模板 ID。后面我们还会看到一个叫 `MonsterID` 的字段，那是针对具体敌方实例的，不要和这个搞混了；不过二者的确有密切的联系。

### Rank

敌方单位的类型（普通/精英/首领）。这个字段的值是枚举，包括如下的值：
- `Minion` / `MinionLv2`：普通敌人，也就是小怪（能被黄泉/白厄/银狼/姬子秘技秒掉的那种）
- `Elite`：精英，例如黑日狮鹫（~~最关键！~~）
- `LittleBoss`：非周本的首领敌人，例如帕姆王
- `BigBoss`：大 BOSS，要进周本的。例如铁墓

### AttackBase / DefenceBase / HPBase / SpeedBase

基础攻击力/防御力/生命值/速度。你可能已经注意到了，这些值都好小啊，那深渊几千万的血量是怎么来的呢？以后或许可以在深渊篇见到。

### StanceBase

基础韧性值，采用内部单位。在游戏里看到的是这个值的三分之一，也就是说帕姆王的基础韧性实际上是 `240`。

### CriticalDamageBase

基础暴击伤害。~~真的有哪个怪打人会暴击吗~~

### StatusResistanceBase

基础效果抵抗。一般来说这个值应该是**小怪 < 精英 < BOSS**，~~但是以星铁的数值膨胀速度一切皆有可能~~

### InitialDelayRatio

字段直译是「首回合延迟」，不过实际上说的是首回合行动值。大部分的怪首回合行动值都是 100%，也就是说这个值应该是 `1`；但是沟槽的帕姆王是 50%，等效于首回合拉条 50%。

### StanceCount

控制有几管韧性条的。例如~~丑得要命的~~「金血忆灵·裁定忘却之形」就有 4 管韧性。