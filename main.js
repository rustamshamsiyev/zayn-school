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

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactEmail) {
    formStatus.textContent =
      "Xabar yuborish uchun email.js faylida maktab email manzilini kiriting.";
    return;
  }

  const formData = new FormData(contactForm);
  const subject = `ZAYN School saytidan xabar: ${formData.get("name")}`;
  const body = [
    `Ism: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    "",
    String(formData.get("message")),
  ].join("\n");

  window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = "Email ilovangizda xabar tayyorlandi.";
});

document.getElementById("current-year").textContent = new Date().getFullYear();
