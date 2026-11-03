# ArgonCakeCalc

**Conoce tu coste real antes de decir el precio de la tarta.**

> **Sitio web:** **ТУТ ССЫЛКА НА САЙТ**  
> **Pago de la licencia:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk](README.nb.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

ArgonCakeCalc es un programa que ayuda a los pasteleros. Sus funciones principales: crear recetas, guardar listas de ingredientes, diseñar productos, incluidas tartas de varios pisos (con visualización), y obtener al instante el cálculo del coste y del beneficio. Las recetas y los productos creados se pueden descargar en PDF. El programa funciona en local, sin instalación y sin internet.

No hace falta cuenta, suscripción ni base de datos en la nube. Tus recetas y precios se quedan en el navegador de tu dispositivo.

## Inicio rápido

El programa es un único archivo. No hay que instalar nada.

1. Abre el [repositorio de ArgonCakeCalc en GitHub](https://github.com/Argonstudio/ArgonCakeCalc) y ve al archivo [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. En la página del archivo, pulsa el icono de descarga (**Download raw file**) y guarda el archivo en una carpeta donde vaya a permanecer.
3. Abre el archivo guardado en un navegador moderno, en un ordenador, tableta o smartphone.

El archivo ya contiene el programa, todas las traducciones, los estilos y las fuentes para PDF, por lo que, una vez descargado, funciona sin internet.

¿Prefieres no descargar nada? Abre el sitio web: **ТУТ ССЫЛКА НА САЙТ**. En una dirección HTTPS estable, la aplicación también puede prepararse para funcionar sin conexión después de la primera carga.

La interfaz se abre en inglés. Puedes cambiar el idioma desde el propio programa: ruso, francés, alemán, noruego bokmål, español, italiano, chino simplificado o japonés.

> [!WARNING]
> **Los datos se guardan en el navegador, no dentro del archivo HTML.** Si mueves o renombras el archivo, cambias de navegador, borras los datos del navegador o trabajas en modo privado, puedes perder el acceso a tus recetas y precios. Mantén el archivo siempre en el mismo sitio, ábrelo siempre en el mismo navegador y exporta con regularidad una copia JSON. Los detalles están en la sección [Tus datos y copias de seguridad](#tus-datos-y-copias-de-seguridad).

## Qué hace el programa

- **Materiales.** Mantén un catálogo de ingredientes, decoración, envases y consumibles. Para cada artículo indica el precio del envase, la cantidad por envase, la unidad, la categoría y, si hace falta, la densidad. Se admiten gramos, kilogramos, mililitros y litros. La masa y el volumen solo se convierten entre sí cuando se conoce la densidad, y las piezas nunca se convierten automáticamente en peso.
- **Recetas y componentes.** Crea recetas con rendimiento, pérdidas de preparación, instrucciones y líneas de composición. Un componente puede ser un material u otra receta: un relleno puede incluir una crema, y la crema, un almíbar. Las recetas anidadas se descomponen hasta las materias primas, y los componentes repetidos se agrupan en una lista de compra clara. Cuando cambia el precio de un material, todas las recetas y productos que dependen de él se recalculan automáticamente.
- **Constructor de productos.** Monta un producto con bizcochos, rellenos, cremas, almíbares, coberturas, decoración y envases. Guarda los productos, duplícalos como plantillas y compara distintos precios de venta sin cambiar el cálculo guardado.
- **Coste completo.** Añade mano de obra, electricidad, gastos de entrega, envases, otros gastos y una reserva para pérdidas, y después establece un margen sobre coste o un margen objetivo y, si es necesario, un beneficio mínimo. El coste solo incluye la parte realmente usada de un envase, mientras que la lista de compra redondea los envases hacia arriba.
- **Escalado.** Recalcula una receta según el rendimiento deseado o según el diámetro y la altura de una tarta redonda. Cada línea de composición puede escalar de forma proporcional, por superficie, permanecer fija o redondearse a piezas enteras. La geometría de la tarta es una estimación orientativa, no un cálculo estructural ni de seguridad alimentaria.
- **PDF, lista de compra y copia de seguridad.** Exporta un PDF con ingredientes, materias primas, instrucciones, coste, precio recomendado y dimensiones. Descarga una lista de compra para la producción o para pasársela a quien prepara el pedido. Guarda una copia JSON completa para trasladar tus datos entre navegadores o dispositivos.

## Tu primer cálculo

En el primer arranque puedes empezar con un espacio de trabajo vacío o con una demo ficticia. La demo muestra rápidamente el modo de trabajo, pero sus precios son de ejemplo y no reflejan precios reales de mercado.

1. Añade los precios de compra que realmente pagas.
2. Crea una receta e indica su rendimiento y sus pérdidas.
3. Monta un producto y define sus dimensiones o el número de raciones.
4. Añade mano de obra, electricidad, envases y otros gastos.
5. Compara el precio de venta por margen sobre coste y por margen objetivo.
6. Exporta un PDF y una lista de compra, y después guarda una copia JSON.

## Cómo se calculan los precios

- Rendimiento tras pérdidas = rendimiento introducido × porcentaje restante tras las pérdidas.
- Precio por margen sobre coste = coste completo × (1 + margen sobre coste % ÷ 100).
- Precio por margen objetivo = coste completo ÷ (1 − margen % ÷ 100).
- El precio de venta recomendado se redondea hacia arriba a la precisión de la moneda elegida.
- Los cálculos son exactos: los resultados intermedios no se redondean antes de tiempo.
- Las recetas anidadas se descomponen en cantidades de materias primas.
- En la lista de compra los envases se redondean hacia arriba; en el coste solo se cuenta la fracción realmente consumida.
- Elegir una moneda cambia solo el símbolo y la precisión. No hay conversión por tipo de cambio.

Las fórmulas y los supuestos se describen en las [reglas de cálculo](docs/CALCULATIONS.md).

## Tus datos y copias de seguridad

Los materiales, recetas, productos y ajustes se guardan en IndexedDB del navegador, por separado para cada dirección de sitio o ubicación de archivo. El idioma de la interfaz se guarda como un pequeño ajuste local. No hay cuenta, analítica, sincronización oculta en la nube ni base de datos de recetas en un servidor, y no se envía nada sin tu acción.

Exporta copias JSON con regularidad y siempre antes de mover o renombrar el archivo HTML. Borrar los datos del navegador, el modo privado, un cambio de dirección del sitio, mover el archivo o perder el dispositivo pueden dejar inaccesible la base de datos local. El almacenamiento de un archivo local (`file://`) puede comportarse de forma distinta según el navegador; para el trabajo diario es más fiable una dirección HTTPS estable. El permiso de almacenamiento persistente del navegador no sustituye a una copia de seguridad.

## Limitaciones

El PDF se genera en tu dispositivo, sin cuadro de impresión y sin enviarlo a un servidor. Se admiten caracteres latinos, cirílicos, chinos y japoneses; las fuentes chinas y japonesas aumentan el tamaño del archivo. Los emoji no compatibles y los caracteres poco comunes pueden aparecer como `?` en el PDF.

El programa no incluye control de inventario, módulo fiscal, tipos de cambio, pedidos, cuentas en la nube, sincronización entre dispositivos ni cálculo de seguridad estructural de las tartas. Antes de usarlo en producción o para fijar el precio a un cliente, comprueba tú mismo el resultado.

## Licencia, prueba y pago

ArgonCakeCalc se distribuye bajo la **ArgonCakeCalc Commercial Source-Available License, versión 1.0**. El código fuente está abierto para su consulta, pero su visibilidad pública no otorga derecho a redistribuir, sublicenciar ni publicar versiones modificadas para terceros.

Antes de pagar, puedes descargar y usar gratis el programa completo durante **un (1) mes** para comprobar sus funciones y si se adapta a tus tareas. El programa está disponible de inmediato; no se necesita clave de activación ni aprobación de cuenta.

Tras un pago correcto, la licencia no exclusiva se considera concedida de inmediato. Tú eliges el importe, desde 1 $ o el equivalente que muestre el proveedor de pago, lo ves antes de confirmar y decides voluntariamente. Cualquier importe elegido, incluso uno mayor del que luego esperabas, se considera elegido de forma consciente y no se reembolsa solo porque hayas cambiado de opinión o ya no quieras usar el programa.

Una vez concedida la licencia, el reembolso solo se considera en caso de cargo duplicado, error técnico del sistema de pago o cualquier otro caso previsto expresamente por la ley. Envía tu solicitud a `voit.ne@gmail.com` indicando la fecha del pago, el importe, el correo electrónico del pagador y el identificador de la operación de Robokassa.

El programa se ofrece **«tal cual» (AS IS)**. El desarrollador no garantiza que cumpla tus expectativas concretas, procesos de negocio o finalidad, y, en la máxima medida permitida por la ley, no responde de los daños a tu negocio, ingresos, beneficios, datos, reputación u operaciones. Eres tú quien comprueba el programa y decide si es adecuado para tu trabajo.

Lee [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) y [las licencias de componentes de terceros](THIRD_PARTY.md).

## Vendedor y soporte

- **Vendedor / titular de derechos:** trabajador autónomo Ivan Anatolievich Voitkov
- **INN ruso:** 862203800782
- **Producto:** ArgonCakeCalc
- **Objeto del pago:** derecho no exclusivo de uso del software bajo licencia comercial
- **Soporte y reclamaciones:** `voit.ne@gmail.com`
- **Página de pago:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**
- **Sitio web:** **ТУТ ССЫЛКА НА САЙТ**

El pago es una tasa de licencia, no una donación. El bloque completo para Robokassa y las autoridades está en [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Autor

**Ivan Voitkov** · [sitio del autor](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [repositorio](https://github.com/Argonstudio/ArgonCakeCalc)

El proyecto fue creado por ChatGPT (OpenAI) en colaboración con Ivan Voitkov. Ivan Voitkov sigue siendo el autor designado del proyecto.

---

Para desarrolladores y colaboradores: [DEVELOPMENT.md](DEVELOPMENT.md) (solo en inglés).
