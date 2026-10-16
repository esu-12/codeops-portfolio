# Addis Eats Performance Report

## Baseline

Audit date: October 15, 2026
Route: /menu
Device: Emulated Moto G Power
Network: Slow 4G
Tool: Lighthouse 13.4.1

| Metric | Before optimization |
|---|---:|
| Performance score | 55 |
| Accessibility score | 92 |
| Best Practices score | 100 |
| SEO score | 82 |
| First Contentful Paint (FCP) | 1.2 s |
| Largest Contentful Paint (LCP) | 3.0 s |
| Total Blocking Time (TBT) | 10,420 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index | 12.3 s |
| Interaction to Next Paint (INP) | Not reported by this lab run |

## Changes

- Replaced plain image elements with `next/image`.
- Added image dimensions and responsive `sizes` values.
- Assigned priority only to the verified largest above-the-fold image.
- Reviewed font loading; no Google Fonts link or CSS font import was found.
- Checked application code for third-party scripts; none were found.
- Added `.env.example` with a placeholder for `SESSION_SECRET`.
- Confirmed `.env.local` is ignored by Git.

## After optimization

Run Lighthouse again using the same route, device, and network settings.
Record the actual results below.

| Metric | Before | After |
|---|---:|---:|
| Performance | 55 | Pending |
| FCP | 1.2 s | Pending |
| LCP | 3.0 s | Pending |
| TBT | 10,420 ms | Pending |
| CLS | 0 | Pending |
| Speed Index | 12.3 s | Pending |
| INP | Not reported | Record if available |

## Notes

The initial Lighthouse run reported a browser-cache timeout and possible
IndexedDB interference. Repeat the audit in an Incognito window for a
more reliable comparison.

TBT is a lab metric and is not the same as INP. Do not estimate INP
from TBT.
