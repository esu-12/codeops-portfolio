# Addis Eats Performance Report

## Baseline

- **Audit date:** October 15, 2026
- **Route:** `/menu`
- **Device:** Emulated Moto G Power
- **Network:** Slow 4G
- **Tool:** Lighthouse 13.4.1

| Metric                          |          Before optimization |
| ------------------------------- | ---------------------------: |
| Performance score               |                           55 |
| Accessibility score             |                           92 |
| Best Practices score            |                          100 |
| SEO score                       |                           82 |
| First Contentful Paint (FCP)    |                        1.2 s |
| Largest Contentful Paint (LCP)  |                        3.0 s |
| Total Blocking Time (TBT)       |                    10,420 ms |
| Cumulative Layout Shift (CLS)   |                            0 |
| Speed Index                     |                       12.3 s |
| Interaction to Next Paint (INP) | Not reported by this lab run |

## Changes

- Replaced plain image elements with `next/image` where applicable.
- Added image dimensions and responsive `sizes` values.
- Reviewed image priority to ensure only the intended largest above-the-fold image receives priority.
- Reviewed font loading; no Google Fonts link or CSS font import was found.
- Checked application code for third-party scripts; none were found.
- Added `.env.example` with a placeholder for `SESSION_SECRET`.
- Confirmed `.env.local` is ignored by Git.

## After Optimization

- **Audit date:** October 16, 2026, 10:47 AM GMT+3
- **Route:** `/menu`
- **Device:** Emulated Moto G Power
- **Network:** Slow 4G
- **Tool:** Lighthouse 13.4.1

| Metric                          |       Before |        After |
| ------------------------------- | -----------: | -----------: |
| Performance score               |           55 |           70 |
| Accessibility score             |           92 |           92 |
| Best Practices score            |          100 |          100 |
| SEO score                       |           82 |           82 |
| First Contentful Paint (FCP)    |        1.2 s |        1.1 s |
| Largest Contentful Paint (LCP)  |        3.0 s |        2.6 s |
| Total Blocking Time (TBT)       |    10,420 ms |     1,660 ms |
| Cumulative Layout Shift (CLS)   |            0 |            0 |
| Speed Index                     |       12.3 s |        2.7 s |
| Interaction to Next Paint (INP) | Not reported | Not reported |

## Analysis

- Performance increased by 15 points, from 55 to 70.
- FCP improved by 0.1 seconds.
- LCP improved by 0.4 seconds.
- TBT decreased by 8,760 ms.
- Speed Index improved by 9.6 seconds.
- CLS remained at 0 in both reported runs.
- Accessibility, Best Practices, and SEO scores remained unchanged.
- Lighthouse did not report INP. TBT is a lab metric and must not be used as a substitute for INP.

## Remaining Opportunities

The latest Lighthouse audit identified the following opportunities:

- Reduce render-blocking requests; estimated savings of 120 ms.
- Review legacy JavaScript; estimated savings of 13 KiB.
- Improve image delivery; estimated savings of 20 KiB.
- Review the network dependency tree and LCP breakdown.
- Reduce unused JavaScript; estimated savings of 22 KiB.
- Investigate long main-thread tasks and JavaScript execution time.
- Review the reasons preventing back/forward cache restoration.

## Notes

The initial Lighthouse run reported a browser-cache timeout and possible IndexedDB interference. Subsequent results also varied between runs.

For a more consistent comparison, run Lighthouse in a Chrome Incognito window using the same route, device emulation, network throttling, and audit settings.

Performance results are estimates and may vary between runs. Further optimization should focus on JavaScript execution and image delivery while preserving the application's cart, menu filtering, and other interactive functionality.
