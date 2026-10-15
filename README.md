# Reposé Residence recreation

A self-contained static copy of the public frontend at https://reposeresidence.com/, captured on 14 October 2026.

## Run

Clone this repository or download and extract its ZIP. On Windows, double-click `Start-Preview.cmd` (Node.js is required). Your browser opens automatically at the correct address. Keep the terminal window open while viewing the site. The launcher chooses an available port on each run to avoid conflicts.

Alternatively, use any static web server with `dist` as its web root. For example, with Node.js installed:

```sh
npm start
```

Then open the Local URL printed by the server. The site requires HTTP serving; opening index.html directly with file:// will not support ES modules and the floor-plan data requests.

## Included

- Original responsive layout, fonts, animations and public frontend bundles.
- All 440 opening frames, interior and amenity films, apartment walkthrough videos, floor-plan data and imagery, and terrace model.
- 699 website files, approximately 148 MiB before compression.

The public production JavaScript is bundled/minified; the original unbundled authoring source was not available. The website is a snapshot of the reference, so property availability and marketing information do not update automatically.

Contact, WhatsApp, email, telephone, and developer links still point to SAION Properties, as on the reference. No contact details were submitted during verification.

`dist/index.html` is the entry point. Styling is in `dist/assets/*.css`, and apartment data is in `dist/floor-explorer/repose-floor-explorer-assets/*.json`. For static hosting, set the publish directory to `dist`; no build or dependency installation is required.

## Verification

Static integrity: all 683 required runtime asset references resolve; all file signatures and media container lengths pass; all files are smaller than 25 MiB. Some unused image metadata in the original bundle refers to files already absent from the reference; these are not required by the rendered site.
