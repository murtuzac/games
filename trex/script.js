<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-Tac-Toe vs CPU</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f0f0f0;
        }

        h1 {
            font-size: 24px;
            color: #333;
        }

        #status {
            font-size: 1.2em;
            margin: 10px;
            font-weight: bold;
        }

        .board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 5px;
            width: 90vw;
            max-width: 400px;
            height: 90vw;
            max-height: 400px;
            margin: 20px auto;
            background-color: #222;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }

        .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            width: 100%;
            height: 100%;
            border: 2px solid #555;
            background-color: #fff;
            cursor: pointer;
            touch-action: manipulation;
            transition: background-color 0.3s ease-in-out, transform 0.2s;
        }

        .cell:active {
            background-color: #ddd;
            transform: scale(0.95);
        }

        .cell[data-value="X"] {
            color: #ff4500;
            text-shadow: 2px 2px 6px rgba(255, 69, 0, 0.5);
            background: linear-gradient(to bottom, #ffcccb, #ff4500);
            border-radius: 10px;
        }

        .cell[data-value="O"] {
            color: #1e90ff;
            text-shadow: 2px 2px 6px rgba(30, 144, 255, 0.5);
            background: linear-gradient(to bottom, #add8e6, #1e90ff);
            border-radius: 10px;
        }

        button {
            padding: 12px 18px;
            font-size: 1.2em;
            cursor: pointer;
            margin-top: 10px;
            border: none;
            border-radius: 5px;
            background-color: #28a745;
            color: white;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease-in-out;
        }

        button:hover {
            background-color: #218838;
        }

        button:active {
            transform: scale(0.95);
        }

        /* Surprise Animation */
        @keyframes surprise {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
        }

        .surprise {
            animation: surprise 0.5s ease-in-out;
        }

        /* Surprise effect for winning cells */
        .winning-cell {
            animation: surprise 1s infinite alternate;
        }
    </style>
</head>
<body>

    <h1>Tic-Tac-Toe vs CPU</h1>
    <button id="modeToggle">Switch to AI Mode</button>
    <p id="status">Your turn (X)</p>

    <div class="board" id="board">
        <!-- Cells will be created dynamically -->
    </div>

    <button onclick="resetGame()">Restart Game</button>

    <script src="script.js"></script>
</body>
</html>
