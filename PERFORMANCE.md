# Performance Report

## Baseline (Slow Version)

| Metric / Issue    | Baseline Score / Observation        | Root Cause Analysis                                            | Proposed Solution Hypothesis                                       |
| ----------------- | ----------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------ |
| LCP               | Pending (run Lighthouse)            | Large unoptimized hero image and large bundle blocking render. | Compress and resize hero image, add srcset, and reduce initial JS. |
| INP (via TBT)     | Pending (run Lighthouse + DevTools) | Re-rendering 500+ rows on every filter keystroke.              | Virtualize list and memoize heavy components.                      |
| CLS               | Pending (run Lighthouse)            | Hero image loads without dimensions.                           | Add explicit width and height attributes.                          |
| Bundle Size       | Pending (run build + analyzer)      | Full lodash import and no code splitting.                      | Use cherry-picked imports and lazy-load secondary UI.              |
| Network Waterfall | Pending (inspect Network tab)       | Sequential fetching of 500 items.                              | Fetch with Promise.all in parallel.                                |

## Optimization Log

### 1) Parallelize Network Requests

- Change made: Pending
- Before: Pending
- After: Pending
- Why it improved: Pending

### 2) Implement List Virtualization

- Change made: Pending
- Before: Pending
- After: Pending
- Why it improved: Pending

### 3) Optimize Dependencies and Expensive Calculations

- Change made: Pending
- Before: Pending
- After: Pending
- Why it improved: Pending

### 4) Optimize Image Delivery

- Change made: Pending
- Before: Pending
- After: Pending
- Why it improved: Pending

### 5) Implement Code Splitting

- Change made: Pending
- Before: Pending
- After: Pending
- Why it improved: Pending

## Notes

- Use Lighthouse Performance reports for each step.
- Capture TBT and CLS from Lighthouse; confirm long tasks with DevTools Performance panel.
