# bsport components

This boundary contains route-scoped wrappers for the bsport calendar, member
login, pricing-subscription, and shop widgets. bsport remains responsible for
live schedule, authentication, product, and purchase behavior.

All widgets use bsport production. Next.js reuses the shared script during
client-side navigation, so each wrapper also attempts to mount when it enters
the page instead of relying only on the script's load callback.

The bsport runtime retains mounted parent IDs and exposes no supported unmount
method. When React replaces a previously mounted widget element—such as when
moving between bsport routes or switching language—the wrapper performs one
clean document reload. Ordinary navigation remains client-side. This prevents
the runtime from leaving the replacement element empty while avoiding reload
loops during repeated callbacks on the active element.
