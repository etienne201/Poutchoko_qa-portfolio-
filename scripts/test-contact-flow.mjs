import assert from "node:assert/strict"
import {
  processContactSubmission,
  checkRateLimit,
  resetRateLimits,
  escapeHtml,
  sanitizeHeader,
} from "../lib/contact-service.ts"

async function runTests() {
  console.log("🚀 Running Senior QA Automated Test Suite on Contact Service...\n")
  let passedCount = 0

  // -------------------------------------------------------------
  // Test 1: Helper - HTML XSS Escaping & CRLF Header Sanitization
  // -------------------------------------------------------------
  {
    const dangerousInput = `<script>alert("xss")</script>&<img src="x" onerror="evil()"/>`
    const escaped = escapeHtml(dangerousInput)
    assert.ok(!escaped.includes("<script>"), "Must escape <script>")
    assert.ok(!escaped.includes("<img"), "Must escape <img")
    assert.ok(escaped.includes("&lt;script&gt;"), "Must contain &lt;script&gt;")
    assert.ok(escaped.includes("&amp;"), "Must escape &")

    const crlfHeader = "Subject with\r\nBcc: victim@example.com\tTab"
    const sanitized = sanitizeHeader(crlfHeader)
    assert.ok(!sanitized.includes("\r"), "Must remove carriage returns")
    assert.ok(!sanitized.includes("\n"), "Must remove newlines")
    console.log("✅ Test 1: HTML injection escaping & CRLF sanitization passed.")
    passedCount++
  }

  // -------------------------------------------------------------
  // Test 2: Validation - Name too short (< 2 chars)
  // -------------------------------------------------------------
  {
    const res = await processContactSubmission(
      {
        name: "A",
        email: "test@example.com",
        message: "This is a valid message of sufficient length.",
        locale: "fr",
      },
      "10.0.0.1",
    )
    assert.equal(res.status, 400, "Should return 400 for short name")
    assert.equal(res.data.success, false)
    assert.match(res.data.message, /2 caractères/, "Should have localized validation message")
    console.log("✅ Test 2: Name length validation (< 2 chars) passed.")
    passedCount++
  }

  // -------------------------------------------------------------
  // Test 3: Validation - Invalid email format
  // -------------------------------------------------------------
  {
    const res = await processContactSubmission(
      {
        name: "Alice Smith",
        email: "invalid-email-without-domain",
        message: "This is a valid message of sufficient length.",
        locale: "fr",
      },
      "10.0.0.2",
    )
    assert.equal(res.status, 400, "Should return 400 for invalid email")
    assert.equal(res.data.success, false)
    assert.match(res.data.message, /email valide/, "Should have email validation error")
    console.log("✅ Test 3: Email format validation passed.")
    passedCount++
  }

  // -------------------------------------------------------------
  // Test 4: Validation - Message too short (< 15 chars)
  // -------------------------------------------------------------
  {
    const res = await processContactSubmission(
      {
        name: "Alice Smith",
        email: "alice@example.com",
        message: "Too short",
        locale: "fr",
      },
      "10.0.0.3",
    )
    assert.equal(res.status, 400, "Should return 400 for short message")
    assert.equal(res.data.success, false)
    assert.match(res.data.message, /15 caractères/, "Should have message validation error")
    console.log("✅ Test 4: Message minimum length validation passed.")
    passedCount++
  }

  // -------------------------------------------------------------
  // Test 5: Honeypot Anti-Spam Trap
  // -------------------------------------------------------------
  {
    const res = await processContactSubmission(
      {
        name: "Spam Bot",
        email: "spambot@spammer.org",
        message: "Buy cheap crypto right now on spam.com!",
        honeypot: "I am a malicious bot filling hidden fields",
        locale: "fr",
      },
      "10.0.0.4",
    )
    assert.equal(res.status, 200, "Should return 200 to trick bot")
    assert.equal(res.data.success, true)
    assert.equal(res.data.emailSent, false, "Should NOT dispatch any email for bot")
    console.log("✅ Test 5: Honeypot spam bot trapping passed.")
    passedCount++
  }

  // -------------------------------------------------------------
  // Test 6: Valid Submission & Truthful Fallback Links Generation
  // -------------------------------------------------------------
  {
    const res = await processContactSubmission(
      {
        name: "Sarah Connor",
        email: "sarah@skynet-defense.com",
        company: "Skynet Defense",
        requestType: "Recruitment (Full-time / Contract)",
        subject: "Senior QA Automation Opportunity",
        message: "We need a Senior QA Automation Engineer with strong Playwright & Cypress skills.",
        locale: "fr",
      },
      "10.0.0.5",
    )
    assert.equal(res.status, 200, "Should return 200 for valid submission")
    assert.equal(res.data.success, true)
    // When RESEND_API_KEY is not set or not re_..., emailSent must be false (no phantom success!)
    assert.equal(res.data.emailSent, false, "Must honestly declare emailSent: false when key is unconfigured")
    assert.ok(res.data.whatsappLink, "Must return prefilled WhatsApp link")
    assert.ok(res.data.mailtoLink, "Must return prefilled mailto link")
    assert.ok(res.data.gmailLink, "Must return prefilled Gmail web link")
    assert.match(res.data.whatsappLink, /Sarah%20Connor/, "WhatsApp link should contain candidate name")
    assert.match(res.data.mailtoLink, /poutchokoetienne@gmail\.com/, "Mailto link should point to Etienne")
    assert.match(res.data.gmailLink, /mail\.google\.com/, "Gmail link should point to mail.google.com compose")
    console.log("✅ Test 6: Honest fallback and prefilled link generation (WhatsApp, Mailto, Gmail) passed.")
    passedCount++
  }

  // -------------------------------------------------------------
  // Test 7: Rate Limiting Enforcement (Max 5 requests per IP)
  // -------------------------------------------------------------
  {
    resetRateLimits()
    const testIp = "192.168.200.77"
    for (let i = 0; i < 5; i++) {
      const allowed = checkRateLimit(testIp)
      assert.equal(allowed, true, `Request ${i + 1} should be permitted within limit`)
    }

    const blocked = checkRateLimit(testIp)
    assert.equal(blocked, false, "6th request from same IP must be rejected")

    const res = await processContactSubmission(
      {
        name: "Rate Limit Tester",
        email: "ratelimit@example.com",
        message: "Valid test message for rate limit counter.",
      },
      testIp,
    )
    assert.equal(res.status, 429, "processContactSubmission must return 429 when rate limited")
    assert.equal(res.data.success, false)
    assert.match(res.data.message, /Trop de requêtes/, "Must return rate limiting message")
    console.log("✅ Test 7: Sliding window IP rate limiter passed (429 rejected).")
    passedCount++
  }

  console.log(`\n🎉 All ${passedCount}/7 QA Automation tests PASSED with 100% success!`)
}

runTests().catch((err) => {
  console.error("❌ Test failure:", err)
  process.exit(1)
})
