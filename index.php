<?php
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        *{
            position: relative;
            box-sizing: border-box;
            font-family: sans-serif;
        }

        article{ 
            position: relative;
            max-width: 700px;
            border: 1px solid #000;
            border-radius: 14px;
            padding: 32px;
            margin: 48px auto;
        }

        input, textarea{
            position: relative;
            display: block;
            width: 100%;
            padding: 12px;
        }

        .rango{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    </style>
	<script type="module" src="./scripts/main.js" defer></script>
    <title>Projecto Areas</title>
</head>
<body>
    <main>
        <h1>Projecto Areas</h1>

        <article>
            <h2>Rectangulo para ventanas.</h2>
            <form id="rectangle-form"> 
                <p>
                    <label>
                        Base
                        <input name="base" placeholder="Base del rectangulo" required pattern="\d{1,4}|\d{1,4}\.\d{1,2}"/>
                    </label>
                </p>

                <p>
                    <label>
                        Altura
                        <input name="heigth" placeholder="Altura del rectangulo" required pattern="\d{1,4}|\d{1,4}\.\d{1,2}"/>
                    </label>
                </p>

                <p>
                    <label>
                        Paneles
                        <input name="panels" placeholder="cantidad de paneles" value="2" required pattern="\d"/>
                    </label>
                </p>

                <input type="submit" value="Ejecutar Calculo"/>
            </form>
            <p id="glass-container"></p>
        </article>
    </main>

    <footer>
        <ul>
            <li>Copyrights: VarelaIT®</li>
        </ul>
    </footer>

</body>
</html>


