# Interview Dashboard - Visual Layout Guide

## Dashboard Layout Overview

The Interview Dashboard is organized in a responsive, modern layout with multiple sections for comprehensive interview analysis.

```
┌─────────────────────────────────────────────────────────────┐
│                     HEADER SECTION                          │
│  ← Back  | Interview Dashboard               [Download PDF] │
│          | Full Stack Development - Resume Based Mock       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              PERFORMANCE SUMMARY CARDS (4 Columns)         │
├──────────────────────────┬──────────────────────────────────┤
│ Trophy   Overall Score   │ TrendingUp Performance           │
│ 80%      80% of 100      │ [Badge: Excellent]              │
├──────────────────────────┼──────────────────────────────────┤
│ Check    Accuracy        │ Clock    Avg Response            │
│ 16       16 incorrect: 4 │ 12.5s    per question           │
└──────────────────────────┴──────────────────────────────────┘

┌────────────────────────────────────────┬────────────────────┐
│          MAIN CONTENT (Left - 2/3)     │ SIDEBAR (Right 1/3)│
├────────────────────────────────────────┼────────────────────┤
│ 📊 PERFORMANCE BREAKDOWN               │ 🏆 STRENGTHS       │
│ ├─ Question Accuracy: [████████░░ 80%]│ ├─ Strong grounding│
│ ├─ Correct:    16  (Green)            │ ├─ Quick problem   │
│ ├─ Incorrect:   4  (Red)              │ └─ Good time mgmt  │
│ └─ Avg Time: 12.5s                    │                    │
│                                        │ 💡 AREAS TO IMPROVE│
│ 🎯 RESUME-BASED INTERVIEW DETAILS     │ ├─ Advanced React  │
│ ├─ Experience: Mid-level Developer    │ ├─ Database opt    │
│ └─ Skills Assessed:                   │ └─ System design   │
│    [React] [Node.js] [MongoDB] [...]  │                    │
│                                        │ 🎯 RECOMMENDATIONS │
│ ⚡ QUESTION-BY-QUESTION REVIEW        │ ├─ Practice React  │
│ ├─ Q1. [What is Virtual DOM?] ✓       │ ├─ Learn Docker    │
│ │   [Easy] [Correct]                  │ └─ Work on projects│
│ ├─ Q2. [Explain Closures] ✓           │                    │
│ │   [Medium] [Correct]                │ 📋 NEXT STEPS      │
│ ├─ Q3. [Design a Chat App] ✗          │ [Take Another Test]│
│ │   [Hard] [Incorrect]                │ [Review Materials] │
│ │   Your Answer: [...]                │                    │
│ │   Correct Answer: [...]             │                    │
│ └─ ...                                 │                    │
└────────────────────────────────────────┴────────────────────┘
```

## Responsive Design Breakpoints

### Desktop View (1024px+)
```
┌────────────────────────────────────────┬──────────────────┐
│         Main Content (2/3)             │  Sidebar (1/3)   │
│  ┌──────────────────────────────────┐  │ ┌──────────────┐ │
│  │ Performance Breakdown            │  │ │ Strengths    │ │
│  └──────────────────────────────────┘  │ └──────────────┘ │
│  ┌──────────────────────────────────┐  │ ┌──────────────┐ │
│  │ Resume Interview Details         │  │ │ Areas to     │ │
│  └──────────────────────────────────┘  │ │ Improve      │ │
│  ┌──────────────────────────────────┐  │ └──────────────┘ │
│  │ Question-by-Question Review      │  │ ┌──────────────┐ │
│  │                                  │  │ │ Recommend.   │ │
│  │                                  │  │ └──────────────┘ │
│  │                                  │  │ ┌──────────────┐ │
│  │                                  │  │ │ CTA Section  │ │
│  └──────────────────────────────────┘  │ └──────────────┘ │
└────────────────────────────────────────┴──────────────────┘
```

### Tablet View (768px - 1024px)
```
┌──────────────────────────┬──────────────┐
│   Main Content (2/3)     │ Sidebar (1/3)│
│ ┌────────────────────┐   │ ┌──────────┐ │
│ │ Performance        │   │ │Strengths │ │
│ └────────────────────┘   │ └──────────┘ │
│ ┌────────────────────┐   │ ┌──────────┐ │
│ │ Resume Details     │   │ │ Areas    │ │
│ └────────────────────┘   │ └──────────┘ │
│ ┌────────────────────┐   │ ┌──────────┐ │
│ │ Questions          │   │ │ Rec.     │ │
│ │                    │   │ └──────────┘ │
│ │                    │   │ ┌──────────┐ │
│ └────────────────────┘   │ │ CTA      │ │
│                          │ └──────────┘ │
└──────────────────────────┴──────────────┘
```

### Mobile View (< 768px)
```
┌──────────────────────┐
│   Full Width (100%)  │
├──────────────────────┤
│ Performance Cards    │
│  [80%] [Good]        │
│  [16] [12.5s]        │
├──────────────────────┤
│ Performance Details  │
├──────────────────────┤
│ Resume Details       │
├──────────────────────┤
│ Questions Review     │
├──────────────────────┤
│ Strengths            │
├──────────────────────┤
│ Areas to Improve     │
├──────────────────────┤
│ Recommendations      │
├──────────────────────┤
│ CTA Section          │
└──────────────────────┘
```

## Component Colors & States

### Performance Level Badges
```
┌──────────────────────────────────────────┐
│ Excellent Score >= 80%                   │
│ 🟢 Green (from-green-500 to-emerald-500) │
├──────────────────────────────────────────┤
│ Good Score 60-79%                        │
│ 🔵 Blue (from-blue-500 to-cyan-500)      │
├──────────────────────────────────────────┤
│ Average Score 40-59%                     │
│ 🟡 Yellow (from-yellow-500 to-orange-500)│
├──────────────────────────────────────────┤
│ Needs Improvement < 40%                  │
│ 🔴 Red (from-red-500 to-pink-500)        │
└──────────────────────────────────────────┘
```

### Question Status Indicators
```
┌──────────────────────────────────────┐
│ Question Header                      │
├──────────┬──────────────┬────────┬──┤
│ Q1.      │ Question Text| [Badge]│✓ │ Correct (Green)
└──────────┴──────────────┴────────┴──┘

┌──────────────────────────────────────┐
│ Question Header                      │
├──────────┬──────────────┬────────┬──┤
│ Q2.      │ Question Text| [Badge]│✗ │ Incorrect (Red)
└──────────┴──────────────┴────────┴──┘
```

### Difficulty Color Coding
```
Easy      [Green badge]    ✓✓✓
Medium    [Yellow badge]   ✓✓
Hard      [Red badge]      ✓
```

## Interactive Elements

### Expandable Questions
```
DEFAULT STATE:
┌─ Q1. What is...? [Easy] ✓
│  Show answer on click

EXPANDED STATE:
├─ Q1. What is...? [Easy] ✓
│  ├─ Your Answer:
│  │  Your answer text...
│  ├─ Correct Answer:
│  │  Correct answer text...
│  └─ Response Time: 8.5s
└─ Click again to collapse
```

### Performance Progress Bar
```
Question Accuracy: 80%
████████░░░░░░░░░░░░ 80%

Smooth gradient fill from left to right
Green for high accuracy
```

## Dark Mode Support

All elements have automatic dark mode support:
- Background adapts to dark theme
- Text colors adjust for readability
- Badges maintain contrast in dark mode
- Icons remain visible in both themes

## Card Styles

### Gradient Cards (Summary)
```
┌─────────────────────────────────────┐
│ 🏆 Overall Score                    │ Light gradient background
│ 80%                        80% of 100│ Icon + label + value
└─────────────────────────────────────┘
```

### Filled Cards (Main Content)
```
┌─────────────────────────────────────┐
│ 📊 Performance Breakdown            │ Title with icon
├─────────────────────────────────────┤ Divider
│ Question Accuracy                   │ Content section
│ ████████░░ 80%                      │ Progress bar
│                                     │
│ [Correct: 16] [Incorrect: 4]       │ Statistics
└─────────────────────────────────────┘
```

### Border Left Cards (Insights)
```
│ 🏆 Strengths                        ← 4px colored left border
├─────────────────────────────────────│
│ ✓ Strong fundamentals               │
│ ✓ Quick problem-solving             │
│ ✓ Good time management              │
└─────────────────────────────────────┘
```

## Animation & Transitions

- **Progress Bars**: Smooth fill animation (500ms)
- **Hover Effects**: Subtle shadow increase on cards
- **Loading State**: Animated spinner with pulsing effect
- **Expandable Questions**: Smooth height transition

## Typography Hierarchy

- **Page Title**: 3xl font bold
- **Section Title**: lg font semibold
- **Card Title**: base font semibold
- **Body Text**: sm font regular
- **Label Text**: xs font medium
- **Badge Text**: xs font semibold

## Spacing & Padding

- **Page Padding**: 2rem (8px) to 2rem (32px)
- **Card Padding**: 1.5rem (24px)
- **Section Spacing**: 2rem (32px)
- **Element Gap**: 1rem to 1.5rem

## Key Features Summary

1. **Header**: Navigation, title, download button
2. **4-Card Summary**: Quick glance statistics
3. **Performance Chart**: Visual progress representation
4. **Resume Info**: Experience and skills that were assessed
5. **Question Review**: Detailed breakdown with expandable answers
6. **Sidebar Insights**: Strengths, improvements, recommendations
7. **CTA Section**: Next steps buttons
8. **Responsive Design**: Adapts to all screen sizes
9. **Dark Mode**: Full support for dark theme
10. **Smooth Interactions**: Transitions and animations

This layout ensures users get a comprehensive view of their performance while maintaining a clean, professional interface.
