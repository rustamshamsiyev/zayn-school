import contactEmail from "./email.js";

const teachers = [
  {
    name: "Ustoz 1",
    info: "O‘qituvchi haqida ma’lumotni shu yerga kiriting.",
  },
  {
    name: "Ustoz 2",
    info: "O‘qituvchi haqida ma’lumotni shu yerga kiriting.",
  },
  {
    name: "Ustoz 3",
    info: "O‘qituvchi haqida ma’lumotni shu yerga kiriting.",
  },
];

const teacherList = document.getElementById("teacher-list");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.action = `https://formsubmit.co/${contactEmail}`;

const query = new URLSearchParams(window.location.search);
if (query.get("sent") === "true") {
  formStatus.textContent = "Xabaringiz yuborildi. Tez orada siz bilan bog‘lanamiz.";
  query.delete("sent");
  const search = query.toString();
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`,
  );
}

teacherList.innerHTML = teachers
  .map(
    ({ name, info }) => `
      <article class="teacher-card">
        <div class="teacher-avatar" aria-hidden="true">${name.charAt(0)}</div>
        <h3>${name}</h3>
        <p>${info}</p>
      </article>
    `,
  )
  .join("");

document.getElementById("current-year").textContent = new Date().getFullYear();
