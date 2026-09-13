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

## 敌方单位实例

敌方单位的弱点/抗性、技能组等数据是绑带在具体的个体身上的。我们以「可可利亚，虚妄之母」为例，来看看具体个体的字段配置。

```
{
    "MonsterName": {
      "Hash": 11060815478526403306
    },
    "MonsterIntroduction": {
      "Hash": 11835800330885102460
    },
    "MonsterStrategy": [],
    "MonsterID": 1005010,
    "MonsterTemplateID": 1005010,
    "EliteGroup": 1,
    "HardLevelGroup": 1,
    "AttackModifyRatio": {
      "Value": 1
    },
    "DefenceModifyRatio": {
      "Value": 1
    },
    "HPModifyRatio": {
      "Value": 1
    },
    "SpeedModifyRatio": {
      "Value": 1
    },
    "StanceModifyRatio": {
      "Value": 1
    },
    "StanceWeakList": [
      "Fire",
      "Thunder",
      "Quantum"
    ],
    "DamageTypeResistance": [
      {
        "DamageType": "Physical",
        "Value": {
          "Value": 0.4
        }
      },
      {
        "DamageType": "Ice",
        "Value": {
          "Value": 0.6
        }
      },
      {
        "DamageType": "Wind",
        "Value": {
          "Value": 0.4
        }
      },
      {
        "DamageType": "Imaginary",
        "Value": {
          "Value": 0.2
        }
      }
    ],
    "DebuffResist": [
      {
        "Key": "STAT_CTRL_Frozen",
        "Value": {
          "Value": 1
        }
      },
      {
        "Key": "STAT_Confine",
        "Value": {
          "Value": 1
        }
      }
    ],
    "CustomValueTags": [],
    "CustomValues": [
      {
        "BFLIFKBEOPJ": "Monster_W1_CocoliaP2_00_SummonMonsterID01",
        "MNDFOPKBHKP": 1002013
      },
      {
        "BFLIFKBEOPJ": "Monster_W1_CocoliaP2_00_SummonMonsterID02",
        "MNDFOPKBHKP": 1002014
      }
    ],
    "DynamicValues": [],
    "SummonIDList": [
      1002013,
      1002014
    ],
    "OverrideAIPath": "",
    "OverrideAISkillSequence": [],
    "AbilityNameList": [],
    "SkillList": [
      100501001,
      100501002,
      100501003,
      100501004,
      100501005,
      100501006,
      100501007,
      100501008,
      100501009
    ],
    "OverrideSkillParams": []
  }
```

### MonsterName / MonsterIntroduction

敌方单位的名字/简介。在 `TextMapCHS.json` 里面用 hash 解析出文本即可。

### MonsterTemplateID

该具体实例套用的模板 ID。

### MonsterID

该具体实例的 ID。这里你会发现 ID 和模板的一样。

一般来说，具体实例的 ID 是模板 ID 加上两位数的后缀，例如 `100501001` `100501002` 等；但是始终有一个特殊的实例个体，它的 ID 就是模板的 ID。我们并不清楚游戏内的具体机制如何，我一般将此实例称为「默认个体」。

### {Attack/Defence/HP/Speed/Stance}ModifyRatio

看名字就知道，攻击力/防御力/生命值/速度/韧性值的乘区。

### StanceWeakList

依旧望文生义，弱点列表。

### DamageTypeResistance

抗性列表。下面的值几乎是在写大白话了吧？

### DebuffResist

抵抗某些特定负面状态的概率。在本例中：
- `STAT_CTRL_Frozen: 1` 代表抵抗冻结状态的概率是 100%；也就是说，在没有无视抗性的情况下，可可利亚是冻不住的。
- `STAT_Confine: 1` 代表抵抗禁锢状态的概率是 100%；同样，在没有无视抗性的情况下，可可利亚也不会陷入禁锢状态。

其他的一些负面状态抗性还包括灼烧/风化/纠缠抵抗等。

### SummonIDList

这个名字很直观了。召唤物 ID。

### SkillList

技能组列表。跟角色的技能组配置很像。~~废话，都是技能，能不像吗~~