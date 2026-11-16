# Full-content CMS setup

This version exposes the homepage and 13 additional pages in Pages CMS.
It preserves the existing design and has fallback HTML if the CMS JSON does not load.

## Setup
1. Back up the existing GitHub repository.
2. Upload ALL ZIP contents to the root of `draminulendo/dr-aminul-website`, preserving paths.
3. Sign in to https://app.pagescms.org with GitHub.
4. Authorize the Pages CMS GitHub app for this repository.
5. Open the repository and its default branch.
6. Edit `Chambers`, `Areas of Expertise`, `Why Patients Trust`, `FAQ`, `Design settings`,
   or any page in the editor. Save/commit and wait for GitHub Pages deployment.

## Important limitations
- This provides editable text, image URLs/paths, links, and selected layout controls,
  not unrestricted drag-and-drop page design.
- Pages CMS may require an app installation or repo permission.
- Page editors show an ordered list of elements; **do not change their IDs or types**.
- Some shared navigation/footer labels and detailed page HTML structures are still fixed.
- Creating an entirely new page or changing structural HTML requires developer work.
- Check both English and Bangla views after edits.
- Upload images into `assets/uploads` before using their paths.
- Do not edit medical guidance without clinical review.
