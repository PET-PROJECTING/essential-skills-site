import { Icon } from "@/components/home/icon";
import { icons, integration } from "@/lib/home-data";

const scopeIcons = {
  package: icons.packageMuted,
  globe: icons.globe,
} as const;

function PathCode({ children }: { children: string }) {
  return (
    <code className="rounded-sm bg-accent-soft px-1 py-0.5 font-mono text-[12px] font-medium text-accent">
      {children}
    </code>
  );
}

export function Integration() {
  return (
    <section className="flex w-full flex-col gap-10 border-b border-border px-5 py-14 sm:px-10 sm:py-16 lg:flex-row lg:items-center lg:gap-20 lg:px-20 lg:py-20">
      <div className="flex flex-1 flex-col gap-5">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-[28px]">
          {integration.title}
        </h2>
        <p className="font-text text-sm leading-relaxed text-muted">
          {integration.description}
        </p>
        <ul className="flex flex-col gap-3">
          {integration.scopes.map((scope) => (
            <li
              key={"text" in scope ? scope.text : scope.before}
              className="flex items-start gap-3 sm:items-center"
            >
              <Icon src={scopeIcons[scope.icon]} size={16} />
              <span className="text-[13px] text-foreground">
                {"paths" in scope ? (
                  <>
                    {scope.before}
                    {scope.paths.map((path, index) => (
                      <span key={path}>
                        {index > 0 ? " or " : null}
                        <PathCode>{path}</PathCode>
                      </span>
                    ))}
                    {scope.after}
                  </>
                ) : (
                  scope.text
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <aside className="flex flex-1 flex-col gap-4 rounded-lg border border-border bg-surface p-7">
        <div className="flex items-center gap-2">
          <Icon src={icons.alertCircle} size={16} />
          <span className="font-mono text-xs font-semibold text-foreground">
            {integration.noteTitle}
          </span>
        </div>
        <p className="text-[13px] leading-normal text-muted">
          {integration.noteBefore}
          <code className="rounded-sm bg-accent-soft px-1.5 py-0.5 font-mono text-[12px] font-medium text-accent">
            {integration.noteHighlight}
          </code>
          {integration.noteAfter}
        </p>
      </aside>
    </section>
  );
}
