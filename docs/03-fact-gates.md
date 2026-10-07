# Fact Gates — items that block publication regardless of engineering

These are client and brokerage decisions. None can be resolved by implementation
work, and none are resolved by a statement found in a repository file: project
files are project-supplied information, not independent verification.

| # | Gate | Blocks | Current handling in V2 | Needed from |
|---|---|---|---|---|
| 1 | Nevada licence number, type, status, expiry | Footer, About details, structured data | Published as carried from the project record | State record / brokerage |
| 2 | Blue Diamond Realty entity, office, managing broker | Footer, Contact, About | Published as carried | Brokerage |
| 3 | Contractor licensure | Renovations wording | **Resolved for now.** `lib/site.ts` `scopeBoundaries` states Jason is not a licensed contractor and performs no licensed construction. V2 uses coordination language throughout and never says "we install". Treated as project-supplied, so a written confirmation is still the safer record. | Jason (written) |
| 4 | Review source, consent, dates, rating scope | `/reviews` | Quotes rendered verbatim. **Aggregate 5.0 rating removed.** "Verified" removed from framing. | Jason |
| 5 | Property management offered at all | `/invest` vacancy wording | Page states plainly he is not a property manager and does not manage rentals | Jason / brokerage |
| 6 | Contact-form response time | Confirmation message | No response-time promise published anywhere | Jason |
| 7 | Actual data handling and analytics | `/privacy` | **V1 privacy copy preserved untouched.** Rewriting it would mean inventing practices. | Repo owner + Jason |
| 8 | Tenure: "two decades and more" vs "29 years" | Any tenure claim | **Neither published.** `yearsExperience` retained in code with provenance comment; deliberately not resolved by picking the smaller number | Jason / brokerage |
| 9 | Current Nevada advertising and fair-housing requirements | Release review | Equal Housing treatment retained; no requirement interpretation attempted | Authoritative sources; web search unavailable in this session |
| 10 | Jason's role per featured project — owner, flipper, or agent | Any finished-work reference | No generic "properties we renovated" claim published. Finished work points to walkthrough video rather than asserting a role | Jason, per project |

## Claims deliberately absent from all V2 public copy

Years of experience · transaction counts or volume · rankings, awards, "top
producer" · any aggregate review rating · service areas beyond those evidenced ·
any price, rent or availability figure · appreciation or yield projections ·
occupancy guarantees · outcome or result promises · any occupant-type framing
("perfect for families" and every equivalent).
