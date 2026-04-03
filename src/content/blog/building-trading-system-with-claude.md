---
title: "How I Built My Crypto Trading Signal System with Claude"
titleVN: "Tôi xây dựng hệ thống tín hiệu giao dịch với Claude như thế nào"
description: "No ML background. No quant team. Just good prompts and a weekend. Here's exactly how I built a working signal engine using Claude's Extended Thinking."
descriptionVN: "Không có nền tảng ML, không có đội quant. Chỉ cần prompt tốt và một cuối tuần. Đây là cách tôi xây dựng hệ thống tín hiệu giao dịch thực sự hoạt động với Claude."
pubDate: 2025-03-15
category: "AI Tutorial"
readTime: 12
tags: ["Claude", "Trading", "Python", "Crypto"]
tagsVN: ["Claude", "Giao dịch", "Python", "Crypto"]
---

I've been trading crypto for two years. For most of that time I was doing everything manually — scanning charts, reading news, gut-feel entries. I wanted systematic signals but assumed I'd need a quant background or expensive tools to get there.

Then I started experimenting with Claude.

## The problem I was trying to solve

Manual trading has one fatal flaw: you can't watch the market 24/7. Crypto doesn't close. I kept missing setups overnight or making emotional decisions after big moves.

What I wanted:
- A system that monitors conditions I define
- Fires a signal when conditions are met
- Explains *why* it fired, not just that it fired

## Step 1 — Describing my logic to Claude

I described my trading logic in plain language. No jargon — just exactly what I wanted:

> "I want to buy BTC when: the 4-hour RSI crosses above 35 AND weekly volume is above the 20-period average AND the funding rate on Binance is negative."

Claude turned this into working Python in about 4 minutes.

```python
def check_signal(symbol='BTC/USDT'):
    df['rsi'] = RSIIndicator(df['close'], window=14).rsi()
    rsi_cross = df['rsi'].iloc[-2] < 35 and df['rsi'].iloc[-1] >= 35
    vol_ok = df['volume'].iloc[-1] > df['volume'].rolling(20).mean().iloc[-1]
    return rsi_cross and vol_ok
```

## Step 2 — Using Extended Thinking to find edge cases

I asked Claude to find every scenario where the strategy would fire incorrectly. It identified three issues:

1. **Bear trap on low-liquidity hours** — RSI can cross 35 during Asian session with a single large order
2. **Funding rate lag** — Binance funding rates update every 8 hours, data can be stale
3. **Consecutive signals** — strategy could fire multiple times in one 4-hour window

Each of these would have cost me real money.

## Step 3 — Backtesting

Results over 24 months of BTC 4-hour data:
- 47 signals fired
- 66% win rate
- Average gain: +4.2%
- Sharpe ratio: 0.87

## What I'd do differently

**Start with the edge cases, not the happy path.** Ask for failure modes first.

**Keep the strategy explainable.** Simple rules beat optimized black boxes.

**Paper trade 30 days before going live.** The backtest looked great — live is different.
