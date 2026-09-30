# ⚔️ Campaign Forge — D&D Campaign Builder

A single-file web app for planning a Dungeons & Dragons campaign. Live at **https://roozbehtea.github.io/dnd-campaign-builder/** (once GitHub Pages is enabled under Settings → Pages → Deploy from branch `main`, root). You can also just open `index.html` in a browser.

## Features

- **Campaign overview**: pitch, setting, tone, themes, level range, villain, world truths, safety tools, plus a campaign-building checklist that tracks your progress.
- **World & story**: Party (player characters), NPCs, Locations, Factions (with progress clocks), Quests (Idea → Active → Completed) and Items.
- **At the table**: Session prep (strong start, scenes, secrets & clues, recap) and an **encounter builder** that rates difficulty (Easy / Medium / Hard / Deadly) against your party using the 5e DMG XP rules.
- **Linking**: write `[[Name]]` in any text box to link to another entry. Every entry shows its links and what mentions it, and one click creates entries that don't exist yet.
- **Dice roller**: d4–d100, expressions like `2d6+3`, advantage/disadvantage (`2d20kh1` / `2d20kl1`), and ability-score rolls.
- **Generators**: NPCs, villains, plot hooks, taverns, settlements, magic items, campaign premises and complications. Save any result straight into your campaign.
- **Multiple campaigns**, search across everything, tags, and light/dark mode.
- **Backups**: export a campaign as JSON (re-importable) or as a Markdown document.

All data is saved in your browser's localStorage. Nothing is sent to a server, so export a JSON backup now and then.
