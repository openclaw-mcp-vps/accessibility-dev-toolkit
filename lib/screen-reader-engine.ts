import { load } from "cheerio";

function getName($el: ReturnType<ReturnType<typeof load>["root"]> | any): string {
  const ariaLabel = $el.attr("aria-label");
  if (ariaLabel) return ariaLabel.trim();

  const labelledBy = $el.attr("aria-labelledby");
  if (labelledBy) {
    const text = labelledBy
      .split(" ")
      .map((id: string) => $el.closest("html").find(`#${id}`).text().trim())
      .filter(Boolean)
      .join(" ");
    if (text) return text;
  }

  return $el.text().replace(/\s+/g, " ").trim();
}

export function simulateAnnouncements(html: string): string[] {
  const $ = load(html);
  const announcements: string[] = [];

  $("h1,h2,h3,h4,h5,h6,button,a,input,textarea,select,[role],img").each((_, element) => {
    const el = $(element);
    const tag = element.tagName.toLowerCase();
    const role = el.attr("role");

    if (tag.startsWith("h")) {
      announcements.push(`Heading level ${tag[1]}: ${getName(el) || "Untitled heading"}`);
      return;
    }

    if (tag === "button" || role === "button") {
      announcements.push(`Button: ${getName(el) || "Unnamed button"}`);
      return;
    }

    if (tag === "a") {
      announcements.push(`Link: ${getName(el) || "Unnamed link"}`);
      return;
    }

    if (tag === "img") {
      const alt = el.attr("alt");
      announcements.push(alt ? `Image: ${alt}` : "Image: missing alt text");
      return;
    }

    if (["input", "textarea", "select"].includes(tag)) {
      const type = el.attr("type") ?? "text";
      const required = el.attr("required") !== undefined ? "required" : "optional";
      announcements.push(`Form field (${type}, ${required}): ${getName(el) || "Unlabeled input"}`);
      return;
    }

    if (role) {
      announcements.push(`Region role ${role}: ${getName(el) || "Unnamed region"}`);
    }
  });

  if (!announcements.length) {
    announcements.push("No screen-reader-significant elements found in this snippet.");
  }

  return announcements;
}
