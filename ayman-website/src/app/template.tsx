/**
 * Wordt bij elke paginawissel opnieuw opgebouwd: zo krijgt iedere nieuwe pagina
 * een vloeiende entree (pure CSS, werkt ook zonder JavaScript en respecteert
 * "minder beweging").
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
