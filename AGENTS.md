<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep temporary chat state in a root-mounted React provider and derive the active conversation from `/chat/$threadId`; client navigation must retain conversations without browser or server persistence.
- Compose the chat transcript and composer with installed AI Elements primitives; this keeps the surface compatible with a future API connection.
