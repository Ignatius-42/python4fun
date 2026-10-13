export function getRoute(hash) {
  const route = hash.replace(/^#\/?/, "");

  if (route === "about") {
    return { name: "about" };
  }

  if (route === "" || route === "home") {
    return { name: "home" };
  }

  const chapterMatch = route.match(/^chapter\/(\d{1,2})$/);
  if (chapterMatch) {
    return { name: "chapter", number: Number(chapterMatch[1]) };
  }

  return { name: "not-found" };
}
