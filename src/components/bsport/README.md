# bsport components

This boundary contains route-scoped wrappers for the bsport calendar, member
login, and pricing-subscription widgets. bsport remains responsible for live
schedule, authentication, product, and purchase behavior.

The calendar and pricing widgets use bsport production while member login
remains on staging. The wrappers claim their expected script environment before
mounting; crossing environments performs a clean document reload so one runtime
cannot send another environment's company ID to the wrong API.
