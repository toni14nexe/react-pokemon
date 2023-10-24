export function selectedNavbarBtn(page) {
  const pathname = window.location.pathname;

  if (page === "My Pokemon list" && pathname === "/my-pokemon-list")
    return true;
  else if (page === "All Pokemons" && pathname === "/all-pokemons") return true;
  else if (page === "Play" && pathname === "/dashboard") return true;
  else if (page === "Settings" && pathname === "/settings") return true;

  return false;
}
