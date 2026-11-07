# THE REALMS: A Fantasy Name Choosing Journey

A free fantasy name picker (PWA). No backend, accounts, or paid services. Names and history are saved in your browser.

## Deploy from Android (GitHub Pages)
1. **Extract the ZIP** with your Files app (long-press the ZIP, then Extract). You get 7 files, no folders.
2. In the GitHub app or in Chrome (desktop site) at github.com, create a **new public repository**.
3. Tap **Add file > Upload files** and upload **all 7 files directly into the repository root** (do not put them inside a folder).
4. Tap **Commit changes**.
5. Go to **Settings > Pages**. Under *Build and deployment*, pick **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
6. Wait 1-2 minutes. Your link appears at the top of the Pages screen: `https://YOURNAME.github.io/REPONAME/`. Open it.
7. **Install on Android:** open the link in Chrome, tap the **Install** button in the app (or Chrome menu ⋮ > *Install app* / *Add to Home screen*). After the first load it also works offline.

## Replace the music
Make your own `.wav` file, rename it exactly **background.wav**, and upload it to the repository root, replacing the old one (Add file > Upload files, then commit). To refresh the offline copy, change `realms-v1` in `sw.js` to `realms-v2`. Nothing else needs to change. Keep the file small (under about 10 MB) so it loads fast.

## Using the app
Tap a territory on the map, add names in **Names**, then press **LET THE RING CHOOSE**. Use **Fellowships** to make balanced groups. Choose *All Realms* to draw from all four lists at once.
