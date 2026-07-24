---
title: 随机、概率与近似算法
description: 用随机性、概率摘要和近似换取效率
---

# 随机、概率与近似算法

当精确答案太慢、数据太大或对抗输入会伤害性能时，随机和近似算法提供另一种选择。

## 知识目录

| 家族 | 主题 |
| --- | --- |
| 随机排列 | Fisher–Yates 洗牌 |
| 随机选择 | 随机快速排序、Quickselect |
| 流式采样 | Reservoir Sampling |
| 概率算法 | Monte Carlo、Las Vegas |
| 概率集合 | Bloom Filter、Cuckoo Filter |
| 频率摘要 | Count-Min Sketch、Misra–Gries |
| 基数估计 | HyperLogLog |
| 数值估计 | 随机积分、随机游走 |
| 元启发式 | 模拟退火、遗传算法、禁忌搜索 |
| 近似算法 | 集合覆盖、顶点覆盖、装箱、旅行商近似 |

## 两类随机算法

- Monte Carlo：运行时间通常可控，但答案有小概率出错；
- Las Vegas：答案保证正确，但运行时间具有随机性。

学习时必须同时记录误差概率、随机源、可复现种子和最坏情况。
