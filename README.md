# Discord Status Rotator

A simple, configurable Discord bot that rotates its presence status based on a JSON config.

## Features

- **Status Rotation**: Cycles through multiple statuses at a defined interval.
- **Configurable**: Easy-to-edit `config.json` for statuses and timing.
- **Activity Types**: Supports PLAYING, WATCHING, LISTENING, COMPETING.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure:**
    Copy `config.example.json` to `config.json` and fill in your token and statuses.

    ```bash
    cp config.example.json config.json
    ```

    ```json
    {
      "token": "YOUR_BOT_TOKEN_HERE",
      "interval": 10000,
      "statuses": [
        { "type": "WATCHING", "text": "over servers" },
        { "type": "PLAYING", "text": "Minecraft" }
      ]
    }
    ```

3.  **Run:**
    ```bash
    node index.js
    ```

## Requirements

- Node.js (v16.9.0 or higher)
- Discord Bot Token

## License

MIT License.
