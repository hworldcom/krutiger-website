# bsport components

This boundary contains route-scoped wrappers for the bsport calendar, member
login, pricing-subscription, and shop widgets. bsport remains responsible for
live schedule, authentication, product, and purchase behavior.

All widgets use bsport production. The wrappers claim their expected
script environment before mounting so a future environment mismatch cannot send
a company ID to the wrong API.
