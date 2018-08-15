# Ethical Metrics

Present website metric collection sits somewhere between creepy and unethical (see browser fingerprinting, cross-domain tracking, and hidden iframes). And yet reliably tracking site usage is a necessary part of running most businesses. Is there a way to have _ethical_ metric collection?

## Goals

These two goals, which are decidedly in tension, should be pursued:

- **Respect every user's privacy.** Don't share their information with other parties. Be very careful with personally identifiable information (PII).
- **Gather useful user metrics.** Gather reliable site usage statistics. Effectively track unique vists.

## Possible Approach

Browser fingerprint, salted with public key, hashed, sent over SSL, re-salted with a private key, re-hashed, and stored. PII (really _device_ identifiable information) is obscured, transferred securely, and never stored. Even if it was leaked (e.g. [mistakenly in a log](https://www.bleepingcomputer.com/news/security/twitter-admits-recording-plaintext-passwords-in-internal-logs-just-like-github/)) it is obfuscated by the public hash and therefore less widely applicable (only this specific participating site has this dataset). The private key re-salting may be unnecessary, research needed.

## Possible Deliverables for this Project

- general specification (a la the [semver spec](https://semver.org/))
- public pledge for participating organizations
- pledge branding for participating organizations
- client and server libraries 

## Contributing

At this stage, open issues and PRs with ideas and feedback. Thanks!
