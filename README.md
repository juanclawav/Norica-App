# Norica-App

Este repositorio es usado, para trabajar en el desarrollo de la aplicación de la empresa constructora Norica.

## Instalación

Para instalar el proyecto correctamente, debe seguir las siguientes instrucciones:

- Instalar VSCode, siguiendo la guía de [este enlace](https://www.youtube.com/watch?v=X_Z7d04x9-E)

- Instalar NodeJS, siguiendo la guía de [el enlace de aquí](https://www.youtube.com/watch?v=Z-Ofqd2yBCc). Sin embargo, en dicha guía se especifica que se debe de usar la versión 16.13.1 de NodeJS (o como lo coloca en el video, **lts**), y debido a ello, de debe instalar y usar la versión 18.16.1 en lugar de la versión 16.13.1. Esto resultaría en el siguiente comando, en lugar de ejecutar **nvm install lts**:

  - nvm install 18.16.1

- Luego, se debe descargar el archivo comprimido. Para lograrlo, dar click en el botón <>code, para luego seleccionar la opción **Download ZIP**.

- Tras descargar el archivo.zip, se debe ir al directorio en donde se descargó. Al encontrarlo, se debe mover el archivo a una carpeta aparte. Luego, se lo debe descomprimir.

- Dar doble click sobre la carpeta **Norica-App-main**. Luego, dar click derecho sobre la carpeta, y seleccionar, **abrir con Code**.

- Luego de dar **Si, Yo confío en los autores** (o en inglés: **Yes, I trust the authors**) cuando pregunta si confía en la distribución de este proyecto, debe abrir una terminal, utilizando una de las opciones que se encuentra en la parte superior de VSCode.

- Una vez abierta la terminal, se debe copiar y ejecutar (pulsando enter) el siguiente comando:

  - npm install

- Una vez ejecutado el comando, ya le será posible abrir el proyecto pro medio de la terminal que abrió usando:

  - npm run dev

Deberá de seguir el siguiente [enlace](http://127.0.0.1:5173/auth/login) para acceder a la aplicación, ¡Y Listo!

<img width="960" alt="image" src="https://github.com/JZane21/Norica-App/assets/82000556/a9633df5-20c2-495f-a95b-a4e337f7d33e">

Cuando desee cerrar la aplicación, solo tendrá que dar click sobre la terminal, y ejecutar el comando:

- CTRL + c

Esto cerrará el servidor en donde se está ejecutando la aplicación. Y si desea volver a abrirla, deberá ejecutar nuevamente:

- npm run dev
