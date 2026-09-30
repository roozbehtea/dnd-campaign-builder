# ⚔️ Campaign Forge — D&D Campaign Builder

A single-file web app for planning a Dungeons & Dragons campaign. Live at **https://roozbehtea.github.io/dnd-campaign-builder/** (once GitHub Pages is enabled under Settings → Pages → Deploy from branch `main`, root). You can also just open `index.html` in a browser.

## Features

- **Campaign overview**: pitch, setting, tone, themes, level range, villain, world truths, safety tools, plus a campaign-building checklist that tracks your progress.
- **World & story**: Party (player characters), NPCs, Locations, Factions (with progress clocks), Quests (Idea → Active → Completed) and Items.
- **At the table**: Session prep (strong start, scenes, secrets & clues, recap) and an **encounter builder** that rates difficulty (Easy / Medium / Hard / Deadly) against your party using the 5e DMG XP rules.
- **Linking**: write `[[Name]]` in any text box to link to another entry. Every entry shows its links and what mentions it, and one click creates entries that don't exist yet.
- **Mythic Codex**: 177 hand-written entries drawn from the Mahabharata, the Shahnameh, the Epic of Gilgamesh, the Odyssey, the Norse sagas, Buddhist thought (including Nagarjuna), Taoism, and Western philosophers such as Nietzsche, Kierkegaard, Wittgenstein, Heidegger, Plato, Camus and Levinas. It has ten kinds of entry: campaign premises, inner journeys for characters, villains, mythic monsters (with 5e stats), gods and powers, sages, moral dilemmas, koans and riddles, epic plot hooks, and relics. Filter by tradition, search, draw one at random, and add any entry to your campaign with one click. Every entry names its source.
- **Dice roller**: d4–d100, expressions like `2d6+3`, advantage/disadvantage (`2d20kh1` / `2d20kl1`), and ability-score rolls.
- **Generators**, with a culture setting (Norse, Persian, Indic, Greek, Mesopotamian, Chinese or classic fantasy) that shapes names and places:
  - **Adventures**: complete one-shot outlines with a strong start, five scenes, secrets and clues, a twist and a reward. The monster, riddle and dilemma are drawn from the Mythic Codex. One click saves the quest, session plan, place, NPCs and encounter.
  - **Adventurers**: ready-to-play characters with rolled ability scores, HP, an ideal drawn from philosophy, a bond, a flaw, a backstory and a suggested inner journey. Add them to the party or save them as NPCs.
  - **Places** (settlements, dungeons, wilderness, sacred sites, otherworlds), **factions** (with a creed, goal, methods, leader, symbol and secret), **NPCs**, **inns**, **magic items** and **complications**.
- **Multiple campaigns**, search across everything, tags, and light/dark mode.
- **Backups**: export a campaign as JSON (re-importable) or as a Markdown document.

All data is saved in your browser's localStorage. Nothing is sent to a server, so export a JSON backup now and then.
