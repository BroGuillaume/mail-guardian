// ==========================
// IMPORT EMAILS
// ==========================

import emails from "./data/emails.js";

let currentEmailIndex = 0;


// ==========================
// DOM ELEMENTS
// ==========================

const emailContainer = document.querySelector(".emails");

const threatScore = document.querySelector(".risk-box h1");
const riskText = document.querySelector(".risk-box p");

const summaryText = document.querySelector("#summary-section p");
const indicatorsList = document.querySelector("#indicators-section ul");
const replyBox = document.querySelector("#reply-section .reply-box");


// ==========================
// GEMINI AI FUNCTION
// ==========================

async function analyzeEmailWithAI(emailContent) {

  const response = await fetch("http://localhost:3000/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `
You are a cybersecurity email assistant.

Return ONLY valid JSON:

{
  "category": "SCAM | IMPORTANT | PROMOTION | SPAM",
  "risk": number (0-100),
  "summary": "short explanation",
  "indicators": ["...","..."],
  "reply": "suggested reply"
}

Email:
"""
${emailContent}
"""
              `
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();

  if (!data.candidates) {
    throw new Error("AI returned no candidates");
  }

  // Gemini 2.5 sometimes uses content[0].parts[0].text
  let text =
    data.candidates[0].content?.[0]?.parts?.[0]?.text ??
    data.candidates[0].content?.parts?.[0]?.text;

  // Remove markdown fences
  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Extract JSON block only
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("AI returned invalid JSON");
  }

  return JSON.parse(jsonMatch[0]);
}


// ==========================
// RENDER EMAILS
// ==========================

function renderEmails(list = emails) {

  emailContainer.innerHTML = "";

  list.forEach((email, index) => {

    const card = document.createElement("div");
    card.classList.add("email-card");

    if (index === 0) card.classList.add("selected");

    const category = email.category ?? "UNKNOWN";
    const categoryClass = email.category ? email.category.toLowerCase() : "unknown";

    card.innerHTML = `
      <div class="email-header">
        <h3>${email.subject}</h3>
        <span class="tag ${categoryClass}">
            ${category}
        </span>
        <button class="expand-btn" data-expanded="false">▼</button>
      </div>

      <p class="sender">${email.sender}</p>
      <p class="preview">${email.preview}</p>

      <div class="full-content hidden">
        <pre>${email.content}</pre>
      </div>
    `;


    const expandBtn = card.querySelector(".expand-btn");
    const fullContent = card.querySelector(".full-content");

    expandBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const expanded = expandBtn.dataset.expanded === "true";

      if (expanded) {
        // Collapse
        fullContent.classList.add("hidden");
        expandBtn.textContent = "▼";
        expandBtn.dataset.expanded = "false";
        card.classList.remove("expanded");
        email.expanded = false;
      } else {
        // Expand
        fullContent.classList.remove("hidden");
        expandBtn.textContent = "▲";
        expandBtn.dataset.expanded = "true";
        card.classList.add("expanded");
        email.expanded = true;
      }
    });

    if (email.expanded) {
      card.classList.add("expanded");
      card.querySelector(".full-content").classList.remove("hidden");
      card.querySelector(".expand-btn").textContent = "▲";
      card.querySelector(".expand-btn").dataset.expanded = "true";
    }


    // Add reset button only if email is not UNKNOWN
    if (email.category && email.category !== "UNKNOWN") {
      const resetBtn = document.createElement("button");
      resetBtn.classList.add("reset-btn");
      resetBtn.textContent = "Reset";

      resetBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent selecting the email

        resetEmail(email);
        saveEmails();
        renderEmails();
        selectEmail(currentEmailIndex);
      });

      card.appendChild(resetBtn);
    }


    card.addEventListener("click", () => {
      selectEmail(index, list);
    });

    emailContainer.appendChild(card);
  });
}


// ==========================
// SELECT EMAIL
// ==========================

function selectEmail(index, list = emails) {

  currentEmailIndex = emails.indexOf(list[index]);
  const selectedEmail = list[index];

  document.querySelectorAll(".email-card").forEach(card => {
    card.classList.remove("selected");
  });

  document.querySelectorAll(".email-card")[index].classList.add("selected");

  // SAFE VALUES FOR UNANALYZED EMAILS
  const risk = selectedEmail.risk ?? 0;
  const riskLabel = selectedEmail.riskLabel ?? "Unknown";
  const summary = selectedEmail.summary ?? "This email has not been analyzed yet.";
  const indicators = selectedEmail.indicators ?? [];
  const reply = selectedEmail.reply ?? "No reply available.";

  // UPDATE UI
  threatScore.textContent = `${risk}%`;
  riskText.textContent = riskLabel;
  summaryText.textContent = summary;

  indicatorsList.innerHTML = "";
  indicators.forEach(indicator => {
    const li = document.createElement("li");
    li.textContent = indicator;
    indicatorsList.appendChild(li);
  });

  replyBox.textContent = reply;

  // RISK COLOR
  const riskBox = document.querySelector(".risk-box");

  if (risk >= 70) {
    riskBox.style.background = "rgba(239, 68, 68, 0.15)";
  } else if (risk >= 30) {
    riskBox.style.background = "rgba(234, 179, 8, 0.15)";
  } else {
    riskBox.style.background = "rgba(34, 197, 94, 0.15)";
  }
}


// ==========================
// CATEGORY FILTER
// ==========================

document.querySelectorAll(".menu-item").forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelectorAll(".menu-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    if (filter === "ALL") {
      renderEmails();
      selectEmail(0);
      return;
    }

    const filtered = emails.filter(e => e.category === filter);
    renderEmails(filtered);

    if (filtered.length > 0) selectEmail(0, filtered);
  });
});


// ==========================
// AI BUTTON
// ==========================

document.addEventListener("DOMContentLoaded", () => {

  loadEmails();
  renderEmails();
  selectEmail(0);

  document.querySelector(".analyze-btn").addEventListener("click", async () => {

    const btn = document.querySelector(".analyze-btn");

    btn.textContent = "Analyzing...";
    btn.disabled = true;

    try {

      const selectedEmail = emails[currentEmailIndex];

      const result = await analyzeEmailWithAI(selectedEmail.content);

      // UPDATE EMAIL DATA
      Object.assign(selectedEmail, {
        category: result.category,
        risk: result.risk,
        riskLabel:
          result.risk >= 70 ? "High Risk" :
          result.risk >= 30 ? "Medium Risk" :
          "Low Risk",
        summary: result.summary,
        indicators: result.indicators,
        reply: result.reply
      });

      saveEmails();

      // RE-RENDER LIST
      renderEmails();
      selectEmail(currentEmailIndex);

    } catch (err) {
      console.error(err);
      alert("AI error, please try again");
    }

    btn.textContent = "✨ Analyze with AI";
    btn.disabled = false;
  });

  document.querySelector(".reset-all-btn").addEventListener("click", () => {
    if (confirm("Reset ALL emails?")) {
      resetAllEmails();
    }
  });

});


function saveEmails() {
  localStorage.setItem("emailsData", JSON.stringify(emails));
}

function loadEmails() {
  const saved = localStorage.getItem("emailsData");
  if (!saved) return;

  const parsed = JSON.parse(saved);

  parsed.forEach((savedEmail, i) => {
    Object.assign(emails[i], savedEmail);
  });
}

function resetEmail(email) {
  email.category = "UNKNOWN";
  email.risk = 0;
  email.riskLabel = "Unknown";
  email.summary = "This email has not been analyzed yet.";
  email.indicators = [];
  email.reply = "No reply available.";
  email.expanded = false;
}

function resetAllEmails() {
  emails.forEach(email => {
    email.category = "UNKNOWN";
    email.risk = 0;
    email.riskLabel = "Unknown";
    email.summary = "This email has not been analyzed yet.";
    email.indicators = [];
    email.reply = "No reply available.";
    email.expanded = false;
  });

  saveEmails();
  renderEmails();
  selectEmail(0);
}


function openEmailModal(email) {
  const modal = document.getElementById("email-modal");
  const content = document.getElementById("modal-email-content");

  content.textContent = email.content;
  modal.classList.remove("hidden");
}

document.querySelector(".close-modal").addEventListener("click", () => {
  document.getElementById("email-modal").classList.add("hidden");
});

document.getElementById("email-modal").addEventListener("click", (e) => {
  if (e.target.id === "email-modal") {
    document.getElementById("email-modal").classList.add("hidden");
  }
});
