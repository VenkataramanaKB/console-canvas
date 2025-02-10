# 🎨 ConsoleCanvas

**ConsoleCanvas** is an ASCII-based animation API that streams frames over **cURL**. It transforms text-based frames into a slideshow, bringing ASCII art to life in the terminal.

## 🚀 Getting Started

To run the ASCII animation, simply use:

```sh
curl https://consolecanvas.vercel.app/parrot
```

```sh
curl -L consolecanvas.vercel.app/parrot
```


📌 **Note:** This API **only works via cURL** and is not intended for browser access.

## 📚 Project Structure

```
📦 console-canvas
👉📁 files
│   👉📁 parrot (Contains ASCII frames)
│   │   👉 1.txt
│   │   👉 2.txt
│   │   👉 ...
👉 server.js
👉 vercel.json
👉 README.md
```

## 🤝 Contributing

If you have ASCII frames from a **video** or an **animation**, feel free to contribute!

### How to Contribute:

1. Fork the repository.
2. Add a new folder inside `files/` with a descriptive name (e.g., `files/matrix`).
3. Add your ASCII frames (`frame1.txt`, `frame2.txt`, ...).
4. Update `server.js` to support your animation.
5. Submit a pull request! 🎉

## 🛠️ Running Locally

1. Clone the repository:

```sh
git clone https://github.com/VenkataramanaKB/console-canvas.git
cd console-canvas
```

2. Install dependencies:

```sh
npm install
```

3. Run the server:

```sh
node server.js
```

4. In another terminal, test your API:

```sh
curl http://localhost:3000/parrot
```

## 🐟 License

This project is open-source under the **MIT License**.

---

Enjoy ASCII animations in your terminal! 🚀

