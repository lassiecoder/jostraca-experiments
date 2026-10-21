# Jostraca experiments

Small, reproducible scripts that test how [Jostraca](https://jostraca.org) 0.40.0 handles files that already exist on disk: three-way merge, the `JOSTRACA_PROTECT` marker, and plain `replace` keys. They back my article *I tried to break Jostraca's merge, and it survived until I cloned the repo*.

Tested with Node 24.12 and `jostraca` 0.40.0 (pinned).

```bash
npm install
npm run all
```

Each script writes into its own `out<N>/` folder and deletes it first, so they can be rerun in any order.

| Script | What it tests | Result on 0.40.0 |
|---|---|---|
| `01-same-line-conflict.mjs` | User and generator change the same line under `merge` | Conflict markers, file listed in `files.conflicted`, process exits 0 |
| `02-rerun-after-conflict.mjs` | Regenerate without resolving the conflict | File is still listed in `files.conflicted` |
| `03-fresh-clone.mjs` | Delete the gitignored `.jostraca/` folder (what a fresh clone has), then regenerate with `merge` | Hand edit is lost with no warning, file reported as `written` |
| `04-protect-by-accident.mjs` | A generated file mentions `JOSTRACA_PROTECT` | The generator can never update it again, and it appears in no result list |
| `05-plain-key-replace.mjs` | `replace: { NAME: 'Widget' }` on a template | Also rewrites `NAME_FILE` and `SERVICE_NAME` |

## License

MIT
