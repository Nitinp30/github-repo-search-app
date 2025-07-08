export const languageColors: { [key: string]: string } = {
  JavaScript: "bg-yellow-500",
  TypeScript: "bg-blue-500",
  Python: "bg-green-600",
  Java: "bg-orange-500",
  "C++": "bg-purple-600",
  C: "bg-gray-600",
  "C#": "bg-green-700",
  PHP: "bg-indigo-600",
  Ruby: "bg-red-600",
  Go: "bg-cyan-600",
  Rust: "bg-orange-700",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-500",
  Dart: "bg-blue-400",
  HTML: "bg-orange-600",
  CSS: "bg-pink-500",
  Shell: "bg-gray-700",
  Vue: "bg-green-500",
  React: "bg-blue-400",
};

export const getLanguageColor = (language: string | null) =>
  language ? languageColors[language] || "bg-gray-400" : "bg-gray-400";
