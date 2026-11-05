import emailConfig from "./email.js";

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

if (window.emailjs) {
  window.emailjs.init({ publicKey: emailConfig.publicKey });
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

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formStatus.textContent = "Xabar yuborilmoqda...";

  try {
    if (!window.emailjs) {
      throw new Error("EmailJS SDK failed to load.");
    }

    const response = await window.emailjs.sendForm(
      emailConfig.serviceId,
      emailConfig.templateId,
      contactForm,
    );

    if (response.status !== 200) {
      throw new Error(`EmailJS returned status ${response.status}`);
    }

    contactForm.reset();
    formStatus.textContent = "Xabaringiz muvaffaqiyatli yuborildi. Rahmat!";
  } catch (error) {
    console.error("EmailJS contact form submission failed:", error);
    const details = error instanceof Error ? error.message : String(error);
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? ` (status ${String(error.status)})`
        : "";
    const responseText =
      typeof error === "object" &&
      error !== null &&
      "text" in error &&
      typeof error.text === "string"
        ? `: ${error.text}`
        : "";
    formStatus.textContent = `Xabar yuborilmadi${status}: ${details}${responseText}`.slice(
      0,
      240,
    );
  } finally {
    submitButton.disabled = false;
  }
});

document.getElementById("current-year").textContent = new Date().getFullYear();
