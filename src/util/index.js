export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms ?? 500));
}

export function showRarity(value) {
  switch (value) {
    case "UNCOMMON":
      return "Incomum";
    case "EPIC":
      return "Épico";
    case "RARE":
      return "Raro";
    case "LENDARY":
      return "Lendário";
    case "LIMITED":
      return "Limitado";
    case "COMMON":
    default:
      return "Comum";
  }
}

export function showTypePrize(value) {
  switch (value) {
    case "PHYSICAL":
      return "Físico";
    case "VIRTUAL":
    default:
      return "Virtual";
  }
}

export function showCategoryName(category) {
  switch (category) {
    case "fire":
      return "Incêndio";
    case "airport":
      return "Aeroportuária";
    case "residual":
      return "Coleta Residual";
  }
}
