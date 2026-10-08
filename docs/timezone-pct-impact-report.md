# BC Permanent Pacific Time (PCT, UTC-7): Impact Report for nr-brmb-pit-common

| | |
|---|---|
| **Prepared** | 2026-10-07 |
| **Repo state** | public GitHub `dhlevi/nr-brmb-pit-common`, branch `main` @ `faec756` (2026-09-22, "Add GitHub Actions workflow for client build"). This commit is identical to `main` in the upstream `bcgov/nr-brmb-pit-common` repository, and `main` is the only branch. |
| **Components** | A new, empty repository: `README.md`, `LICENSE.txt`, `.gitignore`, and two placeholder workflows (`.github/workflows/build-client.yml` and `build-server.yml`) that only run `echo "hello world"`. The README describes future Angular and Java common libraries for the Production Insurance Tools suite, but no source code has been added yet (four commits in total). |
| **Deadline** | **Sunday 2026-11-01, 02:00 local (09:00 UTC)**, about 3.5 weeks away |
| **Bottom line** | **No impact today.** The repository contains no code, configuration or dependencies that handle dates or times. When the planned common libraries are added, they should follow the guidance in Section 4 so that they do not carry forward the JVM-zone patterns found in `wfone-common-lib` and `nr-brmb-common`. |

---

## 1. What changed (same basis as the earlier reports)

- **Government rule.** BC stopped changing clocks after 2026-03-08. On **2026-11-01 clocks do not fall back.** BC stays at **UTC-7** all year, named *Pacific time (PCT)*.
- **IANA tzdata 2026b** models `America/Vancouver` as permanent UTC-7 from 2026-11-01 02:00.
- **JDK builds with the rule:** 8u501, 11.0.32, 17.0.20, 21.0.12 and 25.0.4 or later. **moment-timezone** needs 0.6.2 or later.

---

## 2. Summary of findings

| # | Area | Severity | Fails on Nov 1? | Fix |
|---|---|---|---|---|
| P1 | Repository contents (README, licence, `.gitignore`) | None | No | n/a |
| P2 | Placeholder workflows `build-client.yml` and `build-server.yml` (manual trigger, `echo` only, no schedule) | None | No | n/a |
| P3 | Future Angular and Java common libraries (not yet written) | Guidance | Not applicable | R1 |

---

## 3. Areas of Concern and Failure

None. There is no source code, build file, container image, scheduled job or time zone setting in the repository.

---

## 4. Guidance for the Planned Libraries

The sibling libraries reviewed so far (`wfone-common-lib`, `nr-brmb-common`) and the applications that use them (`nr-brmb-pit-claim`, `nr-brmb-pim`) share a small set of patterns that depend on the JVM default zone. Avoiding them from the start removes the platform dependency described in those reports:

1. **Calendar dates:** use `java.time.LocalDate` in Java and plain `YYYY-MM-DD` strings in JSON. In Angular, configure `MomentDateAdapter` with `useUtc: true`, or convert picker values to `YYYY-MM-DD` before sending.
2. **Timestamps:** use `java.time.Instant` and ISO-8601 strings with `Z`. Store them in `timestamp with time zone` columns, and bind them with `setObject(..., OffsetDateTime)` rather than `Timestamp.from(Instant)`.
3. **Zones:** where a BC calendar day is needed, use `ZoneId.of("America/Vancouver")` explicitly instead of `ZoneId.systemDefault()`, and never a fixed offset such as `-07:00` or `-08:00`.
4. **Front end:** avoid `moment-timezone` unless it is needed; if it is, use 0.6.5 or later and keep it current. Compute "today" in BC time, not with `new Date().toISOString().slice(0, 10)`.
5. **Runtime:** document the minimum JDK (21.0.12 or later) and the expected `-Duser.timezone=America/Vancouver` setting for consuming applications.

---

## 5. Potential Resolutions

| # | Action | Owner | Priority |
|---|--------|-------|----------|
| R1 | Apply the guidance in Section 4 when code is added, and re-run this review once the first library code is committed. | Development | When code is added |

---

## 6. Cross-References

- **nr-brmb-common** and **wfone-common-lib** reports: the existing common libraries and their JVM-zone findings.
- **nr-brmb-pit-claim** and **nr-brmb-pim** reports: the PIT applications most likely to consume these libraries.
