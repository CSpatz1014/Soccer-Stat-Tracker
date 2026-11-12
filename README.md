# Soccer Stat Tracker

An offline-capable soccer PWA for any team. No build step or account required.

## Update your GitHub Pages app

1. Export a JSON backup from your existing tracker before updating.
2. Extract this ZIP and upload the **contents** of its folder to the same location in your GitHub repository, replacing the existing files. Commit the changes.
3. Once GitHub Pages has deployed, open the app online and reload it to activate the updated offline cache. Close and reopen the installed app if necessary.
4. Tap the pencil beside the heading to set your team name.

Keep the same site address/browser to retain local data. This version preserves the original `mru_soccer_v3` storage key and internal stat identifiers for compatibility. Existing JSON backups still import. If you move to a new domain or browser, restore your exported backup. Installed home-screen names/icons may require removing and re-adding the shortcut; export your data first.

The manifest uses the generic name **Soccer Stats**; your chosen name appears inside the app, in saved game details and in exports. Renaming changes the current team, not the roster or a separate team account. Newly saved games retain the name used when saved. Older records without a team name display the current name.

## Timing

- Regulation defaults to two 40-minute halves with a countdown to zero.
- Start/Pause follows the referee's signals. Logging a stat does not automatically pause regulation timing: an entry may be made after play has restarted.
- Use **Set time** to match the referee's remaining time. It pauses the clock before making the correction.
- **2nd Half / Overtime / OT 2 / Full Time** advances manually. Each new period starts paused. Advancing early asks for confirmation.
- At 0:00, the clock stops. Complete any penalty kick that extends the period before advancing. There is no added stoppage time.
- Normally allow 10 minutes at halftime, 5 before overtime and 2 between overtime periods. The app does not time these breaks.
- Saving a game resets the clock to 40:00 in the first half.
- Event minutes continue through overtime (80–90 for OT 1, 90–100 for OT 2 with ten-minute periods). Event lists and Excel exports identify the period.

### Overtime is a state-association decision

There is no single mandatory national overtime format. In **Timing & overtime settings**, choose:

- None (default): end after regulation.
- Two full overtime periods: both are played even when a team scores.
- Two sudden-victory periods: logging a goal, scored penalty, or own goal ends the match during overtime.

The overtime period length defaults to 10 minutes. Regular-season/preseason games cannot start overtime with periods longer than 10 minutes. For an authorized postseason format, select a playoff game type and set up to 15 minutes per period. Match your state association's rules before play. Overtime is offered after regulation only with a tied score.

This implementation supports **two** overtime periods; it does not implement every state's postseason procedure, four-quarter regulation, or a separate penalty-shootout tracker. Do not log shootout kicks as ordinary match goals. If a sudden-victory goal is removed as a correction, use **Set time** to reopen the period at the referee's time.

NFHS references checked November 11, 2026:
- https://www.nfhs.org/sports/soccer/rules
- https://assets.nfhs.org/umbraco/media/7213076/2024-25-soccer-guide-final.pdf (Rule 7 comparison: regulation and state overtime authority)
- https://nfhs.org/resources/sports/soccer-points-of-emphasis-2026-27
- https://www.mhsaa.com/sports/boys-soccer/stories/be-referee-soccer-timing

## Existing features retained

Player roster, individual and opponent stats, match events, game history, preseason/regular-season/playoff categories, postseason records, season totals, Excel export, JSON backup/restore and offline support.

Saved games and roster are stored locally. As in the original version, an **unsaved match and its clock are held in memory**: save before closing or reloading. Background timer throttling is handled using wall-clock timestamps, but refreshing the app starts a new clock. This is a tracking aid; follow the referee's official time.

## Files

`index.html` contains the application and bundled spreadsheet exporter. `manifest.webmanifest`, `sw.js` and the PNG icons provide PWA installation/offline behavior. Serve over HTTPS (GitHub Pages works) or localhost. Opening the HTML directly does not install the service worker.

## Validation

JavaScript syntax check and automated logic checks passed for initialization, team-name persistence, countdown expiry, regulation and overtime transitions, continuous event minutes, sudden victory, saved team identity, new-game clock reset, no-overtime full time and untied regulation completion. Browser rendering could not be verified in the editing environment.
