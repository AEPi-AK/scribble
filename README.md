## scribble: *scribal superpowers*

#### Keyboard shortcuts (*extremely* useful for attendance! don't use the mouse!!)


`ctrl` + `cmd` + `/` =  focus the search bar

`ctrl` + `cmd` + `↑` = select previous brother

`ctrl` + `cmd` + `↓` = select next brother

`ctrl` + `cmd` + `←` = mark brother absent

`ctrl` + `cmd` + `→` = mark brother present

`ctrl` + `cmd` + `shift` + `←` = mark all brothers absent

`ctrl` + `cmd` + `shift` + `→` = mark all brothers present


### FAQ (How I Learned to Stop Worrying and Love Scribble)

#### Q: Why would you do this?

A: I'm a lazy hacker and I believe that if something _can_ automated or made more efficient, it ought to be. I also like building things, so making scribble killed two birds with one stone!

#### Q: Uh, okay. But why I would I use it?

A: Glad you asked. Scribble is still a work-in-progress, but currently it's most useful feature automates the most frustrating part of the job of the scribe: keeping track of attendance during meeting. It also keeps track of quorum in real time (e.g. it will show you "+14" in green to indicate "three brothers over quorum", or "-2" to indicate "two brothers below quorum"). Of course, you can also take notes with scribe — it's got a markdown text-editor built in!

#### Q: Alright, that's cool I guess. How do I use it?

A: Go to http://scribble.surge.sh/ and start typing. All of your changes are saved to your browser immediately, so you don't have to worry about your laptop breaking and losing your work when you get dragged into a shower.

#### Q: What about executive board meetings?

A: See the purple 'B' in the top right hand corner? Click that. It'll change to an 'E'. Ta-da.

#### Q: How can I change the date?

A: You can't. (yeah yeah, it's broken right now. I'll fix it eventually.)

#### Q: I'm done taking notes, how do I export to PDF?

A: For now, here's the process:

1. Check the 'render' text box in the top right hand corner.
2. Select all the generated markdown text and copy it into a text file.
3. Upload that text file here http://markdowntopdf.com/ and download the PDF.

#### Q: Is anything broken/not working?

You bet. Here's the stuff I know about:

- can't change the date (defaults to current date)
- quorum indicator always reflects brotherhood quorum, even in eboard mode
- can't add/remove brothers
- can't have multiple minutes
- can't really export raw data (unless you wanna do this: `JSON.stringify(localStorage)  ( ͡° ͜ʖ ͡°) `)

#### Q: What are your future plans?

- better designed render button + interface
- honorific autocompletion (e.g. "isaa<tab>" -> "Brother Master")
- better flow for rendering the markdown/generating a PDF
- Flint can now serve assets in the root directory, we should do that.
- Use Redux
- Refactor: use ES6 proxies to reduce `MinutesData` boilerplate/copypasta
- Refactor: pass `M` around, not the stuff it depends on per-se.
- Refactor: general-purpose "`M` updated" signal, rather than specific `onChange` handlers
