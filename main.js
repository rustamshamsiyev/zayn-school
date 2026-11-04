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

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactEmail) {
    formStatus.textContent =
      "Xabar yuborish uchun email.js faylida maktab email manzilini kiriting.";
    return;
  }

  const formData = new FormData(contactForm);
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const message = String(formData.get("message"));

  submitButton.disabled = true;
  formStatus.textContent = "Xabar yuborilmoqda...";

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `ZAYN School saytidan xabar: ${name}`,
        _template: "table",
      }),
    });
    const result = await response.json();

    if (!response.ok || (result.success !== "true" && result.success !== true)) {
      throw new Error(result.message || "Email servisi xabarni qabul qilmadi.");
    }

    contactForm.reset();
    formStatus.textContent = "Xabaringiz muvaffaqiyatli yuborildi. Rahmat!";
  } catch (error) {
    console.error("Contact form submission failed:", error);
    formStatus.textContent =
      "Xabar yuborilmadi. Internet aloqasini tekshirib, qayta urinib ko‘ring.";
  } finally {
    submitButton.disabled = false;
  }
});

document.getElementById("current-year").textContent = new Date().getFullYear();
