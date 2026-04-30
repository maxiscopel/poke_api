# Pokédex App — TP Programación III

**Alumno:** Maximo Scopel  
**Materia:** Programación III — UTN TUPaD  
**Tecnologías:** React · TypeScript · Tailwind CSS · PokéAPI

---

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abrir http://localhost:5173 en el navegador.

---

## Preguntas Conceptuales

### 1. ¿Por qué el estado de la lista de pokémon vive en App.tsx y no en PokemonList o PokemonCard?

Porque App.tsx es el componente raíz y es el único que necesita tener una visión completa de la aplicación. La lista de pokémon la usan tanto PokemonList (para renderizarla) como App mismo (para saber cuál está seleccionado). Si ese estado viviera en PokemonList, App no podría saber qué pokémon eligió el usuario, y tampoco podría pasarle esa información a otros componentes en el futuro. Poner el estado en el componente más alto que lo necesita es una de las reglas básicas de React.

### 2. ¿Qué diferencia hay entre un componente presentacional y un componente contenedor? ¿A cuál categoría pertenece cada uno de los tres componentes?

Un componente **contenedor** es el que maneja lógica: hace fetches, tiene estado propio, toma decisiones. Un componente **presentacional** solo recibe datos por props y los muestra, sin saber de dónde vienen ni importarle cómo se obtuvieron.

En este proyecto:
- **App.tsx** es contenedor: maneja el estado global y hace el fetch de la lista.
- **PokemonList.tsx** es presentacional: no tiene estado ni hace fetches, solo recibe el array y renderiza las cards.
- **PokemonCard.tsx** es contenedor: aunque es pequeño, maneja su propio estado y hace el fetch del detalle de cada pokémon.

### 3. Si no pusieras [name] como dependencia del useEffect en PokemonCard, ¿qué problema concreto ocurriría?

El useEffect solo correría una vez cuando el componente se monta, usando el valor inicial de name. Si después la prop name cambiara (por ejemplo, si React reutilizara el componente para otro pokémon), el fetch no volvería a ejecutarse y seguiría mostrando los datos del pokémon anterior. Con [name] como dependencia, cada vez que cambia el nombre se dispara un nuevo fetch y los datos se actualizan correctamente.

### 4. ¿Por qué se usan dos interfaces distintas (PokemonListItem y PokemonDetail) en lugar de modelar todo con una sola?

Porque son dos respuestas completamente distintas de la API. El endpoint de lista devuelve objetos muy simples con solo nombre y URL, mientras que el endpoint de detalle devuelve un objeto mucho más complejo con tipos, estadísticas, imágenes y más. Si usara una sola interfaz para los dos casos, tendría que poner todos los campos como opcionales y TypeScript no me podría ayudar a detectar errores. Al tener dos interfaces separadas, cada una modela exactamente lo que devuelve su endpoint y el compilador me avisa si intento usar un campo que no existe.

### 5. ¿Qué ventaja tiene que PokemonList no sepa nada de la API? ¿Cómo facilita eso el testing o la reutilización del componente?

La ventaja principal es que PokemonList es completamente independiente de la fuente de datos. Si mañana quiero cambiar la API, o usar datos falsos para testear, o mostrar una lista de pokémon que viene de otro lado, no necesito tocar PokemonList para nada. Solo cambio de dónde vienen los datos en App.tsx y le paso el array por props como siempre. Para testear también es mucho más fácil: puedo pasarle un array hardcodeado y verificar que renderiza bien sin necesitar simular llamadas a la red.