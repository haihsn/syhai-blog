---
title: The Worst Full House
titleVN: ''
description: Would you call this on river?
descriptionVN: ''
pubDate: 2026-07-28
category: Poker
readTime: 7
cover: ''
tags: []
tagsVN: []
draft: false
bodyVN: ''
---

_Why I'm writing this one down_

_For three years, my routine after a notable hand has been the same: play it, sit with it, then bring it to my mentor (in this case Claude Opus lolll) and take the lesson. Almost every time, the answer resolved into EV. Someone explained the math, I agreed, I wrote down the adjustment, I moved on. That process has never failed me._

_This hand broke the pattern. Not because the math was wrong, the math was clean and I agree with all of it. It broke the pattern because the math answered a question I wasn't actually asking_.

## 1. The Hand

**Blinds 6,000 / 12,000, 12,000 BB ante.** 22 players left. 16 get paid. Average stack 220,000. Roughly 4.84M chips in play.

**UTG (400,000)** opens to 25,000. Folds to me on the **button with 4♦4♣ (350,000)**. I call. SB calls. BB calls. **Pot: 100,000.**

**Flop: K♠ 9♥ 4♦** — rainbow. I have bottom set. UTG c-bets 35,000. I call. SB folds. BB folds. **Pot: 170,000.**

**Turn: J♣** UTG bets 70,000. I call. **Pot: 310,000.** I have 220,000 behind. He has 270,000.

**River: J♠** UTG jams. Effectively 220,000 into 310,000.

I hold fours full of jacks.

## 2. What I felt on the turn 

I want this part on the record honestly, because it's the real subject of the entry.

On the turn I was not thinking about protection. I was thinking about the size of the pot if I won it. Around 300,000 in the middle and over 200,000 behind for each of us. Whoever won this hand was going to have something like 750,000 chips, about 3.4 times the average >>> close to one sixth of every chip in the tournament, with 22 players left and 16 paying.

From that stack, the path to the win is _visible_. You can see it. That's not a poker thought, it's a want.

So when he bet 70,000 on the turn, I didn't ask "what's the best play." I asked "how do I make sure I get all of it." Those feel like the same question. They are not.

## 3. The question I actually asked my Opus

I've kept my wording because the shape of the mistake is inside it:

> _"If I raised on the turn, I may fold him if he has something like Kx / QJ. And if he had KJ, he will call my raise and jam-raise anyway. So I want to keep him in no matter what he holds?"_

I still think that's a good question. It's also, word for word, the reasoning that cost me the pot.

## 4. The answer

> "Keep him in" and "raise the turn" are the same line, not opposites.On K 9 4 J with 44, every one-pair hand in his range has **exactly 0% equity.** AK, KQ, KT cannot win. Whatever the river brings, I finish with at least a set, usually a full house. If a King comes, he makes trips and I make fours full. He is drawing dead and doesn't know it.A raise to 200,000 asks him to call 130,000 into a 440,000 pot — 3.4 to 1. Top pair on a King-high board calls that price. **So the raise doesn't fold out my value; it charges a dead hand 200,000.** The hands that do fold — AJ, QJ, missed barrels — are precisely the ones the river Jack turns into trip jacks that jam me off my equity.And KJ, the hand I used as my _reason_ to slowplay, is the strongest argument against it. On the turn KJ has 4 outs and I'm 91%. On the river KJ is jacks full and I'm 0%. "He'll get it in anyway" is true. The question is _at what price._ \*\*The turn is where KJ pays me. The river is where KJ owns me.\*\*Calling didn't keep his range in. It resurrected it. Nine river cards out of forty-six — 20% — pair the board and hand a veto to hands that had none.

## 5. Which combos actually beat me

This is where I found the thing I couldn't see at the table. My instinct was _"almost the only hand that beats me is KJ."_ Let me test it properly.

### On the river (board K 9 4 J J, I hold 44 — fours full of jacks)


| \n |

Against that, the hands I _beat_ that still jam: every AJ (\~8), QJ and JT (\~4), AK / KQ / KT two pair (12+, and plenty of players jam those on a paired board), plus every missed double-barrel — AQ, AT, QT, T9s.

So KJ is roughly half the range that beats me, not all of it. My instinct was incomplete as a **river read.**

### But now the important part

My reads on the other combos, and what they turn out to mean:

- **KK.** I thought this checks the flop — top pair on a dry rainbow board. I was wrong on two counts. On K94 he doesn't have top _pair_, he has top _set_. And a 35,000 c-bet into a 100,000 four-way pot is exactly what top set wants to do: keep everyone in cheaply, build toward a big turn. The small sizing argues _for_ KK, not against it. It's only 3 combos, but I shouldn't have discounted it on the action.
- **JJ.** I thought a King on a multiway flop made JJ unlikely. It isn't especially unlikely — but it doesn't matter, because it's 1 combo and it's quads. If he has quads, he wins. Nothing here to learn.
- **99.** Pure setup. Middle set, c-bets, barrels the turn, rivers nines full. 3 combos. Also nothing to learn.

**Then I noticed what all three have in common.**

On the turn — board K 9 4 J — KK was a set of kings, 99 was a set of nines, JJ was a set of jacks. **All three were already ahead of my set of fours.**

Which means: **raising the turn does not save me from a single one of them.** I was losing to those combos whether I raised, called, or folded. They are not part of the decision.

Strip them out, and only one hand is left that the turn raise actually protects me from: **KJ.** (Plus a lonely J9s combo.)

So my instinct at the table was right about the thing that mattered most. _We can only really lose to KJ_ — not as a description of his river range, but as a description of **the entire incremental cost of calling the turn.** Every other hand that beat me on the river beat me on the turn too. Calling bought nothing and paid for exactly one thing:

**It let KJ walk from 9% to 100%.**

## 6. Every branch of the turn decision

**Turn: K 9 4 J rainbow. I hold 44. Pot 240,000 after his 70,000. I have 290,000 behind.**

<iframe src="/interactives/worst-full-house-decision-tree.html" style="width:100%; height:700px; border:1px solid var(--rule);" title="Poker decision tree"></iframe>

I had told myself that if the board paired I could just fold. **Look at B2a and B2b. There is no fold there.** On either card I make a full house that beats every trips hand in his range, facing a jam at 2.4 to 1. Too strong to fold, too weak to be glad about. That was never an escape hatch. That was the trap, and it was the whole price of the turn call.

And read the two branches side by side:

Branch A's _worst realistic_ outcome is **530,000 with zero elimination risk.** Branch B's _best_ outcome is **630,000.** I paid a 20% chance of a coinflip for my tournament to win 100,000 extra in the good branch.

## 7. The reframe

Before writing this, my summary of the hand was:

> _"The math always recommends protection for a strong hand. But in live MTT it doesn't work like that. You always want to win it full — and then the result is catastrophic."_

That sentence is where the hand was still beating me. It sets up math against instinct, and it gets the math wrong.

**The turn raise was not a protection play. It was the maximum value play.**

Protection means denying equity to hands that have some. Kx had _none_. Raising to 200,000 was not shielding my hand — it was **charging a dead man 200,000 chips.** The line I took in the name of "winning it full" is the line that gave his range life.

So it was never math versus instinct. My instinct — _he's drawing dead, keep him in, get all of it_ — was **correct.** I applied it one street too late. I applied it on the street where the board could still turn against me, instead of the street where I was 100% and knew it.

The thing that makes this hand different from every hand I've reviewed before: **the same 220,000 went in either way.** Branch A2 and Branch B2a are both "all the chips, one opponent, one card left or none." What changed is not the amount at risk. What changed is **whether the deck had already finished deciding.**

On the turn I was 100% and I knew it. On the river I was 55% and I couldn't know.

That's not an EV lesson — the EV resolves it cleanly, and it always did. It's a lesson about _when_ I commit relative to when the board stops speaking. Which is why the math answer felt like it didn't cover the hand. It covered the decision perfectly. It didn't cover the feeling of having handed my tournament to a Jack.

## 8. The rule I'm taking

> **When I am at maximum strength and the board can still pair against me, that is the street. Not the next one.**

Corollaries:

1. **A slowplay is only free when the board can't reverse my hand's meaning.** On K94 rainbow with bottom set, 20% of runouts convert my monster into a bluffcatcher. That's not a free slowplay. That's a deferred coinflip.
2. **"He'll get it in anyway" is an argument about price, not about whether to raise.** Ask on which street he pays the most for the least equity. Here it was the turn, by a mile.
3. **Small c-bet sizing on a dry board doesn't mean weakness.** It's often top set building a pot. I discounted KK for exactly the wrong reason.
4. **Uncontested pots are worth more than their chip count near a bubble.** 530,000 with zero risk, six from the money, is not the consolation prize. I treated it as one.

## 9. What is still unresolved

I don't want to close this entry pretending it's fixed.

The pull I felt on the turn — seeing 750,000 chips and a visible road to the trophy — was not a calculation error. It was a want, and it will be there again. Writing a paragraph about it doesn't remove it. What I can do is install a trigger: **when I catch myself thinking about the size of the pot instead of the strength of my hand relative to the board, that is the moment to raise, not to call.** The want itself is the tell.

I'll know whether that works the next time I flop a set on a board that can pair.

_River decision, for the record: I call. 2.4 to 1 with fours full against a range stuffed with trip jacks and two pair is not close, and the ICM premium six off the money doesn't bridge a gap that large. The river was the easy part. The turn was the hand._
