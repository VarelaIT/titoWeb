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
    <title>Projecto Areas</title>
</head>
<body>
    <main>
        <h1>Projecto Areas</h1>

        <article>
            <h2>Rectangulo para ventanas.</h2>
            <form>
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

                <input type="submit" value="Ejecutar Calculo"/>
            </form>
        </article>
    </main>

    <footer>
        <ul>
            <li>Copyrights: VarelaIT®</li>
        </ul>
    </footer>

    <script>
        const form= document.querySelector('form');
        form.onsubmit= (ev)=>{
            ev.preventDefault();
            let data= new FormData(ev.target);
            console.log(data);
            alert('El formulario fue imprento en la consola.');
        }
    </script>
</body>
</html>


