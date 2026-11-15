# Portfolio — Final Independent QA

## Latest project presentation and verification update

**Scope:** Updated project data, artwork, repository actions, and production preview at `http://127.0.0.1:4177/`. No production deployment was available.

### Project artwork and presentation

- Added four original local SVG illustrations: `public/project-art/brandguard-visual.svg` shows content analysis, brand rules, protection, and review; `public/project-art/chronos-x-visual.svg` shows industrial signals, forecasting, scenarios, and an anomaly marker without real metrics; `public/project-art/jarvis-visual.svg` shows voice input, an assistant core, reasoning, and controlled desktop tasks; `public/project-art/agritech-visual.svg` shows a healthy leaf, scan overlay, crop context, and cautious farmer support without naming a disease or treatment.
- Preserved the existing NPC and Context-Surgeon SVG files and added meaningful alternative text for all six illustrations. The NPC repository photograph had already been removed in the previous update; no remote image sources are used.
- The project order is BrandGuard, CHRONOS-X, JARVIS, AgriTech, NPC, Context-Surgeon. All cards use the existing independent pointer-following handler.
- Every card now has a visible, keyboard-focusable “View Repository” action with a Git branch icon, safe `target="_blank"`/`rel="noopener noreferrer"` attributes, and no fabricated demo action.

### Repository verification message

- The visitor-facing message originated from a hard-coded `repositoryVerified` boolean in `src/data/site.ts`; `src/App.tsx` displayed “URL unavailable during verification” whenever that boolean was false.
- There was no HTTP HEAD/GET validation code, redirect handler, browser CORS check, or cached URL result in the portfolio. The metadata conflated source inspection with link availability.
- Renamed the metadata to `sourceInspected`, so it only controls whether source-backed descriptions/stack labels are shown. Removed the visitor-facing URL-status message. Repository actions always use the configured `githubUrl` and remain safe, clickable links regardless of source-inspection status.
- Checked all six configured destinations with HTTP GET requests while following redirects. These one-off results are not stored or used to label links in the UI.

### Repository destinations and evidence

| Project | Repository URL | HTTP result | Source verification |
| --- | --- | ---: | --- |
| BrandGuard | `https://github.com/yashgautam1205-code/CodeNexus` | 200 | README, source, configuration, and test listings inspected; BrandGuard description reflects implemented CodeNexus functionality. |
| CHRONOS-X | `https://github.com/yashgautam1205-code/Chronos-X` | 404 | Source not inspected; remains a clearly labeled prototype direction. |
| JARVIS | `https://github.com/yashgautam1205-code/Jarvis` | 404 | Source not inspected; remains a clearly labeled prototype direction. |
| AgriTech | `https://github.com/yashgautam1205-code/AgriTech` | 404 | Source not inspected; remains a clearly labeled concept. |
| NPC | `https://github.com/yashgautam1205-code/NPC` | 200 | README and source inspected; description remains tied to implemented code. |
| Context-Surgeon | `https://github.com/yashgautam1205-code/Context-Surgeon` | 200 | README, source, configuration, and tests inspected; no performance or semantic-equivalence claim is made. |

All six exact destinations remain configured, including the three that returned 404 for this GET check. A response status is not persisted as project metadata or shown to visitors. Source details for the three uninspected projects remain unclaimed. No live demo URLs were supplied.

### Validation performed

- `npm run lint`: passed.
- `npm run build`: passed; TypeScript check and Vite production build succeeded.
- `npm audit --audit-level=high`: passed with **0 vulnerabilities**.
- Production-preview browser checks verified all six card destinations, visible action labels, `target`/`rel` safety, and all six local SVGs loading successfully; no remote image requests were observed.
- Each card’s pointer-following values changed independently and reset on pointer leave. Keyboard Enter and Space toggled each project detail disclosure; repository actions received visible focus. Reduced-motion emulation disabled pointer movement and the JARVIS waveform.
- Browser-emulated widths **320, 390, 768, 1024, 1440, and 1920px** had no horizontal document overflow with all project details expanded.
- No browser console errors or uncaught page errors were observed during the preview checks.
- No `test`/`test:*` npm script is configured; browser interaction checks were run directly in the production preview.

### Remaining issues

- CHRONOS-X, JARVIS, and AgriTech source was not independently inspected. Their concepts and technology lists remain clearly unverified; the configured links are retained.
- No genuine project screenshots or live demos were supplied. The four new illustrations are custom portfolio artwork, not product screenshots.
- No physical touch-device, OS screen-reader, or full accessibility audit was performed.
- A prior Formspree test attempt may have sent two messages before its browser requests were aborted. Check the Formspree dashboard and destination mailbox before any further contact-form test; acceptance and delivery remain unknown.

## Earlier audit history (historical; see the update above for current project results)

The following QA record is retained from earlier portfolio work. Its results predate the project-art and repository-link changes above unless they are repeated in the latest update.

## Competition mission closeout

The project-card interaction was reproduced and changed in `src/App.tsx` and `src/App.css`; `README.md` and this audit were updated. The shared pointer handler already tilted every card slightly. The visible difference was that only JARVIS had an explicit hover-responsive artwork animation: its waveform spans animate while the other artwork had no tracked pointer-position effect. A common per-card spotlight and small artwork parallax now respond to pointer position while each artwork retains its own treatment.

### Current verification

- `npm run lint` and `npm run build` passed; Vite 8.3.8 generated the updated production assets.
- `npm audit --audit-level=high` reported **0 vulnerabilities**. Source/public scans found no common credential-token patterns. `.env.local` remains ignored by the documented `.gitignore` entries; this directory is not a Git worktree, so tracked/ignore status could not be checked with Git.
- The production preview at `http://127.0.0.1:4177/` returned HTTP 200. The supplied Formspree endpoint was present in the production bundle; the local `.env.local` matched it, `.env.example` remained blank, and `.gitignore` contained both `.env.local` and `*.local`.
- Browser-emulated widths **320, 360, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 CSS pixels** had no document overflow.
- Contact behavior was exercised against a localhost-only mock for a 200 response, 503 response, network disconnect, and the actual 15-second timeout. The mock success cleared fields; failures retained values and re-enabled retry.
- **Possible live test submissions:** browser interception failed, and a separate blank-environment attempt fell back to the existing `.env.local`. Both requests were aborted by reloading while pending; inspect Formspree and the destination mailbox for those two test submissions. Do not send further tests until checked.

### Issue register

Statuses below use only the requested status labels.

| ID / severity | Finding and evidence | Status | Fix or verification required |
| --- | --- | --- | --- |
| ANIM-01 / High | All six cards share fine-pointer tracking with independent CSS variables, a spotlight, artwork parallax, and pointer-leave reset. Production-preview browser checks exercised movement and reset for every card; JARVIS retains its waveform. | VERIFIED | Do not remove the fine-pointer and reduced-motion guards or the reset handler. |
| CONTENT-01 / High | Context-Surgeon and NPC are summarized from their public source and configuration; NPC uses a genuine repository screenshot. The other four entries remain explicitly labeled concept/prototype directions. No live demos or measured outcome claims are presented. | VERIFIED | Keep implementation and proposal language distinct. Add a Context-Surgeon screenshot or demo only if genuine assets become available. |
| CONTACT-01 / High | Form validation, local-mock success, 503, network error, and 15-second timeout were exercised. Two test-content submissions may have reached the configured Formspree endpoint during failed isolation attempts; acceptance and email delivery are unknown. | IMPLEMENTED — NOT FULLY VERIFIED | Check the Formspree dashboard and destination mailbox for those attempts. Do not submit another test until checked. |
| A11Y-01 / Medium | Existing 14 November Lighthouse/axe reports are historical, not rerun here. Keyboard menu behavior and reduced-motion styling were smoke-tested; a full keyboard, manual contrast, and OS screen-reader review were not completed. | IMPLEMENTED — NOT FULLY VERIFIED | Run axe/Lighthouse if available, manually check contrast across gradients, and test with a screen reader and touch device. Do not infer full WCAG conformance from lab scores. |
| DEPLOY-01 / Medium | Only the local production preview was tested. No production host, public domain, deployment authorization, or live deployment evidence is available. | BLOCKED — USER INPUT REQUIRED | Provide the chosen host/domain and authorization. Configure the endpoint in that host, deploy, then verify the deployed URL and form behavior. |
| SEO-01 / Low | Title, description, and social text metadata exist. A canonical URL, sitemap URL, and social-preview image cannot be verified without a real production domain and supplied image. | BLOCKED — USER INPUT REQUIRED | Supply the production domain and an authentic preview image; then add and validate canonical/social image metadata and sitemap references. |
| MOBILE-01 / Medium | Current production-preview browser-emulated checks at all ten requested widths found no document horizontal overflow. | VERIFIED | Physical-device behavior was not tested. If a device-specific issue occurs, provide browser/device and zoom settings. |
| PERF-01 / Low | The production bundle remains small; previous Lighthouse data is historical and was not rerun. No field data exists. | IMPLEMENTED — NOT FULLY VERIFIED | Reassess with current Lighthouse and deployed field data before making further optimization claims. |

## Feature checklist — 15 November 2026

| Area | Result | Status |
| --- | --- | --- |
| Navigation | Mobile menu opened; Escape closed it and returned focus; following the Skills anchor closed the menu and returned focus. Desktop link coverage and browser back/forward were not fully exercised in this update. | IMPLEMENTED — NOT FULLY VERIFIED |
| Hero | Hero content and orbital artwork rendered. Reduced-motion behavior was checked for card movement and the JARVIS waveform, not specifically for the hero orbit. Hero pointer interaction and visual polish were not comprehensively tested. | IMPLEMENTED — NOT FULLY VERIFIED |
| Projects | All six case details opened; Enter and Space toggled each disclosure. Pointer movement and reset passed independently on all six cards. Both GitHub destinations returned HTTP 200; NPC screenshot loaded. No live demo URLs are supplied. | VERIFIED |
| Project explorer | All six project selections updated their selected state and detail. Repository-backed flows are labeled separately from conceptual entries. | VERIFIED |
| Skills | All categories start collapsed. Frontend expands/collapses on click, Enter, and Space; scrolling does not open it. Independent categories can remain open together. The AI & Automation list now contains Workflow automation, Python, Data pipelines, and Problem solving. Reduced-motion behavior and no-overflow checks at 320, 390, 768, 1024, and 1440px passed. | VERIFIED |
| Experience, recognition, approach | Static content rendered in browser snapshots. No external actions were presented in recognition. | VERIFIED |
| Contact | Empty and invalid-email validation, localhost-mock success, 503, network disconnect, and 15-second timeout passed. Actual Formspree delivery and the unconfigured-endpoint fallback were not safely verified in this update. Two possible live test submissions need dashboard/mailbox review. | IMPLEMENTED — NOT FULLY VERIFIED |
| Footer and social links | Footer content rendered and back-to-top was exercised; all social destinations were inspected in source, not individually opened. | IMPLEMENTED — NOT FULLY VERIFIED |
| SEO | Title and description are present; `robots.txt` allows crawling. No canonical URL, social preview image, or sitemap is present; production domain/image were not supplied. | BLOCKED — USER INPUT REQUIRED |
| Security | High-level npm audit passed with zero findings; common token-pattern scan found no matches in `src`/`public`; `.env.local` is listed in `.gitignore`. No Git worktree exists to inspect tracked state. | IMPLEMENTED — NOT FULLY VERIFIED |
| Performance | Production build succeeded; JS is 258.07 KB raw / 78.36 KB gzip and CSS 44.55 KB raw / 11.50 KB gzip. Lighthouse was not rerun. | IMPLEMENTED — NOT FULLY VERIFIED |
| Accessibility | Keyboard menu behavior and reduced-motion CSS were smoke-tested. Axe was not run this update; gradient contrast, full keyboard path, physical touch, and OS screen reader remain unverified. | IMPLEMENTED — NOT FULLY VERIFIED |

## Performance

### Lighthouse results

These are previously recorded Lighthouse 13.6.0 local lab runs from 14 November against the production preview. They were not rerun for this update and are not CrUX/field measurements.

| Preset | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile (1 run) | **100** | **100** | **100** | **100** | **759 ms** | **0** | **8 ms** |
| Desktop (1 run) | **100** | **100** | **100** | **100** | **208 ms** | **0** | **0 ms** |

- **INP:** Not available in this local lab run. There is no deployed URL or field/CrUX data; TBT is a lab diagnostic, not a substitute for INP.
- **Payload:** Lighthouse measured **98,467 bytes (about 96 KiB)** transferred across six same-origin requests.
- Lighthouse estimated about **36.8 KB** of unused JavaScript in the mobile initial load and **36.6 KB** on desktop from the app entry bundle. This is a load-phase estimate, not proof that the code is unnecessary to the full interactive one-page experience.
- At the time of those prior Lighthouse runs, the build totaled about **96.35 KB gzip**. The current build is **99.43 KB gzip** across HTML (0.65 KB), CSS (11.85 KB), runtime (0.08 KB), UI vendor (6.13 KB), and app JavaScript (80.72 KB).

### Requests and blocking

- The largest resource is app JavaScript: **257.63 KB raw / 78.25 KB gzip**. The UI vendor chunk is 15.46 KB raw / 6.13 KB gzip; CSS is 43.29 KB raw / 11.23 KB gzip.
- Lighthouse recorded one document, three JavaScript requests, one stylesheet, and the SVG favicon. It recorded **zero font, image, media, or third-party requests**.
- The production HTML references one stylesheet. Lighthouse emitted no render-blocking-resources audit or savings estimate; with 11.23 KB gzip CSS and a 100 Performance score, evidence does not justify changing stylesheet loading.
- The initial-load unused-JavaScript estimate is the only optimization signal. The complete one-page experience uses these interactions; avoid speculative code-splitting while payload and lab scores remain small/high, and re-evaluate if the page grows or field measurements justify it.

## Accessibility

### Automated checks

- The prior axe-core **4.14.0** run against WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA tags reported **0 violations**. Axe was not rerun for this update and does not detect every accessibility issue.
- The preceding contrast report marked **121 color-contrast checks incomplete** because foreground/background contrast over gradients could not be determined. New pointer-follow spotlight colors were also added in this update and have not been contrast-tested; gradient-backed cases still need manual verification.
- Four representative static color pairs were previously calculated: body copy **8.84:1**, case copy **10.70:1**, micro-label **5.67:1**, and accent label **10.14:1**. This sample does not establish full-page WCAG 2.2 AA conformance.
- The prior Lighthouse Accessibility score was **100** on both presets. Lighthouse was not rerun for this update; a perfect score would not replace axe or assistive-technology testing.

### Keyboard and semantics

- The prior 14 November keyboard audit traversed **42 visible focus stops**; it was not repeated for this update.
- Earlier keyboard smoke testing verified mobile-menu Escape and anchor focus restoration. The current update toggled all six project disclosures with Enter and Space; skill interactions were not rerun.
- Prior axe results found no accessible-name violations. Axe was not run during this update.
- The prior report recorded one H1, 64 headings with no skipped levels, and one `main`, `header`, `nav`, and `footer` landmark; this structure was not recounted in the current pass.
- No operating-system screen reader was available, so no screen-reader session is claimed.

### Motion and contrast limitations

- With `prefers-reduced-motion: reduce` emulated, computed document scrolling changed to `auto`, card transforms were disabled, and the JARVIS waveform animation was disabled.
- A full contrast review of text over gradients/translucent surfaces remains open. Review those combinations manually against WCAG 2.2 AA rather than treating axe's incomplete checks as passing.

## Responsive and interaction checks

- Tested browser viewport widths **320, 390, 768, 1024, 1440, and 1920 CSS pixels** with all six project details open. No document horizontal overflow was found; cards and the rest of the page remained within the viewport. The earlier ten-width check is retained in the historical audit above.
- At 320 px the mobile menu opened, closed on Escape with focus restored, and returned focus to its toggle after an in-page navigation link. These were browser-emulated viewports, not physical-device touch tests.
- All six project details toggled using Enter and Space; all six architecture selectors responded. Skills behavior is recorded above.
- The prior link audit found 25 valid in-page anchors and no blank `#` links; this update did not repeat the full link-target check. Both new GitHub URLs and the NPC screenshot URL returned HTTP 200.
- Form validation and localhost-only mock outcomes are recorded above. The live endpoint status remains uncertain after two mock-intended requests were aborted during navigation; check Formspree and the destination mailbox.
- A production-preview feature smoke test recorded no application page errors. Intentional mock HTTP/network failures produced expected browser network errors.

## Defects found and corrected

1. axe identified three contact buttons whose `aria-label` omitted their visible “Not configured” text. The redundant labels were removed so each button's accessible name includes its visible content.
2. Activating a mobile navigation link hid the focused link and left focus on the document body. Focus restoration is now deferred until after the anchor navigation, returning focus to the menu toggle.
3. The contact request had no upper time limit. Added a 15-second `AbortController` timeout and cleanup; an accelerated browser test verified the timeout produces a retryable error and preserves the fields.
4. The project-card artwork showed a decorative `↗` without a destination. Removed the arrow while preserving the Y/G label.
5. README deployment wording incorrectly said no Formspree endpoint had been supplied. It now distinguishes local endpoint configuration from unverified delivery and production-host setup.
6. Only the JARVIS artwork visibly followed hover through its animated waveform. Added shared pointer position, spotlight, and subtle artwork parallax to the original four cards; the same interaction now covers both repository-backed additions. Each card resets on pointer leave; keyboard focus has a card-level visual treatment; touch and reduced-motion modes suppress movement.

The source changes passed lint, TypeScript, and the production build and were checked against the local preview. The dependency audit passed. Lighthouse and axe were not rerun after these changes.

## Deployment and contact status

The local Vite production preview was tested. Verified GitHub, LinkedIn, and email destinations are configured, and the user-provided Formspree endpoint is present in the ignored local `.env.local`. No production domain or deployment target/credentials are available. No actual contact delivery has been confirmed.

## Contact implementation follow-up

### Configuration and delivery

- GitHub: `https://github.com/yashgautam1205-code`
- LinkedIn: `https://www.linkedin.com/in/yash-gautam-726518329/`
- Email and fallback: `mailto:yashgautam1205@gmail.com`
- `.env.example` remains a blank `VITE_FORMSPREE_ENDPOINT=` template. `.env.local` contains the exact endpoint supplied by the user and is explicitly listed in `.gitignore`; its value is not duplicated here. This workspace is not a Git worktree, so `git check-ignore` could not be run.
- The configured endpoint is a public form identifier, not a private API key. The unconfigured form still has the verified email fallback.
- **No successful email delivery is verified.** Two mock-intended valid submissions were initiated while the configured endpoint was active; browser interception did not isolate them, and reloading aborted the pending requests. Check Formspree and the destination mailbox before any further test. A success response alone would confirm endpoint acceptance, not recipient delivery.

### Checks actually run

- Current `npm run lint` and `npm run build` passed; `npm audit --audit-level=high` found 0 vulnerabilities. `.env.local` was not edited, `.env.example` remains blank, and `.env.local` is listed in `.gitignore`.
- The production preview returned HTTP 200. The configured endpoint did not receive any further test attempts after the uncertain live requests.
- On the isolated localhost mock, empty name was announced and focused; invalid email set `aria-invalid`; mocked success announced success and cleared fields.
- Local mock HTTP 503 retained form values, re-enabled retry, and showed the email fallback. A simulated socket disconnect followed the same retryable error path.
- The full 15-second `AbortController` timeout was waited against the local mock; it showed the retryable error, retained form values, and re-enabled retry.
- The endpoint-unconfigured fallback and duplicate-submit behavior were not retested in the current pass. Earlier QA recorded a duplicate guard, but no current duplicate test result is claimed here.
- Local mock failure runs caused expected browser network/console errors. No real email receipt or delivery was confirmed.
- At all ten requested browser-emulated widths, the page had no document overflow. A physical touch device and OS screen reader were unavailable.

### Remaining manual setup

1. Restart the Vite development server after changing `.env.local`. For production, set the same variable in the hosting provider and rebuild/redeploy.
2. Check the Formspree dashboard and recipient mailbox for the two possible submissions described above. If a new test is needed, send one only after checking, and verify it in both places; until then, delivery remains unverified.

## Honest judging estimate

These are subjective estimates against the supplied judging weights, not challenge scores.

| Criterion | Estimate | Evidence and remaining deductions |
| --- | ---: | --- |
| Creativity | **26 / 30** | Y/G identity, orbital hero, editorial typography, and the six-project interactive architecture explorer are distinctive; the cinematic dark aesthetic remains familiar and no portrait was supplied. |
| Craft | **27 / 30** | Production build, tested responsive layouts, accessible disclosures/explorer, and robust mocked form states are strong; physical-device testing and deployed review remain unavailable. |
| Content | **17 / 20** | Two projects now have source-verified repository summaries and NPC imagery; four others remain transparently labeled proposals. Independent outcome evidence and a Context-Surgeon screenshot are not available. |
| Performance and Accessibility | **18 / 20** | Prior Lighthouse mobile/desktop scores were 100 and prior axe reports zero violations, but neither was rerun for this update. The current responsive checks and reduced-motion behavior passed; gradient contrast, full keyboard path, screen reader/touch, and field INP remain open. |
| **Total** | **88 / 100** | Subjective estimate, not an official score. Independent outcome evidence and current accessibility/performance verification remain open. |

## Highest-value remaining work

1. Add a genuine Context-Surgeon screenshot or independently measured project outcomes only if authentic evidence becomes available; keep the other four concept/prototype entries clearly labeled.
2. Check the Formspree dashboard and recipient mailbox for the two possible mock-intended submissions initiated during this update; do not send another test until checked.
3. Manually resolve contrast for text over gradients/translucency; complete a screen-reader and physical-device review.
4. Once a production domain and authorized host are available, configure the endpoint there, deploy, and rerun Lighthouse/accessibility checks. Add canonical/sitemap metadata only when the real domain is known.
5. Revisit JavaScript splitting only if the app bundle grows or deployed performance measurements justify the added complexity.
