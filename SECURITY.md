# Security Policy

## 🔒 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| < 2.0   | :x:                |

---

## 🛡️ Reporting a Vulnerability

We take the security of SiteForge and the merchant compliance sites it generates seriously. If you discover a security vulnerability, please do NOT create a public GitHub issue.

Instead, please send an email to **security@siteforge.dev** (or contact the maintainers directly via private repository disclosure).

Please include:
1. Type of issue (e.g., cross-tenant auth bypass, SSRF, XSS, token leakage).
2. Step-by-step reproduction instructions or a minimal proof of concept.
3. Potential impact and proposed remediation, if known.

We will acknowledge receipt of your vulnerability report within **48 hours** and provide a detailed timeline for a resolution.

---

## 🔑 Credential Hygiene Guidelines

- **Never commit `.env` files** containing real GitHub Personal Access Tokens (PAT), Dokploy API keys, or database credentials.
- In production, always ensure `BETTER_AUTH_SECRET` is set to a cryptographically secure random string with minimum 32 characters.
- Ensure cross-tenant data isolation remains strictly enforced: unauthenticated or unauthorized access to other projects must always return `404 Not Found`, never leaking project existence via `403 Forbidden`.
