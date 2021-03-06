# Ethical Metrics

Present website metric collection sits somewhere between creepy and unethical (see browser fingerprinting, cross-domain tracking, and hidden iframes). And yet reliably tracking site usage is a necessary part of running most websides, much less online businesses.

Is there a way to have _ethical_ metric collection?

## Goals

These two goals, which are decidedly in tension, should be pursued:

- **Respect every user's privacy.** Don't share their information with other parties. Be very careful with personally identifiable information (PII).
- **Gather useful user metrics.** Gather reliable site usage statistics. Effectively track unique vists.

## What's Ethical?

This is of course debatable, but here are some basic rules:

- No inter-site tracking
- No PII sent or stored
- No cookies or local storage
- Never shared with 3rd parties
- Data is worthless to 3rd parties, even if it was sold or leaked to them

## What Metrics?

- Unique visitors
- Pageviews (by URL)
- Timestamps
- Referrers
- Screen sizes

## Example: Possible Approach

1. Get browser fingerprint
1. Salt with public key - could be the domain string, as this is static, reliable, and does not have to be configured
1. Hash
1. Transfer to metrics server via SSL
1. Re-salt with a private key
1. Re-hash
1. Store

In this example PII (really DII: _Device_ Identifiable Information) is obscured, transferred securely, and never stored (only its salted hash is stored). Even if it was leaked (e.g. [mistakenly in a log](https://www.bleepingcomputer.com/news/security/twitter-admits-recording-plaintext-passwords-in-internal-logs-just-like-github/)) it is obfuscated by the public hash and therefore less widely applicable (only this specific participating site has this dataset). The 2nd, private-key re-salting may be excessive (but it's hard to see it as pointless). 

## Possible Deliverables for this Project

- general specification (a la the [semver spec](https://semver.org/))
- public pledge for participating organizations
- pledge branding for participating organizations
- client and server libraries 

## Further Reading

- [Am I Unique](https://amiunique.org) - browser fingerprinting research and public awareness campaign
- [Beauty and the Beast: Diverting modern web browsers
to build unique browser fingerprints](https://hal.inria.fr/hal-01285470/file/beauty-sp16.pdf) - research paper from the same group as Am I Unique
- [Simple Analytics](https://simpleanalytics.io) - a nice example of simple metrics marketing and specs

## Contributing

At this stage, open issues and PRs with ideas and feedback. Thanks!
