import { load } from "cheerio";

export type ValidationIssue = {
  id: string;
  severity: "error" | "warning";
  message: string;
  selector: string;
};

export function validateARIA(html: string): ValidationIssue[] {
  const $ = load(html);
  const issues: ValidationIssue[] = [];

  $("img").each((i, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined) {
      issues.push({
        id: `img-alt-${i}`,
        severity: "error",
        message: "Image is missing alt text.",
        selector: "img"
      });
    }
  });

  $("button, [role='button']").each((i, el) => {
    const text = $(el).text().trim();
    const label = $(el).attr("aria-label");
    if (!text && !label) {
      issues.push({
        id: `button-name-${i}`,
        severity: "error",
        message: "Interactive button has no accessible name.",
        selector: "button"
      });
    }
  });

  $("input, textarea, select").each((i, el) => {
    const id = $(el).attr("id");
    const ariaLabel = $(el).attr("aria-label");
    const labelledBy = $(el).attr("aria-labelledby");
    const hasLabel = id ? $(`label[for='${id}']`).length > 0 : false;

    if (!hasLabel && !ariaLabel && !labelledBy) {
      issues.push({
        id: `field-label-${i}`,
        severity: "error",
        message: "Form control is missing a label, aria-label, or aria-labelledby.",
        selector: "input, textarea, select"
      });
    }
  });

  $("[aria-hidden='true'] a, [aria-hidden='true'] button, [aria-hidden='true'] input").each((i) => {
    issues.push({
      id: `aria-hidden-focusable-${i}`,
      severity: "warning",
      message: "Focusable element is inside an aria-hidden region.",
      selector: "[aria-hidden='true']"
    });
  });

  return issues;
}
